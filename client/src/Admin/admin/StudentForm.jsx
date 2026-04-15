import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentAPI } from '../../utils/api';
import { validateStudentForm, DEFAULT_SUBJECTS, COURSES, calculateGrade } from '../../utils/helpers';

const EMPTY_FORM = {
  studentName: '', fatherName: '', motherName: '',
  registrationNumber: '', rollNumber: '',
  courseName: '', courseCode: '',
  centerOfExamination: '',
  ivetVlcsCode: 'IIVET-070/IVNE',
  sessionFrom: '', sessionTo: '',
  issueDate: '', duration: '',
  subjects: DEFAULT_SUBJECTS.map(s => ({ ...s })),
};

function SubjectRow({ subject, index, onChange }) {
  const total = (Number(subject.theoryMarks) || 0) + (Number(subject.practicalMarks) || 0);
  return (
  <tr className="border-b border-gray-100">
      <td className="py-2 px-3 text-sm text-gray-500">{index + 1}</td>
      <td className="py-2 px-3">
        <input
          className="form-input text-xs"
          value={subject.name}
          onChange={e => onChange(index, 'name', e.target.value)}
          placeholder="Subject name"
        />
      </td>
      <td className="py-2 px-3">
        <input
          type="number" min="0" max={subject.maxTheory}
          className="form-input text-center text-sm w-20"
          value={subject.theoryMarks}
          onChange={e => onChange(index, 'theoryMarks', e.target.value)}
        />
      </td>
      <td className="py-2 px-3 text-center text-xs text-gray-400">{subject.maxTheory}</td>
      <td className="py-2 px-3">
        <input
          type="number" min="0" max={subject.maxPractical}
          className="form-input text-center text-sm w-20"
          value={subject.practicalMarks}
          onChange={e => onChange(index, 'practicalMarks', e.target.value)}
        />
      </td>
      <td className="py-2 px-3 text-center text-xs text-gray-400">{subject.maxPractical}</td>
      <td className="py-2 px-3 text-center font-bold text-blue-700">{total}</td>
    </tr>
  );
}

export default function StudentForm({ initialData = null, studentId = null }) {
  const navigate = useNavigate();
  
  // ✅ FIXED STATE
  const [form, setForm] = useState(EMPTY_FORM);
    useEffect(() => {
    if (initialData) {
      setForm({ ...EMPTY_FORM, ...initialData });
    }
  }, [initialData]);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(initialData?.photoUrl ? `https://ddsgroup.onrender.com${initialData.photoUrl}` : null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const fileRef = useRef();

  // Derived calculations
  const totalObtained = form.subjects.reduce((sum, s) => sum + (Number(s.theoryMarks) || 0) + (Number(s.practicalMarks) || 0), 0);
  const totalMax = form.subjects.reduce((sum, s) => sum + s.maxTheory + s.maxPractical, 0);
  const percentage = totalMax > 0 ? parseFloat(((totalObtained / totalMax) * 100).toFixed(2)) : 0;
  const grade = calculateGrade(percentage);
  const result = grade === 'F' ? 'FAIL' : 'PASS';

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...form.subjects];
    updated[index] = { ...updated[index], [field]: field.includes('Marks') ? Number(value) : value };
    setForm(prev => ({ ...prev, subjects: updated }));
  };

  const addSubject = () => {
    setForm(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', theoryMarks: 0, practicalMarks: 0, maxTheory: 75, maxPractical: 25 }]
    }));
  };

  const removeSubject = (index) => {
    if (form.subjects.length <= 1) return;
    setForm(prev => ({ ...prev, subjects: prev.subjects.filter((_, i) => i !== index) }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Photo must be under 5MB'); return; }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

 const handleSubmit = async () => {
  const validationErrors = validateStudentForm(form);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    toast.error('Fix errors');
    return;
  }

  setLoading(true);
  const toastId = toast.loading('Processing...');

  try {
    const fd = new FormData();
    const studentData = { ...form, percentage, grade, result, totalObtained, totalMax };

    fd.append('studentData', JSON.stringify(studentData));
    if (photo) fd.append('photo', photo);

    if (studentId) {
      await studentAPI.update(studentId, fd);
    } else {
      await studentAPI.create(fd);
    }

    toast.success('Success!', { id: toastId });

    // ✅ RESET FORM
    setForm(EMPTY_FORM);
    setPhoto(null);
    setPhotoPreview(null);

    // ✅ OPTIONAL: agar same page pe rehna hai to navigate hata do
    // navigate('/admin/students');

  } catch (err) {
    toast.error('Error saving data', { id: toastId });
  } finally {
    setLoading(false);
  }
};

  const Field = ({ label, field, type = 'text', required, list }) => (
    <div>
      <label className="form-label">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input
        type={type}
        list={list}
        className={`form-input ${errors[field] ? 'border-red-400 ring-1 ring-red-400' : ''}`}
        value={form[field] || ''}
        onChange={e => handleChange(field, e.target.value)}
        placeholder={label}
      />
      {list && <datalist id={list}>{COURSES.map(c => <option key={c} value={c} />)}</datalist>}
      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up max-w-5xl">
      {/* Personal Info */}
      <div className="card">
        <h3 className="font-bold text-gray-800 text-base mb-4 pb-2 border-b flex items-center gap-2">
          <span>👤</span> Student Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Student Name" field="studentName" required />
          <Field label="Father's / Husband's Name" field="fatherName" required />
          <Field label="Mother's Name" field="motherName" required />
          <Field label="Registration Number" field="registrationNumber" required />
          <Field label="Roll Number" field="rollNumber" required />
          <Field label="IIVET-VLCs Code" field="ivetVlcsCode" />
          <Field label="Center of Examination" field="centerOfExamination" />
        </div>
      </div>

      {/* Course Info */}
      <div className="card">
        <h3 className="font-bold text-gray-800 text-base mb-4 pb-2 border-b flex items-center gap-2">
          <span>📚</span> Course Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Field label="Course Name" field="courseName" required list="courseList" />
          </div>
          <Field label="Course Code (e.g. A.D.C.A.)" field="courseCode" />
          <Field label="Session From" field="sessionFrom" required />
          <Field label="Session To" field="sessionTo" required />
          <Field label="Duration" field="duration" />
          <Field label="Issue Date (DD.MON.YYYY)" field="issueDate" required />
        </div>
      </div>

      {/* Photo Upload */}
      <div className="card">
        <h3 className="font-bold text-gray-800 text-base mb-4 pb-2 border-b flex items-center gap-2">
          <span>📷</span> Student Photo
        </h3>
        <div className="flex items-center gap-6">
          <div
            onClick={() => fileRef.current.click()}
            className="w-28 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden"
          >
            {photoPreview
              ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              : <div className="text-center text-gray-400 text-xs p-2"><div className="text-2xl">📷</div><div>Click to upload</div></div>
            }
          </div>
          <div>
            <button type="button" onClick={() => fileRef.current.click()} className="btn-secondary text-sm">
              📁 Choose Photo
            </button>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG, WEBP • Max 5MB</p>
            {photo && <p className="text-xs text-green-600 mt-1">✓ {photo.name}</p>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
        </div>
      </div>

      {/* Marks Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <h3 className="font-bold text-gray-800 text-base flex items-center gap-2"><span>📝</span> Marks Entry</h3>
          <button type="button" onClick={addSubject} className="btn-secondary text-xs">+ Add Subject</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 text-white text-xs">
                <th className="py-2 px-3 text-left w-10">#</th>
                <th className="py-2 px-3 text-left">Subject</th>
                <th className="py-2 px-3 text-center">Theory</th>
                <th className="py-2 px-3 text-center text-slate-400">Max</th>
                <th className="py-2 px-3 text-center">Practical</th>
                <th className="py-2 px-3 text-center text-slate-400">Max</th>
                <th className="py-2 px-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {form.subjects.map((s, i) => (
                <SubjectRow key={i} subject={s} index={i} onChange={handleSubjectChange} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Auto-calculated Result */}
        <div className="mt-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-blue-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500 font-medium mb-1">Total Obtained</div>
              <div className="text-xl font-bold text-blue-700">{totalObtained}<span className="text-sm text-gray-400">/{totalMax}</span></div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium mb-1">Percentage</div>
              <div className="text-xl font-bold text-blue-700">{percentage}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium mb-1">Grade</div>
              <div className={`text-xl font-bold ${grade === 'F' ? 'text-red-600' : 'text-green-600'}`}>{grade}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium mb-1">Result</div>
              <div className={`text-xl font-bold ${result === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>{result}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pb-8">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary px-8 py-2.5"
        >
          {loading ? <><span className="spinner w-4 h-4 inline-block mr-2" />Processing...</> : (studentId ? '💾 Update Student' : '🚀 Create & Generate PDF')}
        </button>
        <button type="button" onClick={() => navigate('/admin/students')} className="btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
}

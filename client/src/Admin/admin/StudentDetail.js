import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { studentAPI, SERVER_URL } from '../../utils/api';
import toast from 'react-hot-toast';
import { getGradeColor } from '../../utils/helpers';

const InfoRow = ({ label, value }) => (
  <div className="flex gap-2 text-sm py-1.5 border-b border-gray-50 last:border-0">
    <span className="text-gray-500 min-w-[180px] font-medium shrink-0">{label}</span>
    <span className="text-gray-800 font-semibold">{value || '—'}</span>
  </div>
);

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    studentAPI.getById(id)
      .then(res => setStudent(res.data))
      .catch(() => toast.error('Failed to load student'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${student.studentName}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await studentAPI.delete(id);
      toast.success('Student deleted');
      navigate('/admin/students');
    } catch (err) {
      toast.error(err.message);
      setDeleting(false);
    }
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    const t = toast.loading('Regenerating PDF...');
    try {
      await studentAPI.regeneratePDF(id);
      const res = await studentAPI.getById(id);
      setStudent(res.data);
      toast.success('PDF regenerated!', { id: t });
    } catch (err) {
      toast.error(err.message, { id: t });
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="spinner w-10 h-10" />
    </div>
  );

  if (!student) return (
    <div className="text-center py-20">
      <div className="text-4xl mb-2">😕</div>
      <p className="text-gray-500">Student not found</p>
      <Link to="/admin/students" className="text-blue-600 hover:underline text-sm mt-2 inline-block">← Back</Link>
    </div>
  );

  const tabs = ['info', 'marks', 'pdf'];

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/admin/students" className="text-gray-400 hover:text-gray-600">← Students</Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-700">{student.studentName}</span>
      </div>

      {/* Hero card */}
      <div className="card bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="flex items-start gap-5">
          {student.photoUrl ? (
            <img src={`${SERVER_URL}${student.photoUrl}`} alt="Student" className="w-20 h-24 object-cover rounded-lg border-2 border-white/20 shrink-0" />
          ) : (
            <div className="w-20 h-24 bg-blue-600 rounded-lg flex items-center justify-center text-3xl font-bold shrink-0">
              {student.studentName[0]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold">{student.studentName}</h2>
            <p className="text-slate-300 text-sm">S/O {student.fatherName}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">{student.registrationNumber}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.grade === 'F' ? 'bg-red-500' : 'bg-green-500'}`}>
                Grade {student.grade}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${student.result === 'PASS' ? 'bg-green-500' : 'bg-red-500'}`}>
                {student.result}
              </span>
              <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold">{student.percentage}%</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap shrink-0">
            <Link to={`/admin/students/edit/${id}`} className="btn-secondary text-xs py-1.5 bg-white/10 border-white/20 text-white hover:bg-white/20">✏️ Edit</Link>
            <button onClick={handleRegenerate} disabled={regenerating} className="btn-secondary text-xs py-1.5 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50">
              {regenerating ? '⏳' : '🔄'} PDF
            </button>
            <button onClick={handleDelete} disabled={deleting} className="text-xs py-1.5 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50">
              {deleting ? '⏳' : '🗑️'} Delete
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab === 'info' ? '📋 Info' : tab === 'marks' ? '📝 Marks' : '📄 PDF'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'info' && (
        <div className="grid md:grid-cols-2 gap-5">
          <div className="card">
            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Personal Details</h3>
            <InfoRow label="Student Name" value={student.studentName} />
            <InfoRow label="Father's Name" value={student.fatherName} />
            <InfoRow label="Mother's Name" value={student.motherName} />
            <InfoRow label="Registration No." value={student.registrationNumber} />
            <InfoRow label="Roll Number" value={student.rollNumber} />
          </div>
          <div className="card">
            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Course Details</h3>
            <InfoRow label="Course" value={student.courseName} />
            <InfoRow label="Course Code" value={student.courseCode} />
            <InfoRow label="Duration" value={student.duration} />
            <InfoRow label="Session" value={`${student.sessionFrom} to ${student.sessionTo}`} />
            <InfoRow label="Issue Date" value={student.issueDate} />
            <InfoRow label="Center" value={student.centerOfExamination} />
            <InfoRow label="IIVET-VLCs Code" value={student.ivetVlcsCode} />
          </div>
        </div>
      )}

      {activeTab === 'marks' && (
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">Statement of Marks</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white text-xs">
                  <th className="py-2 px-3 text-left">#</th>
                  <th className="py-2 px-3 text-left">Subject</th>
                  <th className="py-2 px-3 text-center">Theory</th>
                  <th className="py-2 px-3 text-center">Practical</th>
                  <th className="py-2 px-3 text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {student.subjects?.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-gray-400">{i + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-gray-700">{s.name}</td>
                    <td className="py-2.5 px-3 text-center">{s.theoryMarks}<span className="text-gray-400">/{s.maxTheory}</span></td>
                    <td className="py-2.5 px-3 text-center">{s.practicalMarks}<span className="text-gray-400">/{s.maxPractical}</span></td>
                    <td className="py-2.5 px-3 text-center font-bold text-blue-700">{s.totalMarks || s.theoryMarks + s.practicalMarks}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-bold">
                  <td colSpan="4" className="py-3 px-3 text-right text-gray-700">Total:</td>
                  <td className="py-3 px-3 text-center text-blue-700 text-base">{student.totalObtained}/{student.totalMax}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Percentage</div>
              <div className="text-2xl font-bold text-blue-700">{student.percentage}%</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Grade</div>
              <div className="text-2xl font-bold text-green-700">{student.grade}</div>
            </div>
            <div className={`${student.result === 'PASS' ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-3`}>
              <div className="text-xs text-gray-500">Result</div>
              <div className={`text-2xl font-bold ${student.result === 'PASS' ? 'text-green-700' : 'text-red-700'}`}>{student.result}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pdf' && (
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">Certificate & Marksheet PDF</h3>
          {student.pdfUrl ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                <a href={`${SERVER_URL}${student.pdfUrl}`} target="_blank" rel="noreferrer" className="btn-primary">📄 View PDF</a>
                <a href={`${SERVER_URL}${student.pdfUrl}`} download className="btn-success">⬇️ Download PDF</a>
                <button onClick={handleRegenerate} disabled={regenerating} className="btn-secondary disabled:opacity-50">
                  {regenerating ? '⏳ Regenerating...' : '🔄 Regenerate PDF'}
                </button>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: '75vh' }}>
                <iframe
                  src={`${SERVER_URL}${student.pdfUrl}`}
                  className="w-full h-full"
                  title="Certificate PDF"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">📄</div>
              <p className="font-medium text-gray-600">No PDF generated yet</p>
              <button onClick={handleRegenerate} disabled={regenerating} className="btn-primary mt-4 mx-auto">
                {regenerating ? '⏳ Generating...' : '🚀 Generate PDF Now'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

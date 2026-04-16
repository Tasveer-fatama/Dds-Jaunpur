import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { studentAPI } from '../../utils/api';
import StudentForm from '../../Admin/admin/StudentForm.jsx';
import toast from 'react-hot-toast';

export default function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentAPI.getById(id)
      .then(res => setStudent(res.data))
      .catch(() => toast.error('Failed to load student'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="spinner w-8 h-8" />
    </div>
  );

  if (!student) return (
    <div className="text-center py-20 text-gray-500">
      <div className="text-4xl mb-2">😕</div>
      <p>Student not found.</p>
      <Link to="/admin/students" className="text-blue-600 hover:underline text-sm mt-2 inline-block">← Back to Students</Link>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/admin/students" className="text-gray-400 hover:text-gray-600 text-sm">← Students</Link>
        <span className="text-gray-300">/</span>
        <Link to={`/admin/students/${id}`} className="text-gray-400 hover:text-gray-600 text-sm">{student.studentName}</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-semibold text-gray-700">Edit</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Edit Student</h2>
        <p className="text-gray-500 text-sm mt-1">Updating will regenerate the PDF automatically.</p>
      </div>
      <StudentForm initialData={student} studentId={id} />
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import StudentForm from '../../Admin/admin/StudentForm.jsx';

export default function AddStudent() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/admin/students" className="text-gray-400 hover:text-gray-600 text-sm">← Students</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-semibold text-gray-700">Add New Student</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Add New Student</h2>
        <p className="text-gray-500 text-sm mt-1">Fill in the details below. PDF will be auto-generated on save.</p>
      </div>
      <StudentForm />
    </div>
  );
}

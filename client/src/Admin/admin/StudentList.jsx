import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI, SERVER_URL } from '../../utils/api';
import toast from 'react-hot-toast';

const GRADE_COLORS = {
  'A+': 'bg-green-100 text-green-700', 'A': 'bg-blue-100 text-blue-700',
  'B+': 'bg-purple-100 text-purple-700', 'B': 'bg-yellow-100 text-yellow-700',
  'C': 'bg-orange-100 text-orange-700', 'F': 'bg-red-100 text-red-700',
};

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [deleting, setDeleting] = useState(null);
  const [regenerating, setRegenerating] = useState(null);

  const loadStudents = useCallback(async (page = 1, searchTerm = search) => {
    setLoading(true);
    try {
      const res = await studentAPI.getAll({ page, limit: 15, search: searchTerm });
      setStudents(res.data || []);
      setPagination(res.pagination || { total: 0, page: 1, pages: 1 });
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { loadStudents(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadStudents(1, search);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete student "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await studentAPI.delete(id);
      toast.success('Student deleted');
      loadStudents();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const handleRegenerate = async (id) => {
    setRegenerating(id);
    const t = toast.loading('Regenerating PDF...');
    try {
      await studentAPI.regeneratePDF(id);
      toast.success('PDF regenerated!', { id: t });
      loadStudents();
    } catch (err) {
      toast.error(err.message, { id: t });
    } finally {
      setRegenerating(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Students</h2>
          <p className="text-gray-500 text-sm">{pagination.total} total records</p>
        </div>
        <Link to="/admin/students/add" className="btn-primary">➕ Add Student</Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="card py-4">
        <div className="flex gap-3">
          <input
            type="text"
            className="form-input flex-1"
            placeholder="Search by name, registration no..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="btn-primary">🔍 Search</button>
          {search && (
            <button type="button" onClick={() => { setSearch(''); loadStudents(1, ''); }} className="btn-secondary">Clear</button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 text-white text-xs">
                <th className="py-3 px-4 text-left font-semibold">Student</th>
                <th className="py-3 px-4 text-left font-semibold">Reg. No.</th>
                <th className="py-3 px-4 text-left font-semibold">Course</th>
                <th className="py-3 px-4 text-center font-semibold">Marks</th>
                <th className="py-3 px-4 text-center font-semibold">Grade</th>
                <th className="py-3 px-4 text-center font-semibold">Result</th>
                <th className="py-3 px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(8)].map((_, i) => (
                  <tr key={i}><td colSpan="7" className="py-3 px-4"><div className="h-6 bg-gray-100 rounded animate-pulse" /></td></tr>
                ))
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-gray-400">
                    <div className="text-4xl mb-2">📋</div>
                    <p>No students found.</p>
                    <Link to="/admin/students/add" className="text-blue-600 hover:underline text-sm mt-2 inline-block">Add first student →</Link>
                  </td>
                </tr>
              ) : (
                students.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {s.photoUrl ? (
                          <img src={`${SERVER_URL}${s.photoUrl}`} alt="" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {s.studentName[0]}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-800">{s.studentName}</div>
                          <div className="text-xs text-gray-400">Roll: {s.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">{s.registrationNumber}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs max-w-[160px]">
                      <div className="truncate" title={s.courseName}>{s.courseName}</div>
                    </td>
                    <td className="py-3 px-4 text-center text-xs font-medium">
                      {s.totalObtained}/{s.totalMax}
                      <div className="text-gray-400">{s.percentage}%</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${GRADE_COLORS[s.grade] || 'bg-gray-100 text-gray-600'}`}>
                        {s.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.result === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {s.result}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1 flex-wrap">
                        <Link to={`/admin/students/${s._id}`} title="View" className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">👁️</Link>
                        <Link to={`/admin/students/edit/${s._id}`} title="Edit" className="p-1.5 rounded-lg hover:bg-yellow-100 text-yellow-600 transition-colors">✏️</Link>
                        {s.pdfUrl ? (
                          <a href={`${SERVER_URL}${s.pdfUrl}`} target="_blank" rel="noreferrer" title="View PDF" className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition-colors">📄</a>
                        ) : (
                          <button onClick={() => handleRegenerate(s._id)} disabled={regenerating === s._id} title="Generate PDF" className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition-colors disabled:opacity-50">
                            {regenerating === s._id ? '⏳' : '🔄'}
                          </button>
                        )}
                        {s.pdfUrl && (
                          <a href={`${SERVER_URL}${s.pdfUrl}`} download title="Download PDF" className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors">⬇️</a>
                        )}
                        <button onClick={() => handleDelete(s._id, s.studentName)} disabled={deleting === s._id} title="Delete" className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50">
                          {deleting === s._id ? '⏳' : '🗑️'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm">
            <span className="text-gray-500">Page {pagination.page} of {pagination.pages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => loadStudents(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40"
              >← Prev</button>
              <button
                onClick={() => loadStudents(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40"
              >Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

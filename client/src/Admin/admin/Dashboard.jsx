import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI, SERVER_URL } from '../../utils/api';
import toast from 'react-hot-toast';

const StatCard = ({ label, value, icon, color, sub }) => (
  <div className={`card flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
    <div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm font-medium text-gray-500">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, pass: 0, fail: 0, courses: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await studentAPI.getAll({ limit: 5 });
        const students = res.data || [];
        setRecent(students);
        const allRes = await studentAPI.getAll({ limit: 1000 });
        const all = allRes.data || [];
        const courses = [...new Set(all.map(s => s.courseName))].length;
        setStats({
          total: allRes.pagination?.total || all.length,
          pass: all.filter(s => s.result === 'PASS').length,
          fail: all.filter(s => s.result === 'FAIL').length,
          courses,
        });
      } catch (e) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Welcome to DDS Certificate Management System</p>
        </div>
        <Link to="/admin/students/add" className="btn-primary">
          <span>➕</span> Add Student
        </Link>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse"><div className="h-12 bg-gray-100 rounded-lg" /></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Students" value={stats.total} icon="👥" color="bg-blue-50" />
          <StatCard label="Passed" value={stats.pass} icon="✅" color="bg-green-50" sub={`${stats.total ? Math.round(stats.pass / stats.total * 100) : 0}% pass rate`} />
          <StatCard label="Failed" value={stats.fail} icon="❌" color="bg-red-50" />
          <StatCard label="Courses" value={stats.courses} icon="📚" color="bg-purple-50" />
        </div>
      )}

      {/* DDS Info Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 rounded-xl p-6 text-white flex items-center justify-between">
        <div>
          <div className="text-2xl font-black italic tracking-widest text-white mb-1">DDS</div>
          <div className="font-semibold">Institute of English Language & Computer Science</div>
          <div className="text-blue-200 text-sm mt-1">Since 2005 • AN ISO Registered Institute • Jaunpur, U.P.</div>
        </div>
        <div className="text-right text-sm text-blue-200 space-y-1">
          <div>Firm Reg. No.: 7-V-13047</div>
          <div>Trade Mark No.: 2454159</div>
          <div>Society Reg. No.: V-42097</div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Recent Students</h3>
          <Link to="/admin/students" className="text-sm text-blue-600 hover:underline font-medium">View All →</Link>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />)}
          </div>
        ) : recent.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <div className="text-4xl mb-2">📄</div>
            <div>No students yet. <Link to="/admin/students/add" className="text-blue-600 hover:underline">Add the first one!</Link></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Reg. No.</th>
                  <th className="pb-3 font-semibold">Course</th>
                  <th className="pb-3 font-semibold">Grade</th>
                  <th className="pb-3 font-semibold">Result</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium text-gray-800">{s.studentName}</td>
                    <td className="py-3 text-gray-500 font-mono text-xs">{s.registrationNumber}</td>
                    <td className="py-3 text-gray-600 text-xs max-w-[150px] truncate">{s.courseName}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        s.grade === 'A+' ? 'bg-green-100 text-green-700' :
                        s.grade === 'A' ? 'bg-blue-100 text-blue-700' :
                        s.grade === 'F' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>{s.grade}</span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.result === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {s.result}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Link to={`/admin/students/${s._id}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium">View</Link>
                        {s.pdfUrl && (
                          <a href={`${SERVER_URL}${s.pdfUrl}`} target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-800 text-xs font-medium">PDF</a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

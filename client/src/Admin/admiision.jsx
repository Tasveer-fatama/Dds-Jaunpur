import React, { useEffect, useState } from "react";
import axios from "axios";

const AdmissionTable = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/admissions"); // replace with your API URL
        setAdmissions(response.data);
      } catch (error) {
        console.error("Error fetching admissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-red-900 to-black p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <h2 className="text-3xl font-bold text-center bg-red-600 text-white py-4">
          Admissions Submitted
        </h2>

        {loading ? (
          <p className="text-center py-10 text-lg text-red-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-black text-white uppercase text-sm">
                  <th className="px-4 py-3 border border-red-600">Full Name</th>
                  <th className="px-4 py-3 border border-red-600">Email</th>
                  <th className="px-4 py-3 border border-red-600">Phone</th>
                  <th className="px-4 py-3 border border-red-600">Course</th>
                  <th className="px-4 py-3 border border-red-600">Mode</th>
                </tr>
              </thead>
              <tbody>
                {admissions.length > 0 ? (
                  admissions.map((admission, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-red-50" : "bg-white"
                      } hover:bg-red-100 transition`}
                    >
                      <td className="px-4 py-3 border border-red-600 font-semibold text-black">
                        {admission.name}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-gray-700">
                        {admission.email}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-gray-700">
                        {admission.phone}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-red-700 font-medium">
                        {admission.course}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-gray-700">
                        {admission.mode}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-gray-500 text-lg border border-red-600"
                    >
                      No admissions submitted yet ❌
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionTable;

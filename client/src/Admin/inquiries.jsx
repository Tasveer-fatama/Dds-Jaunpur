import React, { useEffect, useState } from "react";
import axios from "axios";

const InquiryTable = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch inquiries from backend
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/inquiries"); // replace with your API URL
        setInquiries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-red-900 to-black p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <h2 className="text-3xl font-bold text-center bg-red-600 text-white py-4">
          Student Inquiries
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
                  <th className="px-4 py-3 border border-red-600">Message</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-red-50" : "bg-white"
                      } hover:bg-red-100 transition`}
                    >
                      <td className="px-4 py-3 border border-red-600 font-semibold text-black">
                        {inquiry.name}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-gray-700">
                        {inquiry.email}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-gray-700">
                        {inquiry.phone}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-red-700 font-medium">
                        {inquiry.course}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-gray-700">
                        {inquiry.message}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-gray-500 text-lg border border-red-600"
                    >
                      No inquiries submitted yet ❌
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

export default InquiryTable;

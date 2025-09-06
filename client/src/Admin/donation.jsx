import React, { useEffect, useState } from "react";
import axios from "axios";

const DonationTable = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          "https://ddsgroup.onrender.com/api/admin/donations" // Your backend API
        );
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Helper function to get correct image URL
  const getImageUrl = (screenshot) => {
    if (!screenshot) return null;

    // If it's a full URL (Cloudinary or external), use it
    if (screenshot.startsWith("http://") || screenshot.startsWith("https://")) {
      return screenshot;
    }

    // Otherwise, assume it's a local path in /uploads
    return ` https://ddsgroup.onrender.com/${screenshot}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-red-900 to-black p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <h2 className="text-3xl font-bold text-center bg-red-600 text-white py-4">
          Donations Submitted
        </h2>

        {loading ? (
          <p className="text-center py-10 text-lg text-red-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-black text-white uppercase text-sm">
                  <th className="px-4 py-3 border border-red-600">Name</th>
                  <th className="px-4 py-3 border border-red-600">Email</th>
                  <th className="px-4 py-3 border border-red-600">UPI Screenshot</th>
                  <th className="px-4 py-3 border border-red-600">Amount</th>
                  <th className="px-4 py-3 border border-red-600">Message</th>
                </tr>
              </thead>
              <tbody>
                {donations.length > 0 ? (
                  donations.map((donation, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-red-50" : "bg-white"
                      } hover:bg-red-100 transition`}
                    >
                      <td className="px-4 py-3 border border-red-600 font-semibold text-black">
                        {donation.name}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-gray-700">
                        {donation.email}
                      </td>
                      <td className="px-4 py-3 border border-red-600">
                        {donation.screenshot ? (
                          <img
                            src={getImageUrl(donation.screenshot)}
                            alt="UPI Screenshot"
                            className="h-20 w-20 object-cover mx-auto rounded-lg border border-gray-300"
                          />
                        ) : (
                          "No Screenshot"
                        )}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-red-700 font-medium">
                        {donation.amount ? `₹${donation.amount}` : "N/A"}
                      </td>
                      <td className="px-4 py-3 border border-red-600 text-gray-700">
                        {donation.message || "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-gray-500 text-lg border border-red-600"
                    >
                      No donations submitted yet ❌
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

export default DonationTable;

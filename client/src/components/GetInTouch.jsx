
import { useState } from "react";

const API_BASE = "https://ddsgroup.onrender.com";

export default function StudentSearch() {
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSearch = async () => {
    if (!regNumber.trim()) {
      setError("Registration number daalna zaroori hai.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const searchRes = await fetch(
        `${API_BASE}/api/students/search?registrationNumber=${regNumber.trim()}`
      );

      if (!searchRes.ok) throw new Error("Student nahi mila. Registration number check karo.");

      const result = await searchRes.json();
      const students = result.data;

      if (!students || students.length === 0) throw new Error("Student nahi mila. Registration number check karo.");

      const student = students[0];

      const pdfRes = await fetch(`${API_BASE}/api/students/regenerate-pdf/${student._id}`, {
        method: "POST",
      });

      if (!pdfRes.ok) throw new Error("PDF generate nahi hui. Dobara try karo.");

      const data = await pdfRes.json();
      const pdfUrl = `${API_BASE}${data.pdfPath}`;

      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `${regNumber.trim()}_marksheet.pdf`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setSuccess("PDF download ho gayi! ✓");
    } catch (err) {
      setError(err.message || "Kuch galat ho gaya. Dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-rose-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/20 border border-red-400/30 mb-4">
            <svg className="w-8 h-8 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Marksheet Download</h1>
          <p className="text-red-300 text-sm mt-1">DDS Group of Institutions</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-red-200 text-sm font-medium mb-2">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Apna naam likhein"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 transition-all"
            />
          </div>

          {/* Registration Number Field */}
          <div className="mb-6">
            <label className="block text-red-200 text-sm font-medium mb-2">
              Registration Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => { setRegNumber(e.target.value); setError(""); setSuccess(""); }}
              onKeyDown={handleKeyDown}
              placeholder="Jaise: 9890"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 transition-all"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 flex items-start gap-2 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 flex items-start gap-2 bg-green-500/10 border border-green-400/30 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/40 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-500/20"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                PDF load ho rahi hai...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Search & Download PDF
              </>
            )}
          </button>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © DDS Group of Institutions
        </p>
      </div>
    </div>
  );
}


import { useState } from "react";

export default function LoginPage({ setIsAuthenticated }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "romiomarch1987@gmail.com";
  const ADMIN_PASSWORD = "Rambharose293@";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      alert("Login Successful ✅");
      setIsAuthenticated(true); // Dashboard dikhane ke liye
    } else {
      setError("❌ Wrong Email or Password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-700 via-black to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-10 rounded-2xl shadow-2xl w-[380px] border-t-8 border-red-600"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600 uppercase">
          Admin Login
        </h2>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-black text-white py-2 px-4 rounded-lg font-bold transition duration-300 shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  // Data dummy mahasiswa
  const dummyUsers = [
    { nim: "1234567890", password: "123" },
    { nim: "0987654321", password: "456" },
    { nim: "1122334455", password: "789" },
  ];

  const [formData, setFormData] = useState({
    nim: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if credentials match any dummy user
    const user = dummyUsers.find(
      (user) => user.nim === formData.nim && user.password === formData.password
    );

    if (user) {
      // Save login state if remember me is checked
      if (formData.remember) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userNIM", formData.nim);
      }

      // Redirect to dashboard
      window.location.href = "/mahasiswa/dashboard";
    } else {
      setError("NIM atau Password salah!");
    }
  };

  return (
    <div className="items-center justify-center bg-gray py-12 px-4 sm:px-4 lg:px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-instrument font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-instrument">
            Please sign in to your account
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="nim"
              className="block text-sm font-instrument font-medium text-gray-700"
            >
              Email / NIM
            </label>
            <div className="mt-1">
              <input
                id="nim"
                name="nim"
                type="text"
                required
                value={formData.nim}
                onChange={handleChange}
                className="font-instrument appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan NIM anda"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-instrument font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="font-instrument appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm font-instrument text-gray-900"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="font-medium text-primary hover:text-blue-700"
              onClick={() => (window.location.href = "/forgot-password")}
            >
              Forgot password?
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  // ← email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (username.length > 20) {
      return "Username must be less than 20 characters";
    }
    if (username.includes(" ")) {
      return "Username cannot contain spaces";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers and underscores";
    }
    return ""; // no error
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "username") {
      const error = validateUsername(e.target.value);
      setUsernameError(error);
    }
    if (e.target.name === "email") {
      if (!validateEmail(e.target.value)) {
        setEmailError("Please enter a valid email");
      } else {
        setEmailError("");
      }
    }
    if (e.target.name === "password") {
      if (e.target.value.length < 6) {
        setPasswordError("Password should be atleast 6 character long");
      } else {
        setPasswordError("");
      }
    }
  };
  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  useEffect(() => {
    console.log("page rendered");
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    // Username Validation
    const usernameErr = validateUsername(formData.username);

    if (usernameErr) {
    setUsernameError(usernameErr);
    setLoading(false);
    return;
    }

    // Email Validation
    if (!validateEmail(formData.email)) {
    setEmailError("Please enter a valid email address");
    setLoading(false);
    return;
    }

    // Password Validation
    if (formData.password.length < 6) {
    setPasswordError("Password should be at least 6 characters long");
    setLoading(false);
    return;
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");

    setFormData((prev) => ({
        ...prev,
        confirmPassword: "",
    }));

    setLoading(false);
    return;
    }

    try {
    const response = await axiosInstance.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
    });
    //This code sends a POST request from the React frontend to the backend registration API using Axios.
    //The form data is sent in the request body, and Axios automatically combines the endpoint with the predefined baseURL.
    //The backend receives the data through req.body, processes user registration, and returns a response which is stored in the response object.

    console.log(response.data);

    // Clear Form
    resetForm();

    // Navigate to Login
    navigate("/login");
    } catch (err) {
    console.log(err);

    setError(err.response?.data?.message || "Something went wrong");
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8">
        <div className="mb-4 text-center ">
          {/* Header */}
          <h1 className="text-3xl  font-bold text-white">MERN Prep Kit</h1>
          <p className="text-gray-400 mt-2">Create account for learning</p>
        </div>
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/*Username*/}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={() => {
                const error = validateUsername(formData.name);
                setUsernameError(error);
              }}
              placeholder="Enter username"
              required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            {usernameError && (
              <p className="text-red-400 text-xs mt-1">⚠ {usernameError}</p>
            )}
          </div>

          {/*Email*/}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => {
                if (!validateEmail(formData.email)) {
                  setEmailError("Please enter a valid email");
                }
              }}
              placeholder="Enter email like - john@example.com"
              required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            {emailError && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                ⚠ {emailError}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => {
                if (formData.password.length < 6) {
                  setPasswordError(
                    "Password should be at least 6 characters long",
                  );
                } else {
                  setPasswordError("");
                }
              }}
              placeholder="Enter password"
              required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            {passwordError && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                ⚠ {passwordError}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Creating new account..." : "Sign up"}
          </button>
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

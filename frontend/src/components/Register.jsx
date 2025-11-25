import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Register.css"; 

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", form);
      setMessage(res.data.message || "Account created successfully!");

      // Redirect after a short delay so user sees the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed. Please try again.";
      setError(msg);
      setLoading(false); // Only stop loading on error (on success we navigate away)
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p className="subtitle">Join us to start managing your tasks</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="input-field select-field"
          >
            <option value="user">Regular User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        {/* Feedback Messages */}
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="btn-link"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
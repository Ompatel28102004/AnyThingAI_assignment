import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Login.css"; 

const Login = ({ onAuthSuccess }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (onAuthSuccess) {
        onAuthSuccess(user, token);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-header">
        <h2>Welcome Back</h2>
        <p className="subtitle">Enter your details to sign in</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
            className="input-field"
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
            placeholder="••••••••"
            required
            className="input-field"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="login-footer">
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn-link"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
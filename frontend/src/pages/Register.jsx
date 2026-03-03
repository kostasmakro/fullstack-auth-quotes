import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main">
      <h1 className="brand">KM Labs</h1>
      <h3 className="subtitle">Create your account</h3>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Minimum 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirm">Confirm Password:</label>
        <input
          id="confirm"
          type="password"
          placeholder="Re-enter your Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <div className="wrap">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
      </form>

      <p className="linkRow">
        Already registered? <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
}
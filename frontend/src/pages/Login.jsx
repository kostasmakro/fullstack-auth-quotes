import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      navigate("/quotes");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main">
      <h1 className="brand">KM Labs</h1>
      <h3 className="subtitle">Enter your login credentials</h3>

      {error && <div className="error">{error}</div>}

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
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="wrap">
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Submit"}
          </button>
        </div>
      </form>

      <p className="linkRow">
        Not registered? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
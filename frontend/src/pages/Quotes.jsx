import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Quotes() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadQuote() {
    setError("");
    setBtnLoading(true);
    try {
      const data = await api("/quotes/random", { method: "GET" });
      setQuote(data);
    } catch (err) {
      // If cookie missing/expired -> go to login
      if (err.message.toLowerCase().includes("not authenticated")) {
        navigate("/login");
        return;
      }
      setError(err.message);
    } finally {
      setBtnLoading(false);
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
    } finally {
      navigate("/login");
    }
  }

  useEffect(() => {
    loadQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      <div className="topRow">
        <h1 className="brand" style={{ margin: 0 }}>KM Labs</h1>
        <button className="smallBtn" onClick={logout}>
          Logout
        </button>
      </div>

      <h3 className="subtitle">Your random quote</h3>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p className="subtitle">Loading...</p>
      ) : (
        <>
          <div className="quoteBox">
            <p className="quoteText">“{quote?.quote}”</p>
            <p className="quoteAuthor">— {quote?.author}</p>
          </div>

          <div className="wrap">
            <button onClick={loadQuote} disabled={btnLoading}>
              {btnLoading ? "Fetching..." : "New Random Quote"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
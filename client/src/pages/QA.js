import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { askQuestion, getChatHistory, saveChat } from "../api/qa";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function QA() {
  const { user, logout } = useContext(AuthContext);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getChatHistory(localStorage.getItem("token"));
        setHistory(res.data);
      } catch {
        setHistory([]);
      }
    };
    if (user) fetchHistory();
  }, [user]);

  if (!user || user.role !== "client") {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    try {
      const res = await askQuestion(question, localStorage.getItem("token"));
      setAnswer(res.data.answer);
      // Save to history
      await saveChat(question, res.data.answer, localStorage.getItem("token"));
      // Refresh history
      const histRes = await getChatHistory(localStorage.getItem("token"));
      setHistory(histRes.data);
    } catch {
      setAnswer("Failed to get answer.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="center-container" style={{alignItems: 'stretch'}}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '900px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}>
        <h2 style={{marginBottom: "1rem"}}>Ask a Question</h2>
        <input type="text" placeholder="Your question" value={question} onChange={e => setQuestion(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Asking..." : "Ask"}</button>
        {answer && <div className="text-success">{answer}</div>}
        <button type="button" className="secondary" onClick={handleLogout} style={{marginTop: "1rem"}}>Logout</button>
        <hr style={{margin: "1.5rem 0"}} />
        <h3>Chat History</h3>
        <div style={{maxHeight: "400px", minHeight: '200px', overflowY: "auto", textAlign: "left", background: "#f9f9f9", borderRadius: "0.25rem", padding: "1rem", marginBottom: "1rem"}}>
          {history.length === 0 && <div>No history yet.</div>}
          {history.map((item, idx) => (
            <div key={item._id || idx} style={{marginBottom: "1rem"}}>
              <div><b>Q:</b> {item.question}</div>
              <div><b>A:</b> {item.answer}</div>
              <div style={{fontSize: "0.8em", color: "#888"}}>{new Date(item.createdAt).toLocaleString()}</div>
              <hr />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="center-container">
      <div className="form-box">
        <h2 style={{marginBottom: "1rem"}}>Welcome, {user.name}!</h2>
        <div style={{marginBottom: "1rem"}}>Role: <b>{user.role}</b></div>
        {user.role === "admin" ? (
          <button onClick={() => navigate("/upload")}>Upload PDF</button>
        ) : (
          <button onClick={() => navigate("/qa")}>Ask a Question</button>
        )}
        <button className="secondary" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

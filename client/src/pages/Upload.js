import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadPDF } from "../api/pdf";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Upload() {
  const { user, logout } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  if (!user || user.role !== "admin") {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Uploading...");
    try {
      await uploadPDF(file, localStorage.getItem("token"));
      setStatus("Upload successful!");
    } catch {
      setStatus("Upload failed.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 style={{marginBottom: "1rem"}}>Upload PDF</h2>
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
        {status && <div className={status.includes("success") ? "text-success" : "text-error"}>{status}</div>}
        <button type="button" className="secondary" onClick={handleLogout} style={{marginTop: "1rem"}}>Logout</button>
      </form>
    </div>
  );
}

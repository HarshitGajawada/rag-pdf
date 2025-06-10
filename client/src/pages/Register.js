import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 style={{marginBottom: "1rem"}}>Register</h2>
        {error && <div className="text-error">{error}</div>}
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        <div style={{marginTop: "0.5rem", fontSize: "0.9rem"}}>Already have an account? <a href="/login">Login</a></div>
      </form>
    </div>
  );
}

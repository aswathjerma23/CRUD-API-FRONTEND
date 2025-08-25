import React, { useState } from "react";
import axios from "axios";
import "./css/register.css"
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.message || "User registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        {message && <p className={message.includes("successfully") ? "success" : "error"}>{message}</p>}
        <form onSubmit={handleRegister}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Register from "./pages/Register.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
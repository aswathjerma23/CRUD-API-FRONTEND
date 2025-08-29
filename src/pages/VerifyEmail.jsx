import React, { useState } from "react";
import axios from "axios";
import "./css/verifyemail.css"; 

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("https://crud-api-backend-72qv.onrender.com/api/verify/send", { email });
      setMessage(res.data.message);
      if (res.data.message === "OTP sent successfully") {
        setOtpSent(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP";
      setMessage(msg);
      if (msg === "User aldready verified") {
        setOtpSent(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("https://crud-api-backend-72qv.onrender.com/api/verify/verify", { email, otp });
      setMessage(res.data.message);
      setOtpSent(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Email Verification</h2>
        {message && (
          <p className={message.includes("success") ? "success" : "error"}>
            {message}
          </p>
        )}

        {!otpSent && (
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOtp} className="btn">
              Send OTP
            </button>
          </div>
        )}

        {otpSent && (
          <div className="form-group">
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp} className="btn">
              Verify Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
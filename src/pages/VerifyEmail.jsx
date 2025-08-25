import React, { useState } from "react";
import axios from "axios";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/verify/send", { email });
      setMessage(res.data.message);

      if (res.data.message === "OTP sent successfully") {
        setOtpSent(true);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to send OTP";
      setMessage(msg);
      if (msg === "User aldready verified") {
        setOtpSent(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/verify/verify", { email, otp });
      setMessage(res.data.message);
      setOtpSent(false);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Email Verification</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {!otpSent && (
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
          <button
            onClick={handleSendOtp}
            style={{ marginTop: "10px", padding: "10px 20px" }}
          >
            Send OTP
          </button>
        </div>
      )}

      {otpSent && (
        <div>
          <div style={{ marginBottom: "10px" }}>
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <button
            onClick={handleVerifyOtp}
            style={{ padding: "10px 20px" }}
          >
            Verify Email
          </button>
        </div>
      )}
    </div>
  );
}
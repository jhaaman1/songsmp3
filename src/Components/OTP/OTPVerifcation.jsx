import React, { useEffect, useState } from "react";
import "./otp.css";
import { Link, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../Services/apiServices";

const OTPVerifcation = () => {
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);
  };

  const requestId = localStorage.getItem("requestId");
  const phoneNumber = localStorage.getItem("phoneNumber");

  const handleVerifyOTP = async () => {
    try {
      const enteredOTP = otpDigits.join("");
      const response = await verifyOTP(
        phoneNumber,
        requestId,
        enteredOTP
      );
      console.log("res", response);
      navigate("/listSong")
    } catch (error) {
        console.error("OTP verification failed:", error);
      }
  };

  const mobile = localStorage.getItem("phoneNumber")
  return (
    <div className="d-flex justify-content-center align-items-center container">
      <div className="card ">
        <h5 className="m-0">OTP Verification</h5>
        <span className="mobile-text">
          <b>
            We have sent an OTP to {mobile}. Please enter the code received to
            verify
          </b>
        </span>
        <div className="d-flex flex-row mt-5 otp-box">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{width: '65px'}}
            />
          ))}
        </div>

        <div>
          <button className="but-col mt-4" onClick={handleVerifyOTP}>
            Verify
          </button>
          <Link className="resend" onClick={""}>Resend OTP</Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerifcation;

import React, { useState } from "react";
import "./Login.css";
import { sendOTP } from "../../Services/apiServices";
import { useNavigate } from "react-router-dom";
import OTPVerifcation from "../OTP/OTPVerifcation";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reqID, setReqID] = useState("")
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const phoneNumberWithCode = "+91" + phoneNumber; // Add +91 before sending
      const response = await sendOTP(phoneNumberWithCode);
      console.log("OTP Sent:", response);
      localStorage.setItem("phoneNumber", phoneNumberWithCode);
      localStorage.setItem("requestId", response.requestId);
      navigate("/otp");
    } catch (error) {
      console.error(error);
    }
  };
  

  console.log('req',reqID)

  return (
    <div className="d-flex justify-content-center align-items-center container">
      <div className="card py-5 px-3">
        <h5 className="m-0 sign-text">Sign In</h5>
        <span className="mobile-text">
          <b>
            Please Enter your mobile number to login. We will send an OTP to
            verify your number
          </b>
        </span>
        <div className="input-group mb-2 size-input">
          <span className="input-group-text">
            <img
              src="https://icon-library.com/images/india-flag-icon/india-flag-icon-29.jpg"
              alt=""
              className="flag"
            />
          </span>
          <span className="input-group-text">+91</span>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            placeholder="Enter your phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button className="but-col mt-2" onClick={handleLogin}>
            Sign In
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Login;

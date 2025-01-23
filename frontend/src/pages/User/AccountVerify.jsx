import React, { useState } from 'react'
import { AccountVerify } from '../../components/index';
import { useNavigate } from 'react-router-dom';

function UserAccountVerify() {
     const [otp, setOtp] = useState("");
     const [error, setError] = useState("");

     const navigate = useNavigate();

     const handleOtpChange = (e) => {
         const input = e.target.value;
         // Allow only numbers and limit to 6 digits
         if (/^\d{0,6}$/.test(input)) {
             setOtp(input);
             setError(""); // Clear error when input is valid
         }
     };

     const handleSubmit = (e) => {
         e.preventDefault();
         if (otp.length !== 6) {
             setError("Please enter a valid 6-digit OTP.");
             return;
         }

         // Simulate API call
         console.log("OTP Submitted:", otp);
         alert("OTP verified successfully!");

         // Clear input after submission
         setOtp("");
         navigate("/admin/dashboard"); // Navigate to dashboard after successful OTP verification
     };
  return (
    <>
      <AccountVerify otp={otp} error={error} handleOtpChange={handleOtpChange} handleSubmit={handleSubmit} />
    </>
  )
}

export default UserAccountVerify

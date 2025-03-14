import React, { useEffect, useState } from "react";
import { AccountVerify } from "../../components/index";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendOtpMutation, useVerifyEmailMutation } from "../../Store/Auth/Auth-Api";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/Auth";

function UserAccountVerify() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [sendOtp] = useSendOtpMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    console.log(location.state);
    const email = location.state?.email; // Access email from state
    console.log(email);
    const [verifyEmail] = useVerifyEmailMutation()

    useEffect(() => {
        try {
            const response = sendOtp({ email: email });
            console.log(response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            console.log(response.data.message);
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    const handleOtpChange = (e) => {
        const input = e.target.value;
        // Allow only numbers and limit to 6 digits
        if (/^\d{0,6}$/.test(input)) {
            setOtp(input);
            setError(""); // Clear error when input is valid
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        // Simulate API call
        console.log("OTP Submitted:", otp);
        
        try {
          const response = await verifyEmail({otp:otp})
          console.log(response);
          console.log(response.data.success);
          if (!response.data.success) {
            throw new Error(response.data.message);
          }
          console.log(response)
          console.log(response.data.message);
          console.log(response.data.data);
          dispatch(setUser(response.data.data))
          console.log("Email verified successfully!");
          navigate("/user"); // Navigate to dashboard after successful email verification
        } catch (error) {
          
        }
        // Clear input after submission
        setOtp("");
       
    };
    return (
        <>
            <AccountVerify
                otp={otp}
                error={error}
                handleOtpChange={handleOtpChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default UserAccountVerify;

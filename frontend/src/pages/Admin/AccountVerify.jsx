import React, { useEffect, useState } from "react";
import { AccountVerify } from "../../components/index";
import { useLocation, useNavigate } from "react-router-dom";
import {
    useSendOtpMutation,
    useVerifyEmailMutation,
} from "../../Store/AdminAuth/AdminAuth-Api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/Auth/index.js";

function AdminAccountVerify() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const location = useLocation();
    const email = location.state.email;
    console.log(email);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [sendOtp] = useSendOtpMutation();
    const [verifyEmail] = useVerifyEmailMutation();

    useEffect(() => {
        async function sendotp() {
            try {
                const response = await sendOtp({ email: email });
                console.log(response);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                console.log(response.data.message);
            } catch (error) {
                console.log(error.message);
            }
        }

        sendotp();
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
            const response = await verifyEmail({otp: otp});
            console.log(response);
            if (!response.data.success) {
                console.log(response.data.message);
                throw new Error("Invalid credentials");
            }
            console.log(response.data.message);
            dispatch(setUser(response.data.data));
            alert(response.data.message);
            navigate("/admin/dashboard", { replace: true }); // Redirect to dashboard after successful verification
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <AccountVerify
                handleOtpChange={handleOtpChange}
                handleSubmit={handleSubmit}
                otp={otp}
                error={error}
            />
        </>
    );
}

export default AdminAccountVerify;

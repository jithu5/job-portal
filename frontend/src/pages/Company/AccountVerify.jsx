import React, { useEffect, useState } from "react";
import { AccountVerify } from "../../components/index";
import { useLocation, useNavigate } from "react-router-dom";
import {
    useSendOtpMutation,
    useVerifyEmailMutation,
} from "../../Store/AdminAuth/AdminAuth-Api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/Auth/index.js";
import { toast } from "react-toastify";

function AdminAccountVerify() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const location = useLocation();
    const email = location.state.email;
    console.log(email);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [sendOtp] = useSendOtpMutation();
const [verifyEmail,{isLoading}] = useVerifyEmailMutation();

    useEffect(() => {
        async function sendotp() {
            try {
                const response = await sendOtp({ email: email }).unwrap()
                // if (!response.data.success) {
                //     throw new Error(response.data.message);
                // }
                toast.success(response.data.message);
            } catch (error) {
                toast.error(error?.data?.message || "Error sending OTP");
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

        try {
            const response = await verifyEmail({otp: otp}).unwrap();
            console.log(response);
            dispatch(setUser(response.data));
            toast.success(response.message);
            navigate("/company/dashboard", { replace: true }); // Redirect to dashboard after successful verification
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };
    return (
        <>
            <AccountVerify
                handleOtpChange={handleOtpChange}
                handleSubmit={handleSubmit}
                otp={otp}
                error={error}
                isLoading={isLoading}
            />
        </>
    );
}

export default AdminAccountVerify;

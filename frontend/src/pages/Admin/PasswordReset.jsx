import React, { useState } from "react";
import { PasswordReset } from "../../components/index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
    useResetPasswordOtpMutation,
    useVerifyResetOtpMutation,
    useUpdatePasswordMutation,
} from "../../Store/AdminAuth/AdminAuth-Api";

function AdminPasswordReset() {
    const [inputStatus, setInputStatus] = useState("email"); // 'email', 'otp', 'password'
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [resetPasswordOtp] = useResetPasswordOtpMutation();
    const [verifyResetOtp] = useVerifyResetOtpMutation();
    const [updatePassword] = useUpdatePasswordMutation();

    const steps = ["Enter Email", "Verify OTP", "Reset Password"];
    const activeStep = steps.indexOf(
        inputStatus === "email"
            ? "Enter Email"
            : inputStatus === "otp"
            ? "Verify OTP"
            : "Reset Password"
    );

    // React Hook Form
    const {
        register,
        handleSubmit,
        setError,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleEmailSubmit = async (data) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            setError("email", { message: "Please enter a valid email." });
            return;
        }
        console.log(data.email)
        try {
            // const response = await resetPasswordOtp(data)
        } catch (error) {
            
        }
        setInputStatus("otp");
        resetField("email");
    };

    const handleOtpSubmit = (data) => {
        if (data.otp.length < 6) {
            setError("otp", {
                message: "Invalid OTP. Please enter a 6-digit OTP.",
            });
            return;
        }
        setInputStatus("password");
        resetField("otp");
    };

    const handlePasswordSubmit = (data) => {
        if (data.password.length < 8) {
            setError("password", {
                message: "Password must be at least 8 characters long.",
            });
            return;
        }
        resetField("password");
        navigate("/admin/dashboard");
    };

    return (
        <PasswordReset
            inputStatus={inputStatus}
            steps={steps}
            activeStep={activeStep}
            handleEmailSubmit={handleEmailSubmit}
            handleOtpSubmit={handleOtpSubmit}
            handlePasswordSubmit={handlePasswordSubmit}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            register={register}
        />
    );
}

export default AdminPasswordReset;

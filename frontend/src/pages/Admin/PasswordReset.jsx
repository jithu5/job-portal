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
import { setUser } from "../../Store/Auth";

function AdminPasswordReset() {
    const [inputStatus, setInputStatus] = useState("email"); // 'email', 'otp', 'password'
    const [currentEmail, setCurrentEmail] = useState('')
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
            const response = await resetPasswordOtp(data)
            console.log(response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            console.log(response.data.message);
            setCurrentEmail(data.email)
            setInputStatus("otp");
            resetField("email");

        } catch (error) {
            console.log(error.message);
            
        }
     
    };

    const handleOtpSubmit = async (data) => {
        if (data.otp.length < 6) {
            setError("otp", {
                message: "Invalid OTP. Please enter a 6-digit OTP.",
            });
            return;
        }
        try {
            console.log(currentEmail);
            console.log(data.otp)
            const response = await verifyResetOtp({email:currentEmail , otp: data.otp});
            console.log(response);
            if (!response.data?.success) {
                throw new Error(response.data);
            }
            console.log(response.data.message);
            setInputStatus("password");
            resetField("otp");
        } catch (error) {
            console.log(error);
            
        }
    };

    const handlePasswordSubmit = async (data) => {
        if (data.password.length < 8) {
            setError("password", {
                message: "Password must be at least 8 characters long.",
            });
            return;
        }
        try {
            const response = await updatePassword({email:currentEmail, newPassword:data.password});
            console.log(response);
            if (!response.data?.success) {
                throw new Error(response.data);
            }
            console.log(response.data.message);
            alert(response.data.message);
            dispatch(setUser(response.data.data))
            navigate("/admin/dashboard");
            resetField("password");
        } catch (error) {
            console.log(error.message);
        }
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

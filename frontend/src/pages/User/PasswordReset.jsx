import React, { useState } from "react";
import { PasswordReset } from "../../components/index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useResetPasswordOtpMutation,useVerifyResetOtpMutation,useUpdatePasswordMutation } from "../../Store/Auth/Auth-Api";
import { setUser } from "../../Store/Auth";
import { toast } from "react-toastify";

function UserPasswordReset() {
    const [inputStatus, setInputStatus] = useState("email"); // 'email', 'otp', 'password'
    const [currentEmail, setCurrentEmail] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ resetPasswordOTP] = useResetPasswordOtpMutation();
    const [ verifyResetOtp] = useVerifyResetOtpMutation();
    const [ updatePassword] = useUpdatePasswordMutation();

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
        try {
            const response = await resetPasswordOTP({email:data.email}).unwrap();
            setInputStatus("otp");
            toast.success(response.message);
            setCurrentEmail(data.email);
            resetField("email");
        } catch (error) {
            toast.error(error?.data?.message || "Error while submitting password");
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
            const response = await verifyResetOtp({email:currentEmail,otp:data.otp}).unwrap()
            toast.success(response.message || "OTP submitted successfully");
            setInputStatus("password");
            resetField("otp");

        } catch (error) {
            toast.error(error?.data?.message || "Invalid OTP")
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
            const response = await updatePassword({email:currentEmail, newPassword:data.password}).unwrap();
            toast.success(response.message);
            dispatch(setUser(response.data))
            
            resetField("password");
            navigate("/user");
        } catch (error) {
            toast.error(error?.data?.message || "Error while Updating Password")
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

export default UserPasswordReset;

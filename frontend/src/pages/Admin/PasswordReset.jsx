import React, { useState } from "react";
import { PasswordReset } from "../../components/index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { setUser } from "../../Store/Auth";
import {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useUpdatePasswordMutation,
} from "../../Store/adminapi/SuperAdmin-Api";
import { toast } from "react-toastify";

function AdminPasswordReset() {
    const [inputStatus, setInputStatus] = useState("email"); // 'email', 'otp', 'password'
    const [currentEmail, setCurrentEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sendOtp] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation();
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
        try {
            const response = await sendOtp({ email: data.email }).unwrap();
            console.log(response);
            if (!response?.success) {
                console.log(response?.message);
            }
            toast.success("OTP sent successfully.")
            setInputStatus("otp");
            setCurrentEmail(data.email);
            resetField("email");
        } catch (error) {
            const errMessage = error?.data?.message || "Error sending otp"
            toast.error(errMessage)
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
            const response = await verifyOtp({
                email: currentEmail,
                otp: data.otp,
            }).unwrap()
            console.log(response);
            if (!response?.success) {
                console.log(response?.message);
            }
            console.log(response.message);
            setInputStatus("password");
            resetField("otp");
        } catch (error) {
            const errMessage = error?.data?.message || "Error verifying otp"
            toast.error(errMessage)
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
            const response = await updatePassword({
                email: currentEmail,
                newPassword: data.password,
            }).unwrap();
            console.log(response);
            if (!response?.success) {
                console.log(response?.message);
            }
            console.log(response.message);
            dispatch(setUser(response.data));

            resetField("password");
            navigate("/admin/dashboard");
        } catch (error) {
            console.log(error?.message);
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

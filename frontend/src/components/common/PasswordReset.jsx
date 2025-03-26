import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

function PasswordReset({
    activeStep,
    steps,
    inputStatus,
    errors,
    isSubmitting,
    handleSubmit,
    handleEmailSubmit,
    handleOtpSubmit,
    handlePasswordSubmit,
    register,
}) {
    const stepContent = {
        email: {
            title: "Enter Your Email",
            buttonText: "Send OTP",
            placeholder: "Enter your email",
            validation: {
                required: "Email is required.",
            },
        },
        otp: {
            title: "Verify OTP",
            buttonText: "Submit OTP",
            placeholder: "Enter OTP",
            validation: {
                required: "OTP is required.",
                pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be a 6-digit number.",
                },
            },
        },
        password: {
            title: "Reset Your Password",
            buttonText: "Reset Password",
            placeholder: "New Password",
            validation: {
                required: "Password is required.",
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long.",
                },
            },
        },
    };

    const currentStep = stepContent[inputStatus];

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                className="w-full max-w-lg my-10"
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <h1 className="text-2xl font-semibold my-5">{currentStep.title}</h1>
            <form
                onSubmit={handleSubmit(
                    inputStatus === "email"
                        ? handleEmailSubmit
                        : inputStatus === "otp"
                        ? handleOtpSubmit
                        : handlePasswordSubmit
                )}
                className="w-full max-w-sm"
            >
                <input
                    type={inputStatus === "password" ? "password" : "text"}
                    placeholder={currentStep.placeholder}
                    {...register(inputStatus, currentStep.validation)}
                    minLength={inputStatus === "otp" ? 6 : undefined}
                    maxLength={inputStatus === "otp" ? 6 : undefined}
                    className={`w-full px-3 py-2 border rounded-md mb-3 ${
                        errors[inputStatus] ? "border-red-500" : ""
                    }`}
                />
                {errors[inputStatus] && (
                    <p className="text-red-600 text-sm">
                        {errors[inputStatus].message}
                    </p>
                )}
                <button
                    type="submit"
                    className="bg-stone-800 text-white py-2 px-4 w-full rounded-md"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : currentStep.buttonText}
                </button>
            </form>
        </div>
    );
}

export default PasswordReset;

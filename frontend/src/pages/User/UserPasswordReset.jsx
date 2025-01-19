import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";

function UserPasswordReset() {
    const [inputStatus, setInputStatus] = useState("email"); // 'email', 'otp', 'password'
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const steps = ["Enter Email", "Verify OTP", "Reset Password"];
    const activeStep = steps.indexOf(
        inputStatus === "email"
            ? "Enter Email"
            : inputStatus === "otp"
            ? "Verify OTP"
            : "Reset Password"
    );
    // console.log(activeStep)

    const handleOtpChange = (e) => {
        const input = e.target.value;
        if (/^\d{0,6}$/.test(input)) {
            setOtp(input);
            setError("");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email.");
            return;
        }
        setInputStatus("otp");
        setEmail("");
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp.length < 6) {
            setError("Invalid OTP. Please enter a 6-digit OTP.");
            return;
        }
        setInputStatus("password");
        setOtp("");
        setError("");
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setError("");
        setPassword("");
        navigate("/user/login");
    };

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

            {inputStatus === "email" && (
                <>
                    <h1 className="text-2xl font-semibold my-5">
                        Enter Your Email
                    </h1>
                    <form
                        onSubmit={handleEmailSubmit}
                        className="w-full max-w-sm"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full px-3 py-2 border rounded-md mb-3"
                        />
                        {error && (
                            <p className="text-red-600 text-sm">{error}</p>
                        )}
                        <button className="bg-stone-800 text-white py-2 px-4 w-full rounded-md">
                            Send OTP
                        </button>
                    </form>
                </>
            )}

            {inputStatus === "otp" && (
                <>
                    <h1 className="text-2xl font-semibold my-5">Verify OTP</h1>
                    <form
                        onSubmit={handleOtpSubmit}
                        className="w-full max-w-sm"
                    >
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            maxLength="6"
                            className="w-full px-3 py-2 border rounded-md mb-3"
                        />
                        {error && (
                            <p className="text-red-600 text-sm">{error}</p>
                        )}
                        <button className="bg-stone-800 text-white py-2 px-4 w-full rounded-md">
                            Submit OTP
                        </button>
                    </form>
                </>
            )}

            {inputStatus === "password" && (
                <>
                    <h1 className="text-2xl font-semibold my-5">
                        Reset Your Password
                    </h1>
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="w-full max-w-sm"
                    >
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded-md mb-3"
                        />
                        {error && (
                            <p className="text-red-600 text-sm">{error}</p>
                        )}
                        <button className="bg-stone-800 text-white py-2 px-4 w-full rounded-md">
                            Reset Password
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default UserPasswordReset;

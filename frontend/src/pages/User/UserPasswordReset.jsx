import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPasswordReset() {
    const [inputStatus, setInputStatus] = useState("email"); // 'email', 'otp', 'password'
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate()

    const handleOtpChange = (e) => {
        const input = e.target.value;
        // Allow only numbers and limit to 6 digits
        if (/^\d{0,6}$/.test(input)) {
            setOtp(input);
            setError(""); // Clear error when input is valid
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
        // Check if email is valid
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email.");
            return;
        }
        setInputStatus("otp");
        setEmail(""); // Clear email after submit
        // Simulate sending OTP to the email
        // Replace this with actual sending logic
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Check if OTP is valid
        if (otp.length < 6) {
            setError("Invalid OTP. Please enter a 6-digit OTP.");
            return;
        }
        setInputStatus("password");
        setOtp(""); // Clear OTP after submit
        setError("");
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setError("");
        setPassword(""); // Clear password after submit
        navigate("/user/login")
        // Simulate password reset process
        // Replace this with actual password reset logic
        // Redirect to login page after successful password reset
    };

    return (
        <div className="w-full min-h-screen flex justify-start items-center flex-col">
            {inputStatus === "email" && (
                <>
                    <h1 className="text-md sm:text-xl md:text-3xl font-semibold text-center text-stone-800 my-20">
                        Enter Your registered email to get an OTP
                    </h1>
                    <div className="w-full sm:w-[70vw] md:w-[50vw] lg:w-[30vw]">
                        <form
                            onSubmit={handleEmailSubmit}
                            method="post"
                            className="w-full flex flex-col items-center justify-center gap-20"
                        >
                            <div className="flex w-full flex-col items-start justify-center gap-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter your email"
                                    onChange={handleEmailChange}
                                    value={email}
                                />
                            </div>
                            <button
                                className="bg-stone-800 hover:bg-stone-900 text-white font-medium py-2 px-4 rounded-md w-full"
                                type="submit"
                            >
                                Send OTP
                            </button>
                            {error && (
                                <p className="text-red-600 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                </>
            )}

            {inputStatus === "otp" && (
                <>
                    <h1 className="text-md sm:text-xl md:text-3xl font-semibold text-center text-stone-800 mt-20 mb-4">
                        We've sent an OTP to your registered email.
                    </h1>
                    <h1 className="text-md sm:text-xl md:text-3xl font-semibold text-center text-stone-800 mb-10">
                        Please enter the OTP sent to your email.
                    </h1>
                    <div className="w-full sm:w-[70vw] md:w-[50vw] lg:w-[30vw]">
                        <form
                            onSubmit={handleOtpSubmit}
                            method="post"
                            className="w-full flex flex-col items-center justify-center gap-20"
                        >
                            <div className="flex w-full flex-col items-start justify-center gap-3">
                                <label
                                    htmlFor="otp"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    OTP
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-third"
                                    placeholder="Enter 6-digit OTP"
                                    maxLength="6"
                                />
                                {error && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <button
                                className="bg-stone-800 hover:bg-stone-900 text-white font-medium py-2 px-4 rounded-md w-full"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </>
            )}

            {inputStatus === "password" && (
                <>
                    <h1 className="text-md sm:text-xl md:text-3xl font-semibold text-center text-stone-800 my-20">
                        Reset Your Password
                    </h1>
                    <div className="w-full sm:w-[70vw] md:w-[50vw] lg:w-[30vw]">
                        <form
                            onSubmit={handlePasswordSubmit}
                            method="post"
                            className="w-full flex flex-col items-center justify-center gap-20"
                        >
                            <div className="flex w-full flex-col items-start justify-center gap-4">
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter new password"
                                    onChange={handlePasswordChange}
                                    value={password}
                                />
                            </div>
                            <button
                                className="bg-stone-800 hover:bg-stone-900 text-white font-medium py-2 px-4 rounded-md w-full"
                                type="submit"
                            >
                                Reset Password
                            </button>
                            {error && (
                                <p className="text-red-600 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserPasswordReset;

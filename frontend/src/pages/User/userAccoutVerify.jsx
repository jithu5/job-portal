import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserAccountVerify() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleOtpChange = (e) => {
        const input = e.target.value;
        // Allow only numbers and limit to 6 digits
        if (/^\d{0,6}$/.test(input)) {
            setOtp(input);
            setError(""); // Clear error when input is valid
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        // Simulate API call
        console.log("OTP Submitted:", otp);
        alert("OTP verified successfully!");

        // Clear input after submission
        setOtp("");
        navigate("/"); // Navigate to dashboard after successful OTP verification
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Verify Your Account
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Enter the 6-digit OTP sent to your registered email.
                </p>
                <form onSubmit={handleSubmit}>
                    {/* OTP Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
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
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-third text-white py-2 rounded-md hover:bg-purple-600 transition"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserAccountVerify;

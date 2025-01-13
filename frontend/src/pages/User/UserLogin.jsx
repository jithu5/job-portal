import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data:", data);
        alert("Login successful!");
        reset();
        navigate("/");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required.",
                            })}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.email
                                    ? "border-red-500 focus:ring-red-500"
                                    : "focus:ring-blue-500"
                            }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters.",
                                },
                            })}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "focus:ring-blue-500"
                            }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-third text-white py-2 rounded-md hover:bg-purple-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
            <div className="absolute bottom-10 w-full sm:w-[90vw] md:w-[70vw] mx-auto flex items-center justify-between">
                <p className="text-gray-600 text-sm sm:text-md md:text-lg">
                    Don't have an account?{" "}
                    <Link
                        to={"/user/register"}
                        className="text-pink-600 underline cursor-pointer"
                    >
                        Sign up
                    </Link>
                </p>
                <p className="text-gray-600 text-sm sm:text-md md:text-lg">
                    Forgot Password?{" "}
                    <Link
                        to={"/user/reset-password"}
                        className="text-pink-600 underline cursor-pointer"
                    >
                        Reset Password
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default UserLogin;

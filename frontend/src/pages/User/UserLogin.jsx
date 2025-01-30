import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../Store/Auth/Auth-Api";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/Auth";
import { toast } from "react-toastify";

function UserLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [loginUser] = useLoginUserMutation();

    const onSubmit = async (data) => {
        console.log("Login Data:", data);
        try {
            const response = await loginUser(data).unwrap();
            console.log(response);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            reset();
            toast.success(response.message);
            setTimeout(() => {
                dispatch(setUser(response.data));
                navigate("/user");
            }, 1200);
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md pb-16 px-7">
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
                <div className="absolute bottom-2 w-full mx-auto flex flex-col gap-2 items-center justify-center overflow-hidden left-0">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <Link
                            to={"/api/user/register"}
                            className="text-pink-600 underline cursor-pointer"
                        >
                            Sign up
                        </Link>
                    </p>
                    <p className="text-gray-600 text-sm">
                        Forgot Password?{" "}
                        <Link
                            to={"/api/user/reset-password"}
                            className="text-pink-600 underline cursor-pointer"
                        >
                            Reset Password
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;

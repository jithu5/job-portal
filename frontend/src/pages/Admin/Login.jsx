import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../Store/adminapi/SuperAdmin-Api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../Store/Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminLogin() {
    const [login] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await login(data).unwrap();
            toast.success(res.message)
            dispatch(setUser(res.data));
            navigate("/admin/dashboard");
        } catch (error) {
            console.log(error?.data?.message);
            const errorMessage = error?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-white text-2xl font-semibold text-center mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="text-gray-300 block mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-red-500"
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="text-gray-300 block mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-red-500"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
                    >
                        Login
                    </button>
                    <h2 className="mt-5 mb-2 text-center text-white font-semibold text-md md:text-lg">
                        Forgot Password? click{" "}
                        <Link
                            to={"/api/admin/password-reset"}
                            className="underline text-third hover:text-purple-800"
                        >
                            here
                        </Link>{" "}
                        to reset
                    </h2>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;

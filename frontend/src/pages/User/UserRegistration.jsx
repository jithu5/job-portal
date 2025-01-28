import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../Store/Auth/Auth-Api";
import { setUser } from "../../Store/Auth";

const UserRegistration = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [registerUser] = useRegisterUserMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Form Data Submitted:", data);

        const userData = new FormData();
        userData.append("username", data.username);
        userData.append("idProof", data.idproof[0]);
        userData.append("dob", data.dob);
        userData.append("phone", data.phone);
        userData.append("gender", data.gender);
        userData.append("name", data.name);
        userData.append("email", data.email);
        userData.append("password", data.password);
        userData.append("address", data.address);

        // print in loop
        for (const pair of userData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await registerUser(userData);
            console.log(response);
            if (!response.data.success) {
                console.log(response.data);
                throw new Error("Invalid credentials");
            }
            console.log(response.data.data);
            navigate("/api/user/verify",{state:{email:response.data.data.email}});
            
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative bg-white py-10 px-3 sm:px-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    User Registration
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 4,
                                        message:
                                            "Username must be at least 4 characters",
                                    },
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Enter your username"
                            />
                            {errors.username && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                {...register("dob", {
                                    required: "Date of birth is required",
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                            {errors.dob && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.dob.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message:
                                            "Enter a valid 10-digit phone number",
                                    },
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Enter your phone number"
                            />
                            {errors.phone && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Gender
                            </label>
                            <select
                                {...register("gender", {
                                    required: "Gender is required",
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.gender.message}
                                </p>
                            )}
                        </div>

                        {/* ID Proof */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                {...register("address", {
                                    required: "ID proof is required",
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                            {errors.address && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        {/* ID Proof */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                ID Proof
                            </label>
                            <input
                                type="file"
                                {...register("idproof", {
                                    required: "ID proof is required",
                                })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                            {errors.idproof && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.idproof.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-third text-white py-3 rounded-md font-medium text-lg hover:bg-purple-500 transition duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="absolute bottom-2 w-full mx-auto flex items-center justify-center">
                    <p className="text-gray-500 text-sm sm:text-md md:text-lg">
                        Already have an account?{" "}
                        <Link to="/api/user/login" className="text-pink-600">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserRegistration;

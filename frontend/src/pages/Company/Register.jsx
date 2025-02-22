import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCheckCompanyNameUniqueMutation, useRegisterAdminMutation } from "../../Store/AdminAuth/AdminAuth-Api";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/Auth";
import { toast } from "react-toastify";
import useDebounceCallback from "../../hooks/useDebouncedCallback";

function AdminRegister() {
    const [companyName, setCompanyName] = useState('')
    const [isCompanyNameUnique, setIsCompanyNameUnique] = useState('')
    const [isChecking, setisChecking] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();
    const [ registerAdmin ] = useRegisterAdminMutation();
    const [checkCompanyNameUnique] = useCheckCompanyNameUniqueMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const debounced = useDebounceCallback(setCompanyName, 1000);

     useEffect(() => {
            setIsCompanyNameUnique("");
            setisChecking(false);
            async function checkCompanyNameUniqueFn() {
                if (username.length >= 5) {
                    setisChecking(true);
                    try {
                        const response = await checkCompanyNameUnique(companyName).unwrap();
                        console.log(response?.message);
                        if (response.success) {
                            setCheckUsernameMessage(response.message);
                        } else {
                            setCheckUsernameMessage(response.message);
                        }
                    } catch (error) {
                        const errMessage = error?.data?.message || "Error in checking company name unique"
                        console.log(errMessage)
                    } finally {
                        setisChecking(false);
                    }
                }
            }
            checkCompanyNameUniqueFn();
        }, [companyName]);

     const handleCompanyNameChange = (event) => {
         const { value } = event.target;
         setValue("companyName", value); // Update the form state
         debounced(value); // Debounced update of username
     };

    const onSubmit = async (data) => {
        console.log("Submitting Data:", data);
        try {
            const response = await registerAdmin(data)
            console.log(response);
            if (!response.data.success) {
                toast.error(response.error.data.message);
                console.log(response.error.data.message);
        
            }
            console.log(response);
            dispatch(setUser(response.data.data));
            toast.success(response.data.message);
            navigate("/api/company/verify",{state:{email:response.data.data.email}});
        } catch (error) {
            // toast.error("Error during registration:", error);
            console.log('hello!', error);
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Register Company
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Company Name */}
                    <div>
                        <label
                            htmlFor="companyName"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Company Name
                        </label>
                        <input
                            id="companyName"
                            type="text"
                            {...register("companyName", {
                                required: "Company name is required",
                            })}
                            onChange={handleCompanyNameChange}
                            placeholder="Enter company name"
                            className={`w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border ${
                                errors.companyName ? "border-red-500" : ""
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.companyName && (
                            <p className="text-sm text-red-500">
                                {errors.companyName.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            placeholder="Enter email"
                            className={`w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border ${
                                errors.email ? "border-red-500" : ""
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                            placeholder="Enter password"
                            className={`w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border ${
                                errors.password ? "border-red-500" : ""
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            {...register("address", {
                                required: "Address is required",
                            })}
                            placeholder="Enter address"
                            className={`w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border ${
                                errors.address ? "border-red-500" : ""
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Phone number must be 10 digits",
                                },
                            })}
                            placeholder="Enter phone number"
                            className={`w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border ${
                                errors.phone ? "border-red-500" : ""
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md ${
                            isSubmitting
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-blue-600"
                        } focus:outline-none`}
                    >
                        {isSubmitting ? "Submitting..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminRegister;

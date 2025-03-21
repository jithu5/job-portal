import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../Store/AdminAuth/AdminAuth-Api";
import { setUser } from "../../Store/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompanyLogin
() {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginAdmin] = useLoginAdminMutation();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await loginAdmin(data).unwrap();
            console.log(response);
            toast.success(response.message);
            setTimeout(() => {
                dispatch(setUser(response.data));

                navigate("/company/dashboard");
            }, 1000);

            reset();
        } catch (error) {
            const errMessage = error?.data?.message || "Failed to login";
            toast.error(errMessage);
        }
    };
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700">
                        Company Login
                    </h2>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Company Email
                            </label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="Enter your company name"
                                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.companyName && (
                                <p className="text-red-500 text-xs mt-1">
                                    Company Name is required.
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    Password is required.
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Login
                        </button>
                        {isSubmitting && (
                            <p className="text-stone-800 text-sm md:text-lg text-center">
                                Submitting...
                            </p>
                        )}
                    </form>
                    <div className="flex flex-col w-full items-center gap-2">
                        <p className="text-sm text-center text-gray-600">
                            Forgot your password?{" "}
                            <Link
                                to={"/api/company/reset-password"}
                                className="text-blue-500 hover:underline"
                            >
                                Reset here
                            </Link>
                        </p>
                        <p className="text-sm text-center text-gray-600">
                            Doesn't have an Account?{" "}
                            <Link
                                to={"/api/company/register"}
                                className="text-blue-500 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanyLogin
;

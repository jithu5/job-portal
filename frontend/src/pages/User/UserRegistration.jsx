import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    useCheckUsernameUniqueMutation,
    useRegisterUserMutation,
} from "../../Store/Auth/Auth-Api";
import { setUser } from "../../Store/Auth";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import useDebounceCallback from "../../hooks/useDebouncedCallback"; // Import the custom hook

const UserRegistration = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [checkUsernameMessage, setCheckUsernameMessage] = useState("");
    const [isChecking, setisChecking] = useState(false);

    const dispatch = useDispatch();
    const [registerUser] = useRegisterUserMutation();
    const [checkUsernameUnique] = useCheckUsernameUniqueMutation();

    // Create the debounced version of setValue with a 1300ms delay
    const debounced = useDebounceCallback(setUsername, 1300);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        setCheckUsernameMessage("");
        setisChecking(false);
        async function checkusernameunique() {
            if (username.length >= 5) {
                setisChecking(true);
                try {
                    const response = await checkUsernameUnique(username);
                    console.log(response.data.message);
                    if (response.data.success) {
                        setCheckUsernameMessage(response.data.message);
                    } else {
                        setCheckUsernameMessage(response.data.message);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setisChecking(false);
                }
            }
        }
        checkusernameunique();
    }, [username]);

    // Handle debounced change for username field
    const handleUsernameChange = (event) => {
        const { value } = event.target;
        setValue("username", value); // Update the form state
        debounced(value); // Debounced update of username
    };

    const onSubmit = async (data) => {

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

        try {
            const response = await registerUser(userData).unwrap();
            console.log(response);
            toast.success(response.message);

            console.log("verification");
            dispatch(setUser(response.data));
            navigate("/api/user/verify", {
                state: { email: response.data.email },
            });
        } catch (error) {
            const errMessage = error.data.message;
            toast.error(errMessage || "Error while registering");
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
                                onChange={handleUsernameChange}
                            />
                            {isChecking && (
                                <Loader2 className="inline-block ml-2 w-4 h-4 animate-spin" />
                            )}
                            {checkUsernameMessage && (
                                <p className="text-blue-600 text-sm mt-1">
                                    {checkUsernameMessage}
                                </p>
                            )}
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
                                minLength={10}
                                maxLength={10}
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message:
                                            "Enter a valid 10-digit phone number",
                                    },
                                    minLength:{
                                        value: 10,
                                        message: "Phone number must be 10 digits",
                                    },
                                    maxLength:{
                                        value: 10,
                                        message: "Phone number must not exceed 10 digits",
                                    }
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
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-4" />
                                    Please wait...
                                </>
                            ) : (
                                "Sign Up"
                            )}
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

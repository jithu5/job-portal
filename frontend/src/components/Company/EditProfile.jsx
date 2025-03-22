import React, { useEffect, useState } from "react";
import {
    useCheckCompanyNameUniqueMutation,
    useGetCompanyQuery,
    useEditProfileMutation
} from "../../Store/AdminAuth/AdminAuth-Api";
import { Loader2 } from "lucide-react";
import useDebounceCallback from "../../hooks/useDebouncedCallback";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../Store/Auth";

const initialState = {
    phone: "",
    address: "",
    companyName: "",
};

function EditAdminProfile() {
    const [input, setInput] = useState(initialState);
    const [companyName, setCompanyName] = useState("");
    const [isCompanyNameUnique, setIsCompanyNameUnique] = useState("");
    const [isChecking, setisChecking] = useState(false);

    const { data, isFetching } = useGetCompanyQuery();
    const [checkCompanyNameUnique] = useCheckCompanyNameUniqueMutation();
    const [editProfile] = useEditProfileMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array to run only once when the component mounts

    useEffect(() => {
        if (data && !isFetching) {
            setInput({
                phone: data.phone,
                address: data.address,
                companyName: "",
            });
        }
    }, [data]);
    const debounced = useDebounceCallback(setCompanyName, 1000);

    useEffect(() => {
        setIsCompanyNameUnique("");
        setisChecking(false);
        async function checkCompanyUnique() {
            if (companyName.length >= 5) {
                setisChecking(true);
                try {
                    const response = await checkCompanyNameUnique(
                        companyName
                    ).unwrap();
                    console.log(response);
                    if (response.data.success) {
                        setIsCompanyNameUnique(response.message);
                    } else {
                        setIsCompanyNameUnique(response.message);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setisChecking(false);
                }
            }
        }
        checkCompanyUnique();
    }, [companyName]);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput((prev) => {
            if (name !== "companyName") {
                return { ...prev, [name]: value };
            }
        });
    }
    async function handleCompanyNameChange(e) {
        const { value } = e.target;
        setInput((prev) => ({ ...prev, companyName: value }));
        debounced(value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // Do something with the updated user data
        console.log(input);
        try {
            const response = await editProfile(input).unwrap();
            if (!response.success) {
                return
            }
            toast.success(response.message);
            dispatch(setUser(response?.data))
        } catch (error) {
            const errMessage = error?.data?.message || "Error i updating profile."
            toast.error(errMessage);
        }
       
    }

    if (isFetching) {
        return (
            <div className="w-full min-hscreen flex justify-center items-center">
                <Loader2 className="w-6 h-6 md:w-24 md:h-24 animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="w-full md:w-[99%] mx-auto font-BarlowSemiCondensed mb-32">
                <h1 className="text-lg sm:text-xl md:text-3xl font-semibold text-center">
                    User Information
                </h1>
                <div className="w-full my-5 text-center">
                    <p className="text-md md:text-xl text-stone-800">
                        Here you can edit public information about yourself.
                    </p>
                    <p className="text-md md:text-xl text-stone-800">
                        The changes will be displayed for other users.
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full mt-10"
                    encType="multipart/form-data"
                    method="post"
                >
                    <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between">
                        <div className="w-full md:w-[55%] flex flex-col items-center">
                            <div className="w-full md:w-[70%] flex flex-col justify-center gap-2">
                                <h2 className="text-md md:text-xl font-semibold">
                                    Company Name
                                </h2>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={input.companyName}
                                    onChange={handleCompanyNameChange}
                                    className="px-4 py-2 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800"
                                    placeholder="Enter your company name"
                                />
                                {isChecking && (
                                    <Loader2 className="ml-3 w-2 h-2 animate-spin" />
                                )}
                                {isCompanyNameUnique && (
                                    <p className="text-blue-500 text-md md:text-xl">
                                        {isCompanyNameUnique}
                                    </p>
                                )}
                            </div>

                            <div className="w-full md:w-[70%] flex flex-col justify-center gap-2">
                                <h2 className="text-md md:text-xl font-semibold">
                                    Phone Number
                                </h2>
                                <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    value={input.phone}
                                    onChange={handleChange}
                                    minLength={10}
                                    maxLength={10}
                                    required
                                    className="px-4 py-2 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="w-full md:w-[70%] flex flex-col justify-center gap-2">
                                <h2 className="text-md md:text-xl font-semibold">
                                    Address
                                </h2>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={input.address}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-2 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800"
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full py-4 flex items-center justify-center mt-12">
                        <button
                            type="submit"
                            className="w-[200px] bg-third font-Abel font-medium text-white px-5 py-2 rounded-md hover:bg-purple-600"
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditAdminProfile;

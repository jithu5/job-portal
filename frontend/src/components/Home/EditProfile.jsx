import { useEffect, useState } from "react";
import { useUpdateProfileDataMutation } from "../../Store/Auth/Auth-Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/Auth/index";

const initialState = {
    name: "",
    phone: "",
    address: "",
};

function EditUserProfile() {
    const [input, setInput] = useState(initialState);
    const dispatch = useDispatch()

    const [ updateProfileData,{isLoading,status} ] = useUpdateProfileDataMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array to run only once when the component mounts

    function handleChange(e) {
        const { name, value } = e.target;
        setInput((prev) => {
            return { ...prev, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // Do something with the updated user data
        console.log(input);
       
        try {
            const response = await updateProfileData(input).unwrap();
            console.log(response);
            toast.success(response.message);
            dispatch(setUser(response.data));
        } catch (error) {
            const errMessage = error?.data?.message || "Failed to update";
            toast.error(errMessage);
        }

        // api call
        setInput({
            name: "",
            phone: "",
            address: "",
        })
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
                        <div className="w-[92%] sm:w-[85%] md:w-[75%] flex flex-col items-center">
                              
                            <div className="w-full md:w-[70%] flex flex-col justify-center gap-2">
                                <h2 className="text-md md:text-xl font-semibold">
                                    Name
                                </h2>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={input.name}
                                    onChange={handleChange}
                                    className="px-4 py-2 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800"
                                    placeholder="Enter your name"
                                />
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
                                    maxLength={10}
                                    minLength={10}
                                    onChange={handleChange}
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
                            { isLoading? "Editing" : "Edit"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditUserProfile;

import React, { useEffect, useState } from "react";
import user from "../../assets/man.png";
import CoverImage from "../../assets/coverImage.jpg";
import ProfileImageEdit from "../common/ProfileImageEdit";

const initialState = {
    number: "25413695321",
    profileImage: user,
    coverImage: CoverImage,
    email: "luffy@sunny.com",
    address: "123 Main St, Anytown, USA",
};

function EditAdminProfile() {
    const [input, setInput] = useState(initialState);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array to run only once when the component mounts

    function handleChange(e) {
        const { name, value, files } = e.target;
        setInput((prev) => {
            if ((name === "profileImage" || name === "coverImage") && files) {
                return { ...prev, [name]: URL.createObjectURL(files[0]) }; // handle image upload
            }
            return { ...prev, [name]: value };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Do something with the updated user data
        console.log(input);
        const formData = new FormData();
        formData.append("number", input.number);
        formData.append("profileImage", input.profileImage);
        formData.append("coverImage", input.coverImage);
        formData.append("email", input.email);
        formData.append("address", input.address);
        // print data
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // api call
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
                                    Email
                                </h2>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={input.email}
                                    onChange={handleChange}
                                    class="px-4 py-2 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800"
                                    placeholder="Enter your email address"
                                />
                            </div>
                         
                            <div className="w-full md:w-[70%] flex flex-col justify-center gap-2">
                                <h2 className="text-md md:text-xl font-semibold">
                                    Phone Number
                                </h2>
                                <input
                                    type="number"
                                    id="number"
                                    name="number"
                                    value={input.number}
                                    onChange={handleChange}
                                    class="px-4 py-2 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800"
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
                                    class="px-4 py-2 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800"
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[45%] flex flex-col items-center">
                            <ProfileImageEdit
                                input={input}
                                handleChange={handleChange}
                            />
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

import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileImages from "../common/ProfileImages";
import ImageEditDrawer from "../common/ImageEditdDawer";
import { useSelector } from "react-redux";

const Profile = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
        const [images, setImages] = useState({ profile: null, cover: null });

        const { user } = useSelector((state) => state.Auth);
        
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Images state:", images);
    
            const formData = new FormData();
            formData.append("profileImage", images.profile);
            formData.append("coverImage", images.cover);
    
            // Debug FormData entries
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
        };

    useEffect(() => {
            window.scrollTo(0, 0);
        }, []); // Empty dependency array to run only once when the component mounts
    return (
        <div className="w-full min-h-screen font-BarlowSemiCondensed mb-32">
            <ImageEditDrawer
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                images={images}
                setImages={setImages}
                handleSubmit={handleSubmit}
            />
            <ProfileImages setOpenDrawer={setOpenDrawer} />
            <div className="w-[90%] mx-auto flex flex-col items-end mt-10">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-xl font-medium ">Job Role</h1>
                    <p className="bg-third rounded-lg px-3 py-2 text-white">
                        Software Engineer
                    </p>
                </div>
            </div>
            <div className="w-[90%] mx-auto flex flex-col gap-4">
                <h1 className="text-xl md:text-3xl font-bold">
                    {user.username.toUpperCase()}
                </h1>
                <p className="text-md md:texxt-lg font-medium">
                    Software Engineer
                </p>
                <p className="text-md md:texxt-lg font-medium">{user.email}</p>
                <p className="text-md md:texxt-lg font-medium">{user.phone}</p>
                <p className="text-md md:text-lg font-normal">
                    {user.address}
                </p>
                <div className="w-[90%] mx-auto flex items-center justify-start mt-10">
                    <Link
                        to={"/user/profile/edit"}
                        className="bg-third text-md text-white font-semibold rounded-md py-2 px-4 flex items-center gap-2"
                    >
                        <FaEdit className="text-md" />
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;

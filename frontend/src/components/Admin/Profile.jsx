import React, { useState } from "react";
import ProfileImages from "../common/ProfileImages";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import ImageEditdDawer from "../common/ImageEditdDawer";
import { useSelector } from "react-redux";

function AdminProfile() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [images, setImages] = useState({ profile: null, cover: null });
    const {user} = useSelector((state)=>state.Auth)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Images state:", images);

        const formData = new FormData();
        formData.append("profileImage", images.profile);
        formData.append("coverImage", images.cover);

        // Log file details for debugging
        if (images.profile) {
            console.log("Profile Image:");
            console.log("Name:", images.profile.name);
            console.log("Type:", images.profile.type);
            console.log("Size:", images.profile.size, "bytes");
        } else {
            console.error("Profile image is not selected.");
        }

        if (images.cover) {
            console.log("Cover Image:");
            console.log("Name:", images.cover.name);
            console.log("Type:", images.cover.type);
            console.log("Size:", images.cover.size, "bytes");
        } else {
            console.error("Cover image is not selected.");
        }

        // Debug FormData entries
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    };

    return (
        <>
            <div className="w-[99%] mx-auto min-h-screen font-BarlowSemiCondensed mb-32">
                {/* drawer  */}
                <ImageEditdDawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} images={images} setImages={setImages} handleSubmit={handleSubmit}/>
                <ProfileImages setOpenDrawer={setOpenDrawer} user={user}/>
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
                        {user.companyName.toUpperCase()}
                    </h1>
                    <p className="text-md md:texxt-lg font-medium">
                        Software Engineer
                    </p>
                    <p className="text-md md:texxt-lg font-medium">
                        {user.email}
                    </p>
                    <p className="text-md md:texxt-lg font-medium">
                        {user.phone}
                    </p>
                    <p className="text-md md:text-lg font-normal">
                        {user.address}
                    </p>
                    <div className="w-[90%] mx-auto flex items-center justify-start mt-10">
                        <Link
                            to={"/admin/dashboard/profile/edit"}
                            className="bg-third text-md text-white font-semibold rounded-md py-2 px-4 flex items-center gap-2"
                        >
                            <FaEdit className="text-md" />
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminProfile;

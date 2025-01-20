import React, { useEffect } from "react";
import coverImage from "../../assets/coverimage.jpg";
import man from "../../assets/man.png";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
    useEffect(() => {
            window.scrollTo(0, 0);
        }, []); // Empty dependency array to run only once when the component mounts
    return (
        <div className="w-full min-h-screen font-BarlowSemiCondensed mb-32">
            <div className="w-full mt-10 relative">
                <img
                    src={coverImage}
                    alt=""
                    className="w-full h-32 md:h-72 object-cover rounded-t-2xl lg:rounded-t-[60px] rounded-b-lg"
                />
                <div className="h-14 w-14 md:w-32 md:h-32 object-cover absolute left-6 md:left-20 top-[100%] -translate-y-1/2 rounded-full bg-primary flex items-center justify-center">
                    <img src={man} alt="" className="w-[90%]" />
                </div>
            </div>
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
                    Monkey D Luffy
                </h1>
                <p className="text-md md:texxt-lg font-medium">
                    Software Engineer
                </p>
                <p className="text-md md:texxt-lg font-medium">
                    luffy@sunny.com
                </p>
                <p className="text-md md:texxt-lg font-medium">
                    6955217854
                </p>
                <p className="text-md md:text-lg font-normal">
                    Foosha Village, Goa kingdom, East Blue
                </p>
                <div className="w-[90%] mx-auto flex items-center justify-start mt-10">
                    <Link to={"/profile/edit"} className="bg-third text-md text-white font-semibold rounded-md py-2 px-4 flex items-center gap-2">
                        <FaEdit className="text-md"/>
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;

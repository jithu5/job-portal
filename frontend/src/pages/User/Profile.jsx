import React from "react";
import defaultAvatar from "../../assets/avatar.png"

const Profile = () => {
    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                {/* Header Section */}
                <div className="relative bg-third h-32 rounded-t-lg">
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <img
                            src={defaultAvatar}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white"
                        />
                    </div>
                </div>

                {/* Profile Information */}
                <div className="mt-16 text-center px-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        John Doe
                    </h1>
                    <p className="text-gray-600">Frontend Developer</p>
                </div>

                {/* About Section */}
                <div className="px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        About Me
                    </h2>
                    <p className="text-gray-600">
                        Passionate about building interactive and responsive
                        applications with modern technologies.
                    </p>
                </div>

                {/* Profile Details */}
                <div className="px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Profile Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-gray-600">
                                Email:
                            </h3>
                            <p className="text-gray-800">johndoe@example.com</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-600">
                                Phone:
                            </h3>
                            <p className="text-gray-800">+123 456 7890</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-600">
                                Location:
                            </h3>
                            <p className="text-gray-800">New York, USA</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-600">
                                Joined:
                            </h3>
                            <p className="text-gray-800">January 2023</p>
                        </div>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="px-6 py-4 border-t">
                    <div className="flex justify-between items-center">
                        <button className="bg-third text-white px-4 py-2 rounded-md hover:bg-purple-600 transition">
                            Edit Profile
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

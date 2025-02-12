import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WishList() {
  const navigate = useNavigate();
    // Sample job data
    const { wishlist } = useSelector((state) => state.Auth);
    


    return (
        <>
            <div className="w-full p-4 min-h-screen">
                <h1 className="text-xl font-bold mb-4 text-center my-5">
                    My Wish List
                </h1>
                <div className="flex flex-col gap-4">
                    {wishlist.map((job) => (
                        <div
                            key={job._id}
                            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between px-3 md:px-10"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {job.title}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {job.company}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {job.location}
                                </p>
                            </div>
                            <div className="flex gap-6 items-center">
                                <button
                                    onClick={() => navigate("/user/jobs")}
                                    className="text-sm md:tet-lg font-medium text-stone-700 hover:text-slate-900"
                                >
                                    Go to Job
                                </button>
                                <button className="text-sm md:text-lg font-medium text-red-500 hover:text-red-700 transition-colors duration-300">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default WishList;

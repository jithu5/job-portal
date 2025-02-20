import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

function Jobs({ job, handleApply, addWishlistFn, removewishlistFn }) {
    const [isApplied, setIsApplied] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const navigate = useNavigate();
    console.log(job);

    useEffect(() => {
        if (job) {
            setIsApplied(job.isApplied);
            setIsWishlisted(job.isWishlisted);
        }
    }, []);
    const handleApplyClick = async () => {
        await handleApply(job);
        setIsApplied(true);
    };
    const handleWishlistClick = async () => {
        await addWishlistFn(job);
        setIsWishlisted(true);
    };
    const handleRemoveWishlistClick = async () => {
        await removewishlistFn(job);
        setIsWishlisted(false);
    };

    return (
        <>
            <div className="w-full px-5 md:px-10 py-6 bg-white shadow-lg rounded-xl flex flex-col gap-4">
                {/* Header Section */}
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {job?.companyprofile ? (
                            <img
                                onClick={() =>
                                    navigate(
                                        `/user/company-profile/${job.companyId}`
                                    )
                                }
                                src={job.companyprofile}
                                alt={job.title}
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover cursor-pointer"
                            />
                        ) : (
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg md:text-xl text-white font-semibold cursor-pointer">
                                {job.company[0].toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
                                {job.title}
                            </h1>
                            <h2 className="text-md text-gray-600">
                                {job.company}
                            </h2>
                        </div>
                    </div>
                    <span
                        className={`px-3 py-1 text-sm md:text-md font-semibold rounded-full ${
                            job.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {job.status}
                    </span>
                </div>

                {/* Job Details */}
                <p className="text-gray-600 text-sm md:text-base">
                    {job.description.slice(0, 250)}...
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-sm md:text-base font-medium text-gray-700">
                        <p>
                            📍 {job.district}, {job.location}
                        </p>
                    </div>
                    <div className="text-sm md:text-base font-medium text-blue-500">
                        <p>⏳ {job.time}</p>
                        <p>💼 {job.shift}</p>
                    </div>
                    <div className="text-sm md:text-base font-semibold text-gray-700">
                        <p>💰 ₹{job.salary}</p>
                        <p>
                            🏢 Openings:{" "}
                            <span
                                className={`font-bold ${
                                    job.workersNeeded > 3
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {job.workersNeeded}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex items-center justify-between pt-4">
                    <button
                        className="text-blue-600 font-semibold hover:underline"
                        onClick={() => navigate(`/user/job/${job._id}`)}
                    >
                        View Details
                    </button>

                    <div className="flex items-center gap-4">
                        {isWishlisted ? (
                            <FaHeart
                                onClick={handleRemoveWishlistClick}
                                className="text-red-600 size-8 cursor-pointer"
                            />
                        ) : (
                            <CiHeart
                                onClick={handleWishlistClick}
                                className="size-8 cursor-pointer"
                            />
                        )}

                        {isApplied ? (
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                                Applied
                            </button>
                        ) : (
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                                onClick={handleApplyClick}
                            >
                                Apply
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Jobs;

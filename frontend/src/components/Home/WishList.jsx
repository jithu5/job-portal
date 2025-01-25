import React from "react";
import { useNavigate } from "react-router-dom";

function WishList() {
  const navigate = useNavigate();
    // Sample job data
    const jobList = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "Tech Corp",
            location: "Remote",
        },
        {
            id: 2,
            title: "Backend Developer",
            company: "Innovate Inc.",
            location: "New York",
        },
        {
            id: 3,
            title: "UI/UX Designer",
            company: "Design Hub",
            location: "San Francisco",
        },
    ];

    return (
        <>
            <div className="w-full p-4 min-h-screen">
                <h1 className="text-xl font-bold mb-4 text-center my-5">My Wish List</h1>
                <div className="flex flex-col gap-4">
                    {jobList.map((job) => (
                        <div
                            key={job.id}
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
                        <button className="text-sm md:tet-lg font-medium text-stone-700 hover:text-slate-900">Go to Job</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default WishList;

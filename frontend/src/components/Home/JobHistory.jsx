import React, { useState } from "react";

function UserJobHistory() {
    // Sample job history data
    const [jobHistory, setJobHistory] = useState([
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
    ]);

    // Function to handle cancel button click
    const handleCancel = (id) => {
        const updatedJobs = jobHistory.filter((job) => job.id !== id);
        setJobHistory(updatedJobs);
    };

    return (
        <div className="w-full p-4 min-h-screen">
            <h1 className="text-xl font-bold mb-4 text-center">Job History</h1>
            <div className="flex flex-col gap-4">
            {jobHistory.length === 0 && <p className="tet-md sm:text-lg md:text-xl font-semibold text-center my-10">No Jobs you have applied</p>}
                {jobHistory.map((job) => (
                    <div
                        key={job.id}
                        className="flex justify-between items-center border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
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
                        <button
                            onClick={() => handleCancel(job.id)}
                            className="text-sm md:text-lg font-medium text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserJobHistory;

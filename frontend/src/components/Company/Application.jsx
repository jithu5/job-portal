import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    useDeleteJobMutation,
    useGetJobsQuery,
} from "../../Store/AdminAuth/AdminAuth-Api";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

function AdminApplication() {
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [title, setTitle] = useState("");
    const { data, isFetching, isLoading } = useGetJobsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    const [deleteJob] = useDeleteJobMutation();

    useEffect(() => {
        console.log("fetching jobs...");
        if (data && data.data) {
            setFilteredJobs(data.data);
        }
    }, [data]);

const handleDelete = async (jobId) => {
    toast(
        <div>
            <p>Are you sure you want to delete this job?</p>
            <div className="flex justify-end gap-2 mt-2 px-3 py-1">
                <button
                    onClick={async () => {
                        toast.dismiss();
                        await confirmDelete(jobId);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Yes
                </button>
                <button
                    onClick={() => toast.dismiss()}
                    className="bg-gray-300 px-3 py-1 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>,
        {
            position: "top-right",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false,
            theme:"dark"
        }
    );
};

// Function to execute delete if confirmed
const confirmDelete = async (jobId) => {
    try {
        const response = await deleteJob(jobId).unwrap();
        console.log(response);
        if (!response.success) return;

        toast.success(response.message);
        setFilteredJobs(filteredJobs.filter((job) => job._id !== jobId));
    } catch (error) {
        const errMessage = error?.data?.message || "Failed to delete job";
        toast.error(errMessage);
    }
};


    if (isLoading || isFetching) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Loader2 className="w-6 h-6 md:h-24 md:w-24 animate-spin" />
            </div>
        );
    }
    console.log(data.data);
    const handleChange = (e) => {
        setTitle(e.target.value);
        setFilteredJobs(
            data.data.filter((job) =>
                job.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };
    return (
        <>
            <div className="w-full font-Oswald">
                <h1 className="text-md md:textlg lg:text-2xl font-semibold text-center">
                    Job Application
                </h1>
                <p className="text-sm md:text-xl text-center font-medium">
                    Welcome to the company application.
                </p>
                {/* Admin application components */}
                <div className="w-[300px] sm:w-[400px] md:w-[500px] mx-auto my-10">
                    <Input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        placeholder="Search your job here"
                        className="w-[200px] md:w-md lg:w-[400px] placeholder:text-sm px-3"
                    />
                </div>
                {/* Jobs Section */}
                <div className="flex flex-col gap-6 items-center my-16">
                    {filteredJobs.map((job) => (
                        <div
                            key={job._id}
                            className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4"
                        >
                            {/* Job Title and Image */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={job.company.profileImage}
                                    alt={job.title}
                                    className="w-14 h-14 object-cover rounded-full"
                                />
                                <div>
                                    <h2 className="text-lg md:text-xl font-bold text-blue-600">
                                        {job.title}
                                    </h2>
                                    <p className="text-gray-500">
                                        {job.description}
                                    </p>
                                </div>
                            </div>

                            {/* Job Details */}
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-700">
                                    <span className="font-semibold">
                                        Status:
                                    </span>{" "}
                                    <span
                                        className={`${
                                            job.status === "Active"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        } font-bold`}
                                    >
                                        {job.status}
                                    </span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">
                                        Number of Workers:
                                    </span>{" "}
                                    {job.workersCount - job.workersNeeded}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">
                                        Date Posted:
                                    </span>{" "}
                                    {new Date(job.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }
                                    )}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">
                                        Salary:
                                    </span>{" "}
                                    ${job.salary} per month
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Time:</span>{" "}
                                    {formatTime(job.time)}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">
                                        Address:
                                    </span>{" "}
                                    {job.location}, {job.district}
                                </p>
                            </div>

                            {/* Show Details Button */}
                            <div className="w-full flex justify-between gap-6 items-center">
                                <div className="flex items-center gap-6">
                                    <Link
                                        to={`/company/dashboard/applications/${job._id}`}
                                        className="bg-third text-white px-4 py-1 rounded-lg hover:bg-purple-700"
                                    >
                                        Show Details
                                    </Link>
                                    <Link
                                        to={`/company/dashboard/applications/edit/${job._id}`}
                                        className="text-stone-700 px-6 py-2 rounded-lg hover:text-stone-900"
                                    >
                                        Edit
                                    </Link>
                                </div>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="text-red-500 px-6 py-2 rounded-lg hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AdminApplication;

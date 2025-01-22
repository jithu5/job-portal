import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const joblist = [
    {
        id: "1",
        title: "Frontend Developer",
        description:
            "Build user-friendly interfaces using React and Tailwind CSS.",
        salary: 70000,
        date: "2025-01-15",
        location: "123 Tech Park, Silicon Valley, CA",
        workersCount: 5,
        appliedPeople: 45,
        applicants: [
            { id: "a1", name: "John Doe", email: "john.doe@example.com" },
            { id: "a2", name: "Jane Smith", email: "jane.smith@example.com" },
        ],
    },
    {
        id: "2",
        title: "Backend Developer",
        description: "Develop and maintain server-side logic using Node.js.",
        salary: 8000,
        date: "2025-01-20",
        location: "456 DevOps Street, Austin, TX",
        workersCount: 3,
        appliedPeople: 30,
        applicants: [
            { id: "b1", name: "Mike Brown", email: "mike.brown@example.com" },
            { id: "b2", name: "Emily Davis", email: "emily.davis@example.com" },
        ],
    },
];

function AdminEditJob() {
    const [jobList, setJobList] = useState(joblist);
    const {jobId} = useParams()
    const job = jobList.find((job) => job.id === jobId);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <>
            <main className="w-full h-full">
                <div className="w-full h-full flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-stone-900">
                        Edit Job
                    </h1>
                </div>
                {/* Job Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center gap-4 w-[85%] max-w-[800px] mx-auto p-6 rounded-lg my-10"
                >
                    {/* Title */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.title && "border-red-500"
                        }`}
                        type="text"
                        placeholder="Job Title"
                        defaultValue={job.title}
                        {...register("title", { required: true })}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">
                            Title is required
                        </p>
                    )}

                    {/* Description */}
                    <textarea
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.description && "border-red-500"
                        }`}
                        placeholder="Job Description"
                        defaultValue={job.description}
                        {...register("description", { required: true })}
                        rows="5"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            Description is required
                        </p>
                    )}

                    {/* Location */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.location && "border-red-500"
                        }`}
                        type="text"
                        placeholder="Location"
                        defaultValue={job.location}
                        {...register("location", { required: true })}
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm">
                            Location is required
                        </p>
                    )}

                    {/* Date */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.date && "border-red-500"
                        }`}
                        type="date"
                        defaultValue={job.date}
                        {...register("date", { required: true })}
                    />
                    {errors.date && (
                        <p className="text-red-500 text-sm">Date is required</p>
                    )}

                    {/* Salary */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.salary && "border-red-500"
                        }`}
                        type="number"
                        placeholder="Salary"
                        defaultValue={job.salary}
                        {...register("salary", { required: true })}
                    />
                    {errors.salary && (
                        <p className="text-red-500 text-sm">
                            Salary is required
                        </p>
                    )}

                    {/* Workers Count */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.workersCount && "border-red-500"
                        }`}
                        type="number"
                        placeholder="Workers Count"
                        defaultValue={job.workersCount}
                        {...register("workersCount", { required: true })}
                    />
                    {errors.workersCount && (
                        <p className="text-red-500 text-sm">
                            Workers Count is required
                        </p>
                    )}

                    {/* Reset Form Button */}
                    <button
                        type="reset"
                        className="text-red-500 hover:text-red-600"
                    >
                        Reset
                    </button>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-stone-800 text-white p-3 rounded-md mt-4 w-full hover:bg-stone-900 disabled:bg-gray-400"
                        disabled={isSubmitting}
                    >
                        Edit
                    </button>
                </form>
            </main>
        </>
    );
}

export default AdminEditJob;


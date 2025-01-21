import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        postedDate: "2025-01-15",
        applicantsCount: 45,
        status: "Active",
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "Innovatech Ltd.",
        postedDate: "2025-01-12",
        applicantsCount: 30,
        status: "Closed",
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "WebWorks Co.",
        postedDate: "2025-01-10",
        applicantsCount: 50,
        status: "Active",
    },
    {
        id: 4,
        title: "Data Scientist",
        company: "DataVision AI",
        postedDate: "2025-01-08",
        applicantsCount: 20,
        status: "Active",
    },
    {
        id: 5,
        title: "UI/UX Designer",
        company: "Creative Studios",
        postedDate: "2025-01-05",
        applicantsCount: 25,
        status: "Closed",
    },
    {
        id: 6,
        title: "DevOps Engineer",
        company: "CloudOps Solutions",
        postedDate: "2025-01-03",
        applicantsCount: 15,
        status: "Active",
    },
];

function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <>
            <main className="relative w-full py-1">
                <div className="absolute top-0 right-3 md:right-6">
                    <button onClick={()=>navigate("/admin/dashboard/postajob")} className="bg-stone-800 text-white text-sm md:text-md px-2 md:px-6 py-1 md:py-2 rounded-lg hover:bg-stone-950 flex items-center justify-center gap-2">
                        <IoMdAdd className="text-sm md:text-lg lg:text-xl text-white" />
                        Post New Job
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-center my-10">
                    Company Dashboard
                </h1>
                {/* Stats Section */}
                <section className="grid grid-cols-1 sm:grid-cols-2 max-w-[700px] justify-items-center w-full gap-6 mt-10 mx-auto ">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-center">
                        <h2 className="text-xl font-semibold">
                            Total Jobs Posted
                        </h2>
                        <p className="text-2xl font-bold text-blue-600">42</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-center">
                        <h2 className="text-xl font-semibold">Active Jobs</h2>
                        <p className="text-2xl font-bold text-green-600">12</p>
                    </div>
                </section>
                {/* Jobs Overview Section */}
                <section className="mt-10 px-6">
                    <h2 className="text-2xl font-bold mb-4">Your Jobs</h2>
                    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white shadow-lg rounded-lg p-6"
                            >
                                <h3 className="text-xl font-semibold text-blue-600">
                                    {job.title}
                                </h3>
                                <p className="text-gray-600">
                                    Posted on: {job.postedDate}
                                </p>
                                <p className="text-gray-600">
                                    Applications: {job.applicantsCount}
                                </p>
                                <p
                                    className={`font-bold ${
                                        job.status === "Active"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {job.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default AdminDashboard;

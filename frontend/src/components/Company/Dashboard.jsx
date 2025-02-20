import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetDashboardDetailsQuery } from "../../Store/AdminAuth/AdminAuth-Api";
import { Loader2 } from "lucide-react";

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
    const [dashboardData, setDashboardData] = useState();
    

    const { user } = useSelector((state) => state.Auth);

    const { data, isFetching ,isLoading} = useGetDashboardDetailsQuery();

    useEffect(() => {
        if (data?.data && !isFetching) {
            setDashboardData(data.data);
        }
    }, [data]);

    if (isFetching || isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Loader2 className="w-6 h-6 md:w-20 md:h-20 animate-spin" />
            </div>
        );
    }

    console.log(dashboardData);

    return (
        <>
            <main className="relative w-full py-1">
                <div className="absolute top-0 right-3 md:right-6">
                    <button
                        onClick={() => navigate("/admin/dashboard/postajob")}
                        className="bg-stone-800 text-white text-sm md:text-md px-2 md:px-6 py-1 md:py-2 rounded-lg hover:bg-stone-950 flex items-center justify-center gap-2"
                    >
                        <IoMdAdd className="text-sm md:text-lg lg:text-xl text-white" />
                        Post New Job
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-center my-10">
                    {user?.companyName} Dashboard
                </h1>
                {/* Stats Section */}
                <section className="grid grid-cols-1 sm:grid-cols-2 max-w-[700px] justify-items-center w-full gap-6 mt-10 mx-auto ">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-center">
                        <h2 className="text-xl font-semibold">
                            Total Jobs Posted
                        </h2>
                        <p className="text-2xl font-bold text-blue-600">
                            {dashboardData?.noOfJobs}
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-center">
                        <h2 className="text-xl font-semibold">Active Jobs</h2>
                        <p className="text-2xl font-bold text-green-600">
                            {dashboardData?.noOfActiveJobs}
                        </p>
                    </div>
                </section>
                {/* Jobs Overview Section */}
                <section className="mt-10 px-6">
                    <h2 className="text-2xl font-bold mb-4">Your Jobs</h2>
                    <div className="grid grid-col-1 md:grid-cols-2 gap-6 my-4">
                        {dashboardData?.jobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white shadow-lg rounded-lg p-6"
                            >
                                <h3 className="text-xl font-semibold text-blue-600 uppercase">
                                    {job.title}
                                </h3>
                                <p className="text-gray-600">
                                    Posted on:{" "}
                                    {new Date(
                                        job?.createdAt
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-gray-600">
                                    Total Workers:{" "}
                                    {job.workersCount}
                                </p>
                                <p className="text-gray-600">
                                    Applications:{" "}
                                    {job.workersCount - job.workersNeeded}
                                </p>
                                <p className="text-gray-600">
                                    Location: {job.location}, {job.district}
                                </p>
                                <p className="text-gray-600">
                                    Salary: ₹{job.salary}
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

import React, { useEffect, useState } from "react";
import cover from "../../assets/coverImage.jpg";
import profile from "../../assets/avatar.png";
import { useViewCompanyQuery } from "../../Store/Auth/Auth-Api";
import { Link, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

function CompanyProfile() {
    const [company, setCompany] = useState("");
    const { companyId } = useParams();
    console.log(companyId);
    const { data, isFetching } = useViewCompanyQuery(companyId);

    useEffect(() => {
        if (data?.data && !isFetching) {
            setCompany(data.data);
        }
    }, [data]);

    if (isFetching) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader2 className="w-10 h-10 md:w-28 md:h-28 animate-spin" />
            </div>
        );
    }
    console.log(company);
    return (
        <>
            <main className="w-full p-3 mt-10 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-[75%] md:w-[90%] shadow-sm rounded-xl h-[70vh] bg-white rounded-t-3xl font-BarlowSemiCondensed mx-auto">
                    <div className="w-full h-[30%] relative rounded-t-3xl mb-10">
                        <img
                            className="w-full h-full object-cover rounded-t-3xl"
                            src={company.company?.coverImage || cover}
                            alt=""
                        />
                        <img
                            className="h-16 w-16 rounded-full object-cover absolute left-[6%] -bottom-8"
                            src={company.company?.profileImage || profile}
                            alt=""
                        />
                    </div>
                    <div className="p-4 px-10">
                        <h1 className="text-3xl font-bold text-blue-600 mb-4">
                            {company.company?.companyName}
                        </h1>
                        <p className="text-md font-semibold text-blue-600">
                            email : {company.company?.email}
                        </p>
                        <p className="text-md font-semibold text-blue-600">
                            phone : {company.company?.phone}
                        </p>
                        <div className="flex items-center mt-6">
                            <p className="text-md font-semibold text-blue-600">
                                Location:
                            </p>
                            <p className="text-md ml-2">
                                {company.company?.address}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="font-BarlowSemiCondensed">
                    <div className="w-full grid grid-cols-2 gap-5 mb-10">
                        <div className="max-w-md rounded-lg min-w-44 bg-white h-28 flex flex-col items-center justify-center gap-2">
                            <h2 className="text-3xl font-semibold text-third">
                                Total Jobs
                            </h2>
                            <h3 className="text-2xl font-bold text-secondary">
                                {company.noOfJobs}
                            </h3>
                        </div>
                        <div className="max-w-md rounded-lg min-w-44 bg-white h-28 flex flex-col items-center justify-center gap-2">
                            <h2 className="text-3xl font-semibold text-third">
                                Total Active Jobs
                            </h2>
                            <h3 className="text-2xl font-bold text-secondary">
                                {company.noOfActiveJobs}
                            </h3>
                        </div>
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold text-third text-center my-5">
                        Jobs
                    </h2>
                    <div className="w-[98%] mx-auto flex flex-col items-center gap-3">
                        {company.jobs?.map((job) => (
                            <div
                                key={job._id}
                                className="py-4 px-6 md:px-9 md:py-6 shadow-sm rounded-xl bg-white flex flex-col w-full"
                            >
                                <div className="w-full flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-blue-600">
                                        {job.title}
                                    </h3>
                                    <p
                                        className={`p-1 px-2 rounded-xl text-xs ${
                                            job.status.toLowerCase() ===
                                            "active"
                                                ? "bg-green-400"
                                                : "bg-red-400"
                                        } text-white`}
                                    >
                                        {job.status}
                                    </p>
                                </div>
                                <p className="text-md text-stone-600">
                                    {job.description}
                                </p>
                                <div>
                                    <p className="text-md text-stone-900">
                                        {job.location}
                                    </p>
                                    <p className="text-md text-stone-900">
                                        ₹{job.salary}
                                    </p>
                                    <p className="text-md text-stone-900">
                                        {new Date(job.date).toLocaleDateString(
                                            "en-us",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )}
                                    </p>
                                    <p className="text-md text-stone-900">
                                        {job.time}
                                    </p>
                                </div>
                                {job?.isApplied ? (
                                    <p className="bg-third text-white px-3 py-1 rounded-md w-fit font-medium text-sm mt-5">
                                        APPLIED
                                    </p>
                                ) : (
                                    <Link
                                        to={`/user/job/${job._id}`}
                                        className="bg-third text-white px-3 py-1 rounded-md w-fit font-medium text-sm mt-5"
                                    >
                                        APPLY
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export default CompanyProfile;

import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCompanyDetailsQuery } from "../../Store/adminapi/SuperAdmin-Api";
import coverImage from "../../assets/coverImage.jpg"
import profileImage from "../../assets/avatar.png"

 
export default function CompanyDetails() {
    const [company, setCompany] = useState({})
    const {companyId} = useParams()
    const {data,isFetching} = useCompanyDetailsQuery(companyId)

    useEffect(() => {
        if(data?.data && !isFetching){
            setCompany(data.data)
            console.log(data.data.company)
        }
    }, [data])

    if(isFetching){
        return <p>Loading...</p>
    }
    if(!companyId){
        return <p>No company selected.</p>
    }
    return (
        <div className="p-6 font-Abel">
            <div className="relative">
                <img
                    src={company?.company?.coverImage || coverImage}
                    alt="Cover"
                    className="w-full h-60 object-cover rounded-lg"
                />
                <img
                    src={company?.company?.profileImage || profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-30px] left-4"
                />
            </div>
            <div className="mt-12 p-4 bg-white shadow rounded-lg text-stone-800">
                <h1 className="text-2xl font-bold">
                    {company?.company?.companyName}
                </h1>
                <p className="">{company?.company?.email}</p>
                <p className="">{company?.company?.phone}</p>
                <p className="">{company?.company?.address}</p>
            </div>
            <h2 className="text-xl font-semibold mt-6 text-stone-900">
                Jobs Posted
            </h2>
            {company?.jobs?.length === 0 && (
                <p className="text-stone-800 text-center mt-10 text-lg md:text-2xl font-semibold">
                    No jobs found.
                </p>
            )}
            {company?.jobs?.length > 0 &&
                company.jobs.map((job, index) => (
                    <Card
                        key={index}
                        className="p-4 my-4 border border-gray-300"
                    >
                        <h3 className="text-lg font-bold">{job.title}</h3>
                        <p className="text-gray-700">Salary: {job.salary}</p>
                        <p className="text-sm text-gray-500">
                            {job.time} • Posted on: {job.date}
                        </p>
                        <p className="text-sm text-gray-500">
                            Workers: {job.workersCount} / Needed:{" "}
                            {job.workersNeeded}
                        </p>
                        <p className="mt-2 text-gray-600">{job.description}</p>
                    </Card>
                ))}
        </div>
    );
}

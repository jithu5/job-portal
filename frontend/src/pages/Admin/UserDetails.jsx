import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import profile from "../../assets/avatar.png"
import cover from "../../assets/coverImage.jpg"
import { useUserDetailsQuery } from "../../Store/adminapi/SuperAdmin-Api";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function UserDetails() {
    const [user, setUser] = useState({})
    const {userId} = useParams()
    const {data,isFetching} = useUserDetailsQuery(userId)
    
    useEffect(() => {
        if (data?.data &&!isFetching) {
            setUser(data.data)
            console.log(data.data)
        }
    },[data])

    if (isFetching) {
        return <div className="w-full min-h-screen flex justify-center items-center">
            <Loader2 className="w-6 h-6 animate-spin md:w-24 md:h-24" />
        </div>
    }
    return (
        <div className="p-6 font-Abel">
            <div className="relative">
                <img
                    src={user?.user?.coverImage || cover}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <img
                    src={user?.user?.profileimage || profile}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-30px] left-4"
                />
            </div>
            <div className="mt-12 p-4 bg-white shadow rounded-lg text-stone-800">
                <h1 className="text-2xl font-bold">{user?.user?.name}</h1>
                <p className="">{user?.user?.email}</p>
                <p>{user?.user?.phone}</p>
                <p>{user?.user?.address}</p>
            </div>
            <h2 className="text-xl font-semibold mt-6 text-secondary">
                Applied Jobs
            </h2>
            {user?.appliedJobs?.length === 0 && (
                <p className="text-gray-600 text-center mt-4">
                    No applied jobs found.
                </p>
            )}
            {user?.appliedJobs?.length > 0 &&
                user.appliedJobs.map((job) => (
                    <Card
                        key={job._id}
                        className="p-4 my-4 border border-gray-300"
                    >
                        <div className="flex gap-4">
                            {job?.companyProfile ? (
                                <img
                                    src={job.companyProfile}
                                    alt="Company"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-secondary text-white font-bold text-2xl flex justify-center items-center">
                                    {job.company[0].toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-bold">
                                    {job.title}
                                </h3>
                                <p className="text-gray-700">
                                    {job.company}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {job.salary} • {job.time}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Applied on: {new Date(job.date).toLocaleDateString("en-US",{
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="mt-2 text-gray-600">
                                    {job.description.length > 80
                                        ? job.description.slice(0, 80) + "..."
                                        : job.description}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
        </div>
    );
}

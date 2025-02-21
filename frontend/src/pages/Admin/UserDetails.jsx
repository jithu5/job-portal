import React from "react";
import { Card } from "@mui/material";
import profile from "../../assets/avatar.png"
import cover from "../../assets/coverImage.jpg"

const user = {
    coverImage: "https://via.placeholder.com/800x200",
    profileImage: "https://via.placeholder.com/100",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Cityville, Country",
    appliedJobs: [
        {
            companyName: "Tech Corp",
            title: "Software Engineer",
            salary: "$80,000",
            time: "Full-time",
            date: "2025-02-15",
            description:
                "Develop and maintain web applications using modern technologies.",
        },
        {
            companyName: "Innovate Ltd",
            companyProfile: "https://via.placeholder.com/50",
            title: "Frontend Developer",
            salary: "$70,000",
            time: "Part-time",
            date: "2025-02-10",
            description:
                "Build responsive UI components and optimize web performance.",
        },
    ],
};

export default function UserDetails() {
    return (
        <div className="p-6 font-Abel">
            <div className="relative">
                <img
                    src={cover}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <img
                    src={profile}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-30px] left-4"
                />
            </div>
            <div className="mt-12 p-4 bg-white shadow rounded-lg text-stone-800">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="">{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.address}</p>
            </div>
            <h2 className="text-xl font-semibold mt-6 text-secondary">
                Applied Jobs
            </h2>
            {user.appliedJobs.length === 0 && (
                <p className="text-gray-600 text-center mt-4">
                    No applied jobs found.
                </p>
            )}
            {user.appliedJobs.length > 0 &&
                user.appliedJobs.map((job, index) => (
                    <Card
                        key={index}
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
                                    {job.companyName[0].toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-bold">
                                    {job.title}
                                </h3>
                                <p className="text-gray-700">
                                    {job.companyName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {job.salary} • {job.time}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Applied on: {job.date}
                                </p>
                                <p className="mt-2 text-gray-600">
                                    {job.description.length > 80? job.description.slice(0,80)+'...':job.description}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
        </div>
    );
}

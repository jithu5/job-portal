import React from "react";
import { Card } from "@mui/material";

const company = {
    coverImage: "https://via.placeholder.com/800x200",
    profileImage: "https://via.placeholder.com/100",
    name: "Tech Corp",
    email: "contact@techcorp.com",
    phone: "123-456-7890",
    address: "456 Business St, Tech City, Country",
    jobsPosted: [
        {
            title: "Software Engineer",
            salary: "$80,000",
            time: "Full-time",
            date: "2025-02-15",
            workersCount: 5,
            workersNeeded: 2,
            description:
                "Develop and maintain web applications using modern technologies.",
        },
        {
            title: "Frontend Developer",
            salary: "$70,000",
            time: "Part-time",
            date: "2025-02-10",
            workersCount: 3,
            workersNeeded: 1,
            description:
                "Build responsive UI components and optimize web performance.",
        },
    ],
};

export default function CompanyDetails() {
    return (
        <div className="p-6 font-Abel">
            <div className="relative">
                <img
                    src={company.coverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <img
                    src={company.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-30px] left-4"
                />
            </div>
            <div className="mt-12 p-4 bg-white shadow rounded-lg text-stone-800">
                <h1 className="text-2xl font-bold">{company.name}</h1>
                <p className="">{company.email}</p>
                <p className="">{company.phone}</p>
                <p className="">{company.address}</p>
            </div>
            <h2 className="text-xl font-semibold mt-6 text-stone-900">Jobs Posted</h2>
            {company.jobsPosted.map((job, index) => (
                <Card key={index} className="p-4 my-4 border border-gray-300">
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

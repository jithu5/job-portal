import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const jobList = [
    {
        id: "1",
        title: "Frontend Developer",
        description:
            "Build user-friendly interfaces using React and Tailwind CSS.",
        salary: "$70,000/year",
        date: "2025-01-15",
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
        salary: "$80,000/year",
        date: "2025-01-20",
        appliedPeople: 30,
        applicants: [
            { id: "b1", name: "Mike Brown", email: "mike.brown@example.com" },
            { id: "b2", name: "Emily Davis", email: "emily.davis@example.com" },
        ],
    },
];

function AdminJobDetails() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const job = jobList.find((job) => job.id === jobId);

    if (!job) {
        return <h1 className="text-center text-xl">Job not found</h1>;
    }

    return (
        <main className="w-full min-h-screen p-4">
            <h1 className="text-xl md:text-2xl font-semibold text-center">
                {job.title}
            </h1>
            <div className="mt-4 p-4 border rounded shadow-md bg-white">
                <p>
                    <strong>Description:</strong> {job.description}
                </p>
                <p>
                    <strong>Salary:</strong> {job.salary}
                </p>
                <p>
                    <strong>Date Posted:</strong> {job.date}
                </p>
                <p>
                    <strong>Applied People:</strong> {job.appliedPeople}
                </p>
                <button onClick={()=>navigate(`/admin/dashboard/applications/edit/${job.id}`)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit Job
                </button>
            </div>

            <section className="mt-8">
                <h2 className="text-lg font-semibold">Applicants</h2>
                {job.applicants.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                        {job.applicants.map((applicant) => (
                            <li
                                key={applicant.id}
                                className="p-4 border rounded shadow-md bg-white flex items-center justify-between w-full"
                            >
                            <div>

                                <p>
                                    <strong>Name:</strong> {applicant.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {applicant.email}
                                </p>
                            </div>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                View Profile
                            </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No applicants yet.</p>
                )}
            </section>
        </main>
    );
}

export default AdminJobDetails;

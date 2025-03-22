import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJobDetailsQuery } from "../../Store/AdminAuth/AdminAuth-Api";
import { Loader2 } from "lucide-react";
const formatTime = (time) => {
    if (!time) return "N/A"; // Handle undefined/null cases
    console.log(time)
    const [hours, minutes] = time.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

function AdminJobDetails() {
    const [jobData, setJobData] = useState('')
    const { jobId } = useParams();
    const {data,isFetching,isLoading} = useGetJobDetailsQuery(jobId)
    console.log(jobId)
    useEffect(() => {
        if (data?.data &&!isFetching) {
            setJobData(data.data)
        }
    }, [data])


    if (isLoading || isFetching) {
        return <div className='w-full min-h-screen flex justify-center items-center'><Loader2 className='w-6 h-6 md:h-24 md:w-24 animate-spin' /></div>;
    }
    console.log(data)
    console.log(jobData);

    return (
        <main className="w-full min-h-screen p-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center uppercase">
                {jobData.title}
            </h1>
            <div className="mt-4 py-6 px-8 md:px-14 border rounded shadow-md bg-white">
                <p>
                    <strong>Description:</strong> {jobData.description}
                </p>
                <p>
                    <strong>Salary:</strong> ₹{jobData.salary}
                </p>
                <p>
                    <strong>Date Posted:</strong>{" "}
                    {new Date(jobData.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </p>
                <p>
                    <strong>Date of Work:</strong>{" "}
                    {new Date(jobData.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </p>
                <p>
                    <strong>Time of Work:</strong> {formatTime(jobData.startTime) }- {formatTime(jobData.endTime)}
                </p>
                <p>
                    <strong>Total workers:</strong> {jobData.workersCount}
                </p>
                <p>
                    <strong>Applied People:</strong> {jobData.applicantsCount}
                </p>
                <p>
                    <strong>Location:</strong> {jobData.location},{" "}
                    {jobData.district}
                </p>
            </div>

            <section className="mt-8">
                <h2 className="text-lg font-semibold">Applicants</h2>
                {jobData?.applicants?.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                        {jobData?.applicants.map((applicant) => (
                            <li
                                key={applicant._id}
                                className="p-4 border rounded shadow-md bg-white flex items-center justify-between w-full"
                            >
                                <div>
                                    <p>
                                        <strong>Name:</strong> {applicant.name}
                                    </p>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {applicant.email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong>{" "}
                                        {applicant.phone}
                                    </p>
                                </div>
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

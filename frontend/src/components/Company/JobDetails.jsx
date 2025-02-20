import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJobDetailsQuery } from "../../Store/AdminAuth/AdminAuth-Api";
import { Loader2 } from "lucide-react";

function AdminJobDetails() {
    const [jobData, setJobData] = useState('')
    const { jobId } = useParams();
    const navigate = useNavigate();
    const {data,isFetching,isLoading} = useGetJobDetailsQuery(jobId)

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
            <h1 className="text-xl md:text-2xl font-semibold text-center">
                {jobData.title}
            </h1>
            <div className="mt-4 p-4 border rounded shadow-md bg-white">
                <p>
                    <strong>Description:</strong> {jobData.description}
                </p>
                <p>
                    <strong>Salary:</strong> {jobData.salary}
                </p>
                <p>
                    <strong>Date Posted:</strong> {jobData.date}
                </p>
                <p>
                    {/* <strong>Applied People:</strong> {job.appliedPeople} */}
                </p>
                <div className="flex items-end justify-start gap-4 md:gap-10 px-2 md:px-6">

                <button onClick={()=>navigate(`/admin/dashboard/applications/edit/${job.id}`)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit Job
                </button>
                <button className="text-sm md:text-lg font-medium text-red-500 hover:text-red-600">Delete</button>
                </div>
            </div>

            {/* <section className="mt-8">
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
            </section> */}
        </main>
    );
}

export default AdminJobDetails;

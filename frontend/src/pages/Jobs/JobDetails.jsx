import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const allJobs = [
    {
        id: 1,
        title: "Software Engineer",
        place: "New York",
        salary: 800,
        type: "Full-time",
    },
    {
        id: 2,
        title: "Data Scientist",
        place: "San Francisco",
        salary: 1200,
        type: "Full-time",
    },
    {
        id: 3,
        title: "Frontend Developer",
        place: "Los Angeles",
        salary: 700,
        type: "Part-time",
    },
    {
        id: 4,
        title: "Backend Developer",
        place: "Chicago",
        salary: 950,
        type: "Full-time",
    },
    {
        id: 5,
        title: "Product Manager",
        place: "Austin",
        salary: 1100,
        type: "Full-time",
    },
];

function JobDetails() {
    const { jobId } = useParams();
    const [selectedJob, setSelectedJob] = useState({});

    function slectjob() {
        const job = allJobs.find((j) => j.id === Number(jobId));
        setSelectedJob(job);
    }
    useEffect(() => {
        console.log(allJobs);
        console.log(typeof jobId);
        slectjob();
    }, [jobId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array to run only once when the component mounts
    
    console.log(selectedJob);

    return (
        <>
            <div className="min-h-screen w-[90%] sm:w-[80%] md:w-[70%] mx-auto">
                <h1 className='text-xl md:text-4xl font-Oswald font-medium md:font-semibold text-center'>{selectedJob.title}</h1>
                <div className="flex flex-col gap-6 my-12 md:my-24">

                </div>
            </div>
        </>
    );
}

export default JobDetails

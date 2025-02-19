import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useApplyForJobMutation,
    useGetJobByIdQuery,
} from "../../Store/Auth/Auth-Api";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAppliedJobs } from "../../Store/Auth";

import { FaHeart } from "react-icons/fa";
import { MapPin } from "lucide-react";

function JobDetails() {
    const { jobId } = useParams();
    const { data, isFetching, isError } = useGetJobByIdQuery(jobId);
    const [applyForJob] = useApplyForJobMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [job, setJob] = useState("");

    useEffect(() => {
        if (data?.data && !isFetching) {
            setJob(data.data);
        }
    }, [data?.data]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleApply = async (job) => {
        try {
            const response = await applyForJob(job._id).unwrap();
            console.log(response);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            dispatch(addAppliedJobs(job));
            toast.success(response.message);
        } catch (error) {
            console.log(error);
            toast.error("Failed to apply");
        }
    };

    if (isFetching) {
        return (
            <Box className="min-h-screen flex justify-center items-center">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (isError || !job) {
        return (
            <Box className="min-h-screen flex justify-center items-center">
                <Typography variant="h5" color="error">
                    Job not found or an error occurred.
                </Typography>
            </Box>
        );
    }
    console.log(data.data);
    console.log(job);

    return (
        <main className="w-full min-h-screen p-5 sm:px-12 md:px-52 py-8 text-secondary">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg md:text-4xl uppercase mb-10 font-Oswald">
                    {job.title}
                </h1>
                <div className="flex items-center gap-4">
                    {job.isApplied ? (
                        <Button variant="contained" color="primary">
                            Applied
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleApply(job)}
                        >
                            Apply
                        </Button>
                    )}
                    {job?.isWishlisted ? (
                        <FaHeart className="text-red-600 size-8" />
                    ) : (
                        <FaHeart className="size-8" />
                    )}
                </div>
            </div>
            <div className="flex items-center justify-start gap-5">
                {job?.companyprofile ? (
                    <img
                        className="w-16 h-16 rounded-full object-cover"
                        src={job.companyprofile}
                        alt=""
                        onClick={() =>
                            navigate(`/user/company-profile/${job.companyId}`)
                        }
                    />
                ) : (
                    <div
                        onClick={() =>
                            navigate(`/user/company-profile/${job.companyId}`)
                        }
                        className="bg-third flex justify-center items-center font-semibold text-2xl text-white h-16 w-16 rounded-full"
                    >
                        {job.company[0].toUpperCase()}
                    </div>
                )}
                <div className="flex flex-col font-semibold font-Abel">
                    <div className="flex items-center gap-4">
                        <h2 className="font-bold text-2xl text-third">
                            {job.company}
                        </h2>
                        <p className="text-sm md:text-lg flex gap-0.5 items-center">
                            <MapPin className="text-secondary size-4" />
                            {job.location}
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <p className="text-sm md:text-lg">{job.time}</p>
                        <p className="text-sm md:text-lg">
                            {new Date(job.date).toLocaleDateString("en-us", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                        <p className="text-sm md:text-lg">₹{job.salary}</p>
                    </div>
                </div>
            </div>
            <div className="w-full py-10">
                <h2 className="font-bold text-2xl text-third">Description</h2>
                <p className="text-lg">{job.description}</p>
            </div>
            <div className="w-full py-10">
                <h2 className="font-bold text-2xl text-third">Details</h2>
                <p className={` text-lg font-semibold`}>
                    Available position :{" "}
                    <span
                        className={`${
                            job.workersNeeded > 3
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {job.workersNeeded}
                    </span>
                </p>
                <p className="text-lg font-semibold">
                    StatusSkills required :{" "}
                    <span
                        className={`${
                            job.status.toLowerCase() === "active"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {job.status}
                    </span>
                </p>
            </div>
        </main>
    );
}

export default JobDetails;

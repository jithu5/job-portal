import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useAddToWishlistMutation,
    useApplyForJobMutation,
    useGetJobByIdQuery,
    useRemovewishlistMutation,
} from "../../Store/Auth/Auth-Api";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addAppliedJobs, addWishlist, removeWishlist } from "../../Store/Auth";

import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MapPin } from "lucide-react";
import { formatTime } from "../../data";

function JobDetails() {
    const { jobId } = useParams();
    const { data, isFetching, isError } = useGetJobByIdQuery(jobId);
    const [applyForJob] = useApplyForJobMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [job, setJob] = useState("");
    const [isWishListed, setIsWishListed] = useState(false);

    const [removewishlist] = useRemovewishlistMutation();
    const [addToWishlist] = useAddToWishlistMutation();

    async function addWishlistFn(job) {
        try {
            const response = await addToWishlist(job._id).unwrap();
            console.log(response);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            dispatch(addWishlist(job));
            toast.success(response.message);
            setIsWishListed(true);
        } catch (error) {
            const errMessage =
                error?.data?.message || "Failed to add to wishlist";
            toast.error(errMessage);
        }
    }

    async function handleRemove(jobId) {
        try {
            const response = await removewishlist(jobId).unwrap();
            console.log(response);
            if (!response.success) {
                return;
            }
            dispatch(removeWishlist(jobId));
            toast.success(response.message);
            setIsWishListed(false);
        } catch (error) {
            const errMessage =
                error?.data?.message || "Failed to remove from wishlist";
            toast.error(errMessage);
        }
    }

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

    useEffect(() => {
        if (job) {
            const isWishlisted = job?.isWishlisted;
            setIsWishListed(isWishlisted);
        }
    }, [job]);

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
    console.log(job);

    return (
        <main className="w-full md:w-[80%] mx-auto my-14 h-fit p-5 sm:px-12 md:px-24 py-16 text-secondary bg-white rounded-lg">
            <div className="flex items-center justify-between py-1">
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
                            onClick={() => {
                                handleApply(job);
                            }}
                        >
                            Apply
                        </Button>
                    )}
                    {isWishListed ? (
                        <FaHeart
                            onClick={() => handleRemove(job._id)}
                            className="text-red-600 size-8 cursor-pointer"
                        />
                    ) : (
                        <CiHeart
                            onClick={() => {
                                addWishlistFn(job);
                            }}
                            className="size-8 cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <div className="flex items-center justify-start gap-5">
                {job?.companyprofile ? (
                    <img
                        className="w-16 h-16 rounded-full object-cover cursor-pointer"
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
                        className="bg-third flex justify-center items-center font-semibold text-2xl text-white h-16 w-16 rounded-full cursor-pointer"
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
                        <p className="text-sm md:text-lg">
                            {formatTime(job?.startTime)}-
                            {formatTime(job?.endTime)}
                        </p>
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
                    Status :{" "}
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

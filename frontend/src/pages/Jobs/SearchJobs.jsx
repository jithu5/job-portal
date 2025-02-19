import { useState, useEffect, useCallback } from "react";
import { JobHeader, JobSideBar } from "../../components/index";
import { Box } from "@mui/material";
import _ from "lodash"; // For debounce/throttle functions
import {
    useAddToWishlistMutation,
    useApplyForJobMutation,
    useGetJobsQuery,
} from "../../Store/Auth/Auth-Api";
import { Bookmark, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAppliedJobs, addWishlist } from "../../Store/Auth";
import { toast } from "react-toastify";

const SearchJobs = () => {
    const [filterInput, setFilterInput] = useState({
        district: "",
        shift: "",
        title: "",
    });
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentJobs, setCurrentJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const itemsPerPage = 15;

    const { data: datas, isLoading, isError } = useGetJobsQuery();
    const [applyForJob] = useApplyForJobMutation();
    const [addToWishlist] = useAddToWishlistMutation();

    useEffect(() => {
        if (datas?.data && !isLoading) {
            console.log(datas.data);
            setAllJobs(datas?.data);
        }
    }, [datas, isLoading]);

    useEffect(() => {
        if (isError) {
            setError("Failed to load jobs. Please try again later.");
        }
    }, [isError]);

    useEffect(() => {
        setFilteredJobs(
            allJobs.filter(
                (job) =>
                    job.district
                        ?.toLowerCase()
                        .includes(filterInput?.district.toLowerCase()) &&
                    job.shift
                        ?.toLowerCase()
                        .includes(filterInput?.shift.toLowerCase())
                        &&
                        job.title?.toLowerCase().includes(filterInput.title?.toLowerCase())
                        
            )
        );
    }, [filterInput, allJobs]);

    useEffect(() => {
        setCurrentJobs(filteredJobs.slice(0, itemsPerPage));
    }, [filteredJobs]);

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
        } catch (error) {
            const errMessage = error?.data?.message || "Failed to add to wishlist";
            toast.error(errMessage);
        }
    }

    const loadMoreJobs = useCallback(() => {
        if (loading || filteredJobs.length === currentJobs.length) return;

        setLoading(true);
        setTimeout(() => {
            const newJobs = filteredJobs.slice(
                currentJobs.length,
                currentJobs.length + itemsPerPage
            );
            setCurrentJobs((prevJobs) => [...prevJobs, ...newJobs]);
            setLoading(false);
        }, 2000);
    }, [loading, filteredJobs, currentJobs]);

    const handleScroll = useCallback(
        _.throttle(() => {
            const { scrollHeight, scrollTop, clientHeight } =
                document.documentElement;
            if (scrollHeight - scrollTop <= clientHeight + 20) {
                loadMoreJobs();
            }
        }, 300),
        [loadMoreJobs]
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loader2 className="w-12 h-12 md:w-28 md:h-28 animate-spin" />
            </Box>
        );
    }

    return (
        <div className="w-full min-h-screen">
            <JobHeader
                setOpenFilter={setOpenFilter}
                title={filterInput.title}
                handleChange={(e) =>
                    setFilterInput((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
            />
            <JobSideBar
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                filterInput={filterInput}
                handleChange={(e) =>
                    setFilterInput((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
            />
            <main className="w-full flex flex-col">
                <div className="job-list">
                    <h2 className="text-xl md:text-4xl text-center font-Oswald my-10">
                        Job Listings
                    </h2>
                    {error ? (
                        <p className="text-md md:text-lg text-center text-red-600 my-10">
                            {error}
                        </p>
                    ) : allJobs.length === 0 ? (
                        <p className="text-md md:text-lg text-center font-Oswald my-10">
                            No jobs found matching your search criteria.
                        </p>
                    ) : (
                        <div className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto my-20">
                            <div className="w-full flex flex-col items-center gap-8">
                                {currentJobs.map((job) => (
                                    <div
                                        key={job._id}
                                        className="w-full px-5 md:px-10 py-6 bg-white shadow-lg rounded-xl flex flex-col gap-4"
                                    >
                                        {/* Header Section */}
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {job?.companyprofile ? (
                                                    <img
                                                        src={job.companyprofile}
                                                        alt={job.title}
                                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover cursor-pointer"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg md:text-xl text-white font-semibold cursor-pointer">
                                                        {job.company[0].toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
                                                        {job.title}
                                                    </h1>
                                                    <h2 className="text-md text-gray-600">
                                                        {job.company}
                                                    </h2>
                                                </div>
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-sm md:text-md font-semibold rounded-full ${
                                                    job.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {job.status}
                                            </span>
                                        </div>

                                        {/* Job Details */}
                                        <p className="text-gray-600 text-sm md:text-base">
                                            {job.description.slice(0, 250)}...
                                        </p>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="text-sm md:text-base font-medium text-gray-700">
                                                <p>
                                                    📍 {job.district},{" "}
                                                    {job.location}
                                                </p>
                                            </div>
                                            <div className="text-sm md:text-base font-medium text-blue-500">
                                                <p>⏳ {job.time}</p>
                                                <p>💼 {job.shift}</p>
                                            </div>
                                            <div className="text-sm md:text-base font-semibold text-gray-700">
                                                <p>💰 ₹{job.salary}</p>
                                                <p>
                                                    🏢 Openings:{" "}
                                                    <span
                                                        className={`font-bold ${
                                                            job.workersNeeded >
                                                            3
                                                                ? "text-green-600"
                                                                : "text-red-600"
                                                        }`}
                                                    >
                                                        {job.workersNeeded}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="w-full flex items-center justify-between pt-4">
                                            <button
                                                className="text-blue-600 font-semibold hover:underline"
                                                onClick={() =>
                                                    navigate(
                                                        `/user/job/${job._id}`
                                                    )
                                                }
                                            >
                                                View Details
                                            </button>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() =>
                                                        addWishlistFn
                                                    (job)}
                                                    className="p-2 rounded-full hover:bg-gray-200"
                                                >
                                                    <Bookmark />
                                                </button>
                                                <button
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                                                    onClick={() =>
                                                        handleApply(job)
                                                    }
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {loading && (
                                <div className="w-full flex justify-center mt-10">
                                    <Loader2 className="w-4 h-4 animate-spin md:w-16 md:h-16" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SearchJobs;

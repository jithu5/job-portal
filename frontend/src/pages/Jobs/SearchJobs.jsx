import  { useState, useEffect, useCallback, useMemo } from "react";
import { JobHeader, JobSideBar } from "../../components/index";
import { Box, Button } from "@mui/material";
import _ from "lodash"; // For debounce/throttle functions
import { useAddToWishlistMutation, useApplyForJobMutation, useGetJobsQuery } from "../../Store/Auth/Auth-Api";
import { Bookmark, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAppliedJobs,addWishlist } from "../../Store/Auth";
import { toast } from "react-toastify";



const SearchJobs = () => {
    const [filterInput, setFilterInput] = useState({
        Title: "",
        Salary: 0,
        Place: "",
        Type: "",
    });
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentJobs, setCurrentJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const itemsPerPage = 15;

    const { data: datas, isLoading, isError } = useGetJobsQuery();
    const [ applyForJob ] = useApplyForJobMutation()
        const [addToWishlist] = useAddToWishlistMutation();
    

    useEffect(() => {
        if (datas?.data && !isLoading) {
            setAllJobs(datas?.data);
        }
    }, [datas, isLoading]);

    useEffect(() => {
        if (isError) {
            setError("Failed to load jobs. Please try again later.");
        }
    }, [isError]);

    const filterJobs = useMemo(() => {
        return allJobs.filter((job) => {
            // Check if job properties are defined before calling toLowerCase
            const title = job.title ? job.title.toLowerCase() : "";
            const place = job.place ? job.place.toLowerCase() : "";
            const type = job.type ? job.type.toLowerCase() : "";

            return (
                title.includes(filterInput.Title.toLowerCase()) &&
                job.salary >= filterInput.Salary &&
                place.includes(filterInput.Place.toLowerCase()) &&
                type.includes(filterInput.Type.toLowerCase())
            );
        });
    }, [filterInput, allJobs]);


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
        setFilteredJobs(filterJobs);
    }, [filterJobs]);

    useEffect(() => {
        setCurrentJobs(filteredJobs.slice(0, itemsPerPage));
    }, [filteredJobs]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleApply = async(job)=>{
        try {
            const response = await applyForJob(job._id).unwrap();
            console.log(response);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            dispatch(addAppliedJobs(job))
            toast.success(response.message);
        } catch (error) {
            console.log(error)
            toast.error('Failed to apply');
        }
    }

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
            console.log(error);
            toast.error("Failed to add to wishlist");
        }
        
    }

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
                <Loader2 className="w-12 h-12 md:w-48 md:h-48 animate-spin" />
            </Box>
        );
    }

    return (
        <div className="w-full min-h-screen">
            <JobHeader
                setOpenFilter={setOpenFilter}
                title={filterInput.Title}
                handleChange={(e) =>
                    setFilterInput((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
                onFilterChange={filterJobs}
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
                clearInput={() =>
                    setFilterInput({
                        Title: "",
                        Salary: 0,
                        Place: "",
                        Type: "",
                    })
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
                    ) : filteredJobs.length === 0 ? (
                        <p className="text-md md:text-lg text-center font-Oswald my-10">
                            No jobs found matching your search criteria.
                        </p>
                    ) : (
                        <div className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto my-20">
                            <div className="w-full flex flex-col items-center gap-7">
                                {currentJobs.map((job) => (
                                    <div
                                        key={job._id}
                                        className="w-full px-3 md:px-8 py-3 md:py-6 bg-white rounded-md flex flex-col gap-1"
                                    >
                                        <div className="w-full flex items-center justify-between">
                                            <h1 className="text-xl md:text-3xl font-Abel font-semibold text-secondary mb-4">
                                                {job.title}
                                            </h1>
                                            <h2
                                                className={`text-md md:text-lg font-semibold tracking-wide ${
                                                    job.status === "Active"?"text-green-600":"text-red-600"
                                                }`}
                                            >
                                                {job.status}
                                            </h2>
                                        </div>
                                        <p className="text-sm md:text-base font-Poppins text-gray-600">
                                            {job.description.slice(0, 400)}...
                                        </p>
                                        <p className="text-sm md:text-lg font-medium">
                                            {job.district}
                                        </p>
                                        <p className="text-sm md:text-md font-medium">
                                            {job.location}
                                        </p>
                                        <p className="text-sm md:text-lg font-medium text-blue-500">
                                            ₹{job.salary}
                                        </p>
                                        <h3>
                                            open:{" "}
                                            <span
                                                className={`text-sm md:text-lg font-bold ${
                                                    job.workersCount > 3
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {job.workersNeeded}
                                            </span>
                                        </h3>
                                        <div className="w-full flex items-center pt-5 justify-between">
                                            <Button variant="text"
                                                onClick={() => {
                                                    navigate(`/user/job/${job._id}`);
                                                }}
                                            >
                                                View Details
                                            </Button>
                                            <div className="flex w-[20%] items-center justify-between">
                                                <button>
                                                    <Bookmark />
                                                </button>

                                            <Button variant="contained"
                                              
                                              onClick={() =>handleApply(job)}
                                              >
                                                Apply
                                            </Button>
                                                </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {loading && (
                                <div className="w-full flex justify-center mt-10">
                                    <Loader2 />
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

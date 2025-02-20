import { useState, useEffect, useCallback } from "react";
import { JobHeader, JobSideBar } from "../../components/index";
import { Box } from "@mui/material";
import _ from "lodash"; // For debounce/throttle functions
import {
    useAddToWishlistMutation,
    useApplyForJobMutation,
    useGetJobsQuery,
    useRemovewishlistMutation,
} from "../../Store/Auth/Auth-Api";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
    addAppliedJobs,
    addWishlist,
    removeWishlist,
} from "../../Store/Auth/index";
import { toast } from "react-toastify";
import Jobs from "../../components/Jobs/Jobs";
import { formatTime } from "../../data";

const convertTo24HourFormat = (time) => {
    if (!time) return null;

    const [timePart, period] = time.split(" "); // Split "08:30 AM" into ["08:30", "AM"]
    let [hours, minutes] = timePart.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12; // Convert PM hours correctly
    if (period === "AM" && hours === 12) hours = 0; // Midnight case (12 AM => 00)

    return hours * 60 + minutes; // Convert to total minutes for easier comparison
};


const SearchJobs = () => {
    const [filterInput, setFilterInput] = useState({
        district: "",
        time: "",
        title: "",
    });
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentJobs, setCurrentJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const itemsPerPage = 15;

    const { data: datas, isLoading, isError } = useGetJobsQuery();
    const [applyForJob] = useApplyForJobMutation();
    const [addToWishlist] = useAddToWishlistMutation();
    const [removewishlist] = useRemovewishlistMutation();

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
          allJobs.filter((job) => {
              const jobTime = convertTo24HourFormat(formatTime(job.time));
              const selectedTime = convertTo24HourFormat(filterInput.time);

              return (
                  job.district
                      ?.toLowerCase()
                      .includes(filterInput?.district.toLowerCase()) &&
                  (filterInput.time === "" || jobTime >= selectedTime) &&
                  job.title
                      ?.toLowerCase()
                      .includes(filterInput.title?.toLowerCase())
              );
          })
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
            const errMessage =
                error?.data?.message || "Failed to add to wishlist";
            toast.error(errMessage);
        }
    }

    async function removewishlistFn(job) {
        try {
            const response = await removewishlist(job._id).unwrap();
            console.log(response);
            if (!response.success) {
                return;
            }
            dispatch(removeWishlist(job._id));
            toast.success(response.message);
        } catch (error) {
            const errMessage =
                error?.data?.message || "Failed to remove from wishlist";
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
                openFilter={filterInput}
                setFilterInput={setFilterInput}
            />
            <JobSideBar
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                filterInput={filterInput}
                setFilterInput={setFilterInput}
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
                                    <Jobs
                                        key={job._id}
                                        job={job}
                                        handleApply={handleApply}
                                        addWishlistFn={addWishlistFn}
                                        removewishlistFn={removewishlistFn}
                                    />
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

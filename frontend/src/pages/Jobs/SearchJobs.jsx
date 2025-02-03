import  { useState, useEffect, useCallback, useMemo } from "react";
import { JobHeader, JobSideBar } from "../../components/index";
import { CircularProgress } from "@mui/material";
import _ from "lodash"; // For debounce/throttle functions
import { useGetJobsQuery } from "../../Store/Auth/Auth-Api";


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

    const itemsPerPage = 15;

    const { data: datas, isLoading, isError } = useGetJobsQuery();

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

    if (isLoading) {
        return (
            <div className="w-full flex justify-center mt-10">
                <CircularProgress />
            </div>
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
                                        className="w-full flex flex-col px-4 md:px-6 py-6 md:py-10 gap-6 bg-[#F9F9F9] rounded-lg shadow-md"
                                        key={job._id} // Using _id for the key
                                    >
                                        {/* Job Title */}
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {job.title}
                                        </h2>

                                        {/* Job Description */}
                                        <p className="text-gray-700 mb-4">
                                            {job.description}
                                        </p>

                                        <div className="flex justify-between items-center">
                                            {/* Salary */}
                                            <p className="text-lg font-semibold text-green-600">
                                                Salary: ${job.salary}
                                            </p>

                                            {/* Location */}
                                            <p className="text-sm text-gray-600">
                                                <strong>Location:</strong>{" "}
                                                {job.location}, {job.district}
                                            </p>
                                        </div>

                                        {/* Workers Info */}
                                        <div className="mt-4 flex justify-between items-center text-gray-700">
                                            <p>
                                                <strong>Workers Needed:</strong>{" "}
                                                {job.workersNeeded}
                                            </p>
                                            <p>
                                                <strong>Workers Count:</strong>{" "}
                                                {job.workersCount}
                                            </p>
                                        </div>

                                        {/* Job Status */}
                                        <p
                                            className={`mt-4 text-sm font-medium ${
                                                job.status === "Active"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            <strong>Status:</strong>{" "}
                                            {job.status}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {loading && (
                                <div className="w-full flex justify-center mt-10">
                                    <CircularProgress />
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

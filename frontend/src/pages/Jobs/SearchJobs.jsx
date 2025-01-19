import React, { useState, useEffect, useCallback } from "react";
import { JobHeader, JobSideBar } from "../../components";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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
    {
        id: 6,
        title: "UI/UX Designer",
        place: "San Diego",
        salary: 750,
        type: "Contract",
    },
    {
        id: 7,
        title: "Mobile Developer",
        place: "Seattle",
        salary: 1300,
        type: "Full-time",
    },
    {
        id: 8,
        title: "DevOps Engineer",
        place: "Boston",
        salary: 1000,
        type: "Full-time",
    },
    {
        id: 9,
        title: "Software Architect",
        place: "Austin",
        salary: 1500,
        type: "Full-time",
    },
    {
        id: 10,
        title: "Database Administrator",
        place: "Chicago",
        salary: 950,
        type: "Part-time",
    },
    {
        id: 11,
        title: "Security Analyst",
        place: "Dallas",
        salary: 1100,
        type: "Full-time",
    },
    {
        id: 12,
        title: "Cloud Engineer",
        place: "San Francisco",
        salary: 1400,
        type: "Contract",
    },
    {
        id: 13,
        title: "Business Analyst",
        place: "New York",
        salary: 900,
        type: "Full-time",
    },
    {
        id: 14,
        title: "AI Specialist",
        place: "Los Angeles",
        salary: 1600,
        type: "Full-time",
    },
    {
        id: 15,
        title: "Game Developer",
        place: "Austin",
        salary: 1000,
        type: "Contract",
    },
    {
        id: 16,
        title: "Marketing Manager",
        place: "Miami",
        salary: 950,
        type: "Full-time",
    },
    {
        id: 17,
        title: "Product Designer",
        place: "Chicago",
        salary: 850,
        type: "Part-time",
    },
    {
        id: 18,
        title: "Data Analyst",
        place: "San Francisco",
        salary: 1200,
        type: "Full-time",
    },
    {
        id: 19,
        title: "Web Developer",
        place: "Los Angeles",
        salary: 750,
        type: "Full-time",
    },
    {
        id: 20,
        title: "HR Manager",
        place: "Seattle",
        salary: 950,
        type: "Full-time",
    },
    {
        id: 21,
        title: "Network Engineer",
        place: "Dallas",
        salary: 1100,
        type: "Full-time",
    },
    {
        id: 22,
        title: "Product Owner",
        place: "Austin",
        salary: 1300,
        type: "Full-time",
    },
    {
        id: 23,
        title: "SEO Specialist",
        place: "Chicago",
        salary: 800,
        type: "Part-time",
    },
    {
        id: 24,
        title: "Cloud Solutions Architect",
        place: "San Francisco",
        salary: 1600,
        type: "Full-time",
    },
    {
        id: 25,
        title: "Software Tester",
        place: "Miami",
        salary: 700,
        type: "Contract",
    },
    {
        id: 26,
        title: "Business Development Manager",
        place: "New York",
        salary: 1200,
        type: "Full-time",
    },
    {
        id: 27,
        title: "Project Manager",
        place: "Chicago",
        salary: 1100,
        type: "Full-time",
    },
    {
        id: 28,
        title: "Content Writer",
        place: "Austin",
        salary: 600,
        type: "Part-time",
    },
    {
        id: 29,
        title: "Frontend Engineer",
        place: "Seattle",
        salary: 950,
        type: "Full-time",
    },
    {
        id: 30,
        title: "Operations Manager",
        place: "Los Angeles",
        salary: 1200,
        type: "Full-time",
    },
];


const initialInput = {
    Title: "",
    Salary: 0,
    Place: "",
    Type: "",
};

function SearchJobs() {
    const [filterInput, setFilterInput] = useState(initialInput);
    const [filteredJobs, setFilteredJobs] = useState(allJobs);
    const [currentJobs, setCurrentJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const itemsPerPage = 15;

    // Handle the filter change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterInput((prevState) => ({ ...prevState, [name]: value }));
    };

    function clearInput() {
        setFilterInput(
            initialInput
        )
    }

    // Filter jobs based on input
    const filterJobs = () => {
        const filtered = allJobs.filter((job) => {
            return (
                job.title
                    .toLowerCase()
                    .includes(filterInput.Title.toLowerCase()) &&
                job.salary >= filterInput.Salary &&
                job.place
                    .toLowerCase()
                    .includes(filterInput.Place.toLowerCase()) &&
                job.type.toLowerCase().includes(filterInput.Type.toLowerCase())
            );
        });
        setFilteredJobs(filtered);
    };

    // Load more jobs when scrolling
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
        }, 2000)
        
    }, [loading, filteredJobs, currentJobs]);

    // Handle scroll event for infinite scrolling
const handleScroll = (e) => {
    const scrollHeight = document.documentElement.scrollHeight; // Total height of the document
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Distance scrolled
    const clientHeight =
        window.innerHeight || document.documentElement.clientHeight; // Viewport height
   
    // Check if the user has scrolled to the bottom
    const bottom = (scrollHeight - 50 ) <= scrollTop + clientHeight;

    console.log(scrollTop, scrollHeight-120, clientHeight);
    console.log(bottom);

    if (bottom) {
        loadMoreJobs();
    }
};


    useEffect(() => {
        filterJobs();
    }, [filterInput]);

    useEffect(() => {
        setCurrentJobs(filteredJobs.slice(0, itemsPerPage));
    }, [filteredJobs]);

    useEffect(() => {
        // Add scroll event listener to window
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="w-full min-h-screen">
            <JobHeader
                setOpenFilter={setOpenFilter}
                title={filterInput.Title}
                handleChange={handleChange}
                onFilterChange={filterJobs}
            />
            <JobSideBar
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                filterInput={filterInput}
                handleChange={handleChange}
                handlFilterChange={filterJobs}
                clearInput={clearInput}
            />
            <main className="w-full flex flex-col">
                <div className="job-list">
                    <h2 className="text-xl md:text-4xl text-center font-Oswald my-10">
                        Job Listings
                    </h2>
                    {filteredJobs.length === 0 ? (
                        <p className="text-md md:text-lg text-center font-Oswald my-10">
                            No jobs found matching your search criteria.
                        </p>
                    ) : (
                        <div className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto my-20">
                            <div className="w-full flex flex-col items-center gap-7">
                                {currentJobs.map((job) => (
                                    <div
                                        className="flex flex-col w-full px-3 md:px-6 py-6 md:py-10 gap-6 bg-[#FDFDFD] rounded-xl"
                                        key={job.id}
                                    >
                                        <h2>{job.title}</h2>
                                        <p>{job.salary}</p>
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
}

export default SearchJobs;

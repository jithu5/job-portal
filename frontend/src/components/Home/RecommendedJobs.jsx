import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

const jobListings = [
    {
        id: 1,
        title: "Frontend Developer",
        icon: "💻",
        description:
            "Build and maintain user-friendly interfaces for web applications.",
        date: "2025-01-12",
        type: "Full-Time",
    },
    {
        id: 2,
        title: "Backend Developer",
        icon: "🖥️",
        description:
            "Develop and maintain server-side applications, databases, and APIs.",
        date: "2025-01-10",
        type: "Part-Time",
    },
    {
        id: 3,
        title: "Data Scientist",
        icon: "📊",
        description:
            "Analyze and interpret complex data to drive decision-making.",
        date: "2025-01-05",
        type: "Contract",
    },
    {
        id: 4,
        title: "UI/UX Designer",
        icon: "🎨",
        description:
            "Design intuitive and attractive user interfaces and experiences.",
        date: "2025-01-07",
        type: "Freelance",
    },
    {
        id: 5,
        title: "Project Manager",
        icon: "📅",
        description:
            "Lead and manage cross-functional teams to deliver projects on time.",
        date: "2025-01-15",
        type: "Full-Time",
    },
    {
        id: 6,
        title: "DevOps Engineer",
        icon: "⚙️",
        description:
            "Manage the infrastructure, deployments, and continuous integration systems.",
        date: "2025-01-13",
        type: "Full-Time",
    },
    {
        id: 7,
        title: "Marketing Specialist",
        icon: "📈",
        description:
            "Develop marketing strategies and campaigns to drive growth and awareness.",
        date: "2025-01-09",
        type: "Part-Time",
    },
    {
        id: 8,
        title: "Software Engineer",
        icon: "🔧",
        description:
            "Design, develop, and maintain software solutions to meet client needs.",
        date: "2025-01-11",
        type: "Full-Time",
    },
    {
        id: 9,
        title: "QA Engineer",
        icon: "🔍",
        description:
            "Test and ensure the quality of software products before release.",
        date: "2025-01-10",
        type: "Freelance",
    },
    {
        id: 10,
        title: "SEO Specialist",
        icon: "🔎",
        description: "Optimize websites to improve search engine rankings.",
        date: "2025-01-08",
        type: "Part-Time",
    },
    {
        id: 11,
        title: "Cloud Architect",
        icon: "☁️",
        description:
            "Design and manage cloud computing systems and infrastructure.",
        date: "2025-01-12",
        type: "Full-Time",
    },
    {
        id: 12,
        title: "Content Writer",
        icon: "📝",
        description: "Write content for websites, blogs, and other media.",
        date: "2025-01-09",
        type: "Freelance",
    },
];

function RecommendedJobs() {
    const firstEightJobs = jobListings.slice(0, 8);

    return (
        <>
            <div className="w-full mt-10 md:mt-20 px-2 md:px-10 mb-10 md:mb-20">
                <h1 className="text-4xl font-semibold font-Abel">
                    JOBS OR YOU
                </h1>
                <div className="w-full mt-10 md:mt-20">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        navigation
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 50,
                            },
                            1180: {
                                slidesPerView: 2,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {firstEightJobs.map((job) => (
                            <SwiperSlide key={job.id} className="rounded-2xl">
                                <div className="flex flex-col w-full px-3 md:px-6 py-6 md:py-10 gap-6">
                                    <div className="flex flex-col md:flex-row items-center font-BarlowSemiCondensed w-full gap-5">
                                        <div className="flex items-center justify-center w-9 h-9  md:w-12 md:h-12 rounded-full bg-blue-500 text-white font-semibold text-xl">
                                            {job.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-sm sm:text-md md:text-lg font-semibold">
                                                {job.title}
                                            </h2>
                                            <p className="text-[10px] sm:text-xs md:text-sm mb-3">
                                                {job.description}
                                            </p>
                                            <span className="text-gray-600 text-sm">
                                                {job.date}
                                            </span>
                                            <span className="text-gray-600 text-sm">
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <button className="bg-third px-3 py-1 rounded-md text-white font-medium font-Abel">
                                            Apply Now
                                        </button>
                                        <button>save</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default RecommendedJobs;

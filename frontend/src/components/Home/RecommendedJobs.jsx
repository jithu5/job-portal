import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import {
    useAddToWishlistMutation,
    useApplyForJobMutation,
    useGetNewJobsQuery,
} from "../../Store/Auth/Auth-Api";
import { useEffect, useState } from "react";
import { Bookmark, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatTime } from "../../data";

function RecommendedJobs() {
    const { data, isFetching } = useGetNewJobsQuery();
    const [newJobs, setNewJobs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (data?.data && !isFetching) {
            console.log(data.data);
            setNewJobs(data.data);
        }
    }, [data]);

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 size={50} />
            </div>
        );
    }
    if (newJobs.length === 0) {
        return (
            <div className="w-full h-80 text-center text-sm md:text-lg font-semibold flex justify-center items-center">
                <h1 className="text-stone-800 font-semibold text-xl md:text-4xl">

                No new jobs available at the moment.
                </h1>
            </div>
        );
    }

    return (
        <>
            <div className="w-full mt-10 md:mt-20 px-12 md:px-7 mb-10 md:mb-20">
                <h1 className="text-4xl font-semibold font-Abel ml-6">
                    NEW JOBS
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
                                slidesPerView: 1,
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
                        {newJobs.map((job) => (
                            <SwiperSlide
                                key={job._id}
                                className="rounded-2xl px-4 md:px-7 py-2 md:py-7"
                            >
                                <div className="w-full flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        {job?.companyprofile ? (
                                            <img
                                                onClick={() =>
                                                    navigate(
                                                        `/user/company-profile/${job.companyId}`
                                                    )
                                                }
                                                className="w-6 h-6 object-cover rounded-full cursor-pointer"
                                                src={job.companyprofile}
                                                alt={job.title}
                                            />
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/user/company-profile/${job.companyId}`
                                                    )
                                                }
                                                className="w-10 h-10 rounded-full bg-third flex items-center justify-center text-lg md:text-xl text-white font-semibold cursor-pointer"
                                            >
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
                                            📍 {job.district}, {job.location}
                                        </p>
                                    </div>
                                    <div className="text-sm md:text-base font-medium text-blue-500">
                                        <p>⏳ {formatTime(job.time)}</p>
                                        <p>💼 {job.shift}</p>
                                    </div>
                                    <div className="text-sm md:text-base font-semibold text-gray-700">
                                        <p>💰 ₹{job.salary}</p>
                                        <p>
                                            🏢 Openings:{" "}
                                            <span
                                                className={`font-bold ${
                                                    job.workersNeeded > 3
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
                                            navigate(`/user/job/${job._id}`)
                                        }
                                    >
                                        View Details
                                    </button>

                                   
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

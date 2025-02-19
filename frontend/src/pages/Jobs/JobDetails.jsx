import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApplyForJobMutation, useGetJobByIdQuery } from "../../Store/Auth/Auth-Api";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Button,
} from "@mui/material";
import { Bookmark } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAppliedJobs } from "../../Store/Auth";

function JobDetails() {
    const { jobId } = useParams();
    const { data, isLoading, isError } = useGetJobByIdQuery(jobId);
    const [ applyForJob ] = useApplyForJobMutation()
    const dispatch = useDispatch()
    const [job, setJob] = useState({})
    console.log(data)

    useEffect(() => {
        if (data?.data && ! isLoading) {
            setJob(data?.data)
            
        }
    }, [data?.data])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(job)

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

    if (isLoading) {
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

    return (
        <Box className="min-h-screen w-[90%] sm:w-[80%] md:w-[70%] mx-auto py-16">
            <Card className="p-6 shadow-lg rounded-xl bg-white">
                <CardContent className="flex flex-col gap-4">
                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {job?.companyprofile ? (
                                <img
                                    src={job.companyprofile}
                                    alt={job.title}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg md:text-xl text-white font-semibold">
                                    {job.company[0].toUpperCase()}
                                </div>
                            )}
                            <div>
                                <Typography
                                    variant="h5"
                                    className="font-semibold text-gray-800"
                                >
                                    {job.title}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    className="text-gray-600"
                                >
                                    {job.company}
                                </Typography>
                            </div>
                        </div>
                        <span
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                job.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {job.status}
                        </span>
                    </div>

                    {/* Job Description */}
                    <Typography className="text-gray-600 text-sm md:text-base">
                        {job.description.length > 150
                            ? `${job.description.slice(0, 150)}...`
                            : job.description}
                    </Typography>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-sm md:text-base font-medium text-gray-700">
                            📍 {job.district}, {job.location}
                        </div>
                        <div className="text-sm md:text-base font-medium text-blue-500">
                            ⏳ {job.time} | 💼 {job.shift}
                        </div>
                        <div className="text-sm md:text-base font-semibold text-gray-700">
                            💰 ₹{job.salary}
                        </div>
                        <div className="text-sm md:text-base font-semibold">
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
                        </div>
                        <div className="text-sm md:text-base">
                            📅 {new Date(job.date).toLocaleDateString("en-GB")}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <Box className="w-full flex items-center justify-between pt-4">
                       
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-full hover:bg-gray-200">
                                <Bookmark className="text-blue-600" />
                            </button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
                                onClick={() => handleApply(job)}
                            >
                                Apply
                            </Button>
                        </div>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default JobDetails;

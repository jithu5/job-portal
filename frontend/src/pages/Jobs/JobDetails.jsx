import { useEffect } from "react";
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
    const { data: job, isLoading, isError } = useGetJobByIdQuery(jobId);
    const [ applyForJob ] = useApplyForJobMutation()
    const dispatch = useDispatch()

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
            <Card className="p-6 shadow-lg rounded-xl">
                <CardContent>
                    <Typography variant="h4" className="font-bold text-center">
                        {job.data.title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        className="my-5 text-md md:text-lg"
                    >
                        {job.data.description}
                    </Typography>
                    <Typography variant="subtitle1" className="text-gray-600r">
                        {job.data.location}, {job.data.district}
                    </Typography>
                    <Typography
                        variant="body1"
                        className="mt-4 leading-relaxed"
                    >
                        {job.description}
                    </Typography>
                    <Box className="mt-6 space-y-3">
                        <Typography variant="h6">
                            💰 Salary: ₹{job.data.salary}
                        </Typography>
                        <Typography variant="h6">
                            👥 Workers Needed: {job.data.workersNeeded}
                        </Typography>
                        <Typography variant="h6">
                            📅 Date:{" "}
                            {new Date(job.data.date).toLocaleDateString()}
                        </Typography>
                        <Typography
                            variant="h6"
                            className={
                                job.data.status === "Active"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        >
                            Status: {job.data.status}
                        </Typography>
                    </Box>
                    <Box className="flex justify-end gap-5">
                        <button>
                            <Bookmark className="text-blue-600" />
                        </button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleApply(job.data._id)}
                        >
                            APPLY
                        </Button>
                    </Box>
                   
                </CardContent>
            </Card>
        </Box>
    );
}

export default JobDetails;

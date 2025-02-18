import { useDispatch, useSelector } from "react-redux";
import {
    useCancelAppliedJobMutation,
    useGetAppliedJobQuery,
} from "../../Store/Auth/Auth-Api";
import { useEffect } from "react";
import { removeAppliedJobs, setAppliedJobs } from "../../Store/Auth";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

function UserJobHistory() {
    // Sample job history data

    const { data: data, isFetching } = useGetAppliedJobQuery();
    const [cancelAppliedJob] = useCancelAppliedJobMutation();
    const dispatch = useDispatch();

    const { appliedJobs } = useSelector((state) => state.Auth);

    useEffect(() => {
        if (data?.data && !isFetching) {
            console.log(data.data);
            if (appliedJobs?.length === 0) {
                dispatch(setAppliedJobs(data.data));
            }
        }
    },[data]);

    async function cancelJob(id) {
        try {
            const response = await cancelAppliedJob(id).unwrap();
            console.log(response);
            if(!response.success) {
                return;
            }
            dispatch(removeAppliedJobs(id))
            toast.success(response.message)
        } catch (error) {
            console.log(error);
            const errMessage = error?.data?.message || "Error in deleting applied job"
            toast.error(errMessage)
        }
    }


    return (
        <div className="w-full p-4 min-h-screen">
            <h1 className="text-xl font-bold mb-4 text-center">Job History</h1>
            <div className="flex flex-col gap-4">
                {appliedJobs.length === 0 && !isFetching && (
                    <p className="tet-md sm:text-lg md:text-xl font-semibold text-center my-10">
                        No Jobs you have applied
                    </p>
                )}
                {isFetching && (
                    <div className="w-full flex justify-center mt-10">
                        <Loader2 className="w-8 h-8 animate-spin mt-10" />
                    </div>
                )}
                {appliedJobs.length > 0 ? (
                    appliedJobs.map((job) => (
                        <div
                            key={job._id}
                            className="flex justify-between items-center border rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
                        >
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {job.title}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {job.company}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {job.location}
                                </p>
                            </div>
                            <button
                                onClick={() => cancelJob(job._id)}
                                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">
                        You haven’t applied to any jobs yet.
                    </p>
                )}
            </div>
        </div>
    );
}

export default UserJobHistory;

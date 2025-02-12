import { useDispatch, useSelector } from "react-redux";
import {
    useCancelAppliedJobMutation,
    useGetAppliedJobQuery,
} from "../../Store/Auth/Auth-Api";
import { useEffect } from "react";
import { removeAppliedJobs, setAppliedJobs } from "../../Store/Auth";

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
    });

    async function cancelJob(id) {
        try {
            const response = await cancelAppliedJob(id).unwrap();
            console.log(response);
            if(!response.success) {
                return;
            }
            dispatch(removeAppliedJobs(id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full p-4 min-h-screen">
            <h1 className="text-xl font-bold mb-4 text-center">Job History</h1>
            <div className="flex flex-col gap-4">
                {appliedJobs.length === 0 && (
                    <p className="tet-md sm:text-lg md:text-xl font-semibold text-center my-10">
                        No Jobs you have applied
                    </p>
                )}
                {appliedJobs.map((job) => (
                    <div
                        key={job._id}
                        className="flex justify-between items-center border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">
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
                            className="text-sm md:text-lg font-medium text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserJobHistory;

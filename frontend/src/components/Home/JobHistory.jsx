import { useDispatch, useSelector } from "react-redux";
import {
    useCancelAppliedJobMutation,
    useGetAppliedJobQuery,
} from "../../Store/Auth/Auth-Api";
import { useEffect } from "react";
import { removeAppliedJobs, setAppliedJobs } from "../../Store/Auth";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserJobHistory() {
    // Sample job history data

    const { data: data, isFetching } = useGetAppliedJobQuery();
    const [cancelAppliedJob] = useCancelAppliedJobMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                            <div className="flex items-center gap-10">
                                <div className="flex flex-col gap-2">
                                    {job?.companyprofile ? (
                                        <img
                                            src={job.companyprofile}
                                            alt="company profile"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg text-white font-semibold">
                                            {job.company[0].toUpperCase()}
                                        </div>
                                    )}
                                    <h2 className="font-semibold text-stone-700 text-md md:text-lg">
                                        {job.company}
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg md:text-2xl text-secondary font-semibold uppercase">
                                        {job.title}
                                    </h2>
                                    <p>
                                        {new Date(job.date).toLocaleDateString(
                                            "en-US",
                                            {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}
                                    </p>
                                </div>
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
                    <div className="min-h-[60vh] md:min-h-[45vh] w-full flex justify-center items-center flex-col gap-10">
                    <p className="text-stone-800 text-md md:text-xl font-semibold text-center">
                        You haven't applied to any jobs yet.
                    </p>
                    <button onClick={()=>navigate('/user/jobs')} className="bg-third py-1.5 px-3 font-semibold text-md md:text-xl text-white rounded-lg mx-auto hover:bg-purple-600">APPLY FOR JOB</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserJobHistory;

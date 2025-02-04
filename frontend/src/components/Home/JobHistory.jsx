
import { useSelector } from "react-redux";

function UserJobHistory() {
    // Sample job history data

    const { appliedJobs } = useSelector((state) => state.Auth);
   

   

    return (
        <div className="w-full p-4 min-h-screen">
            <h1 className="text-xl font-bold mb-4 text-center">Job History</h1>
            <div className="flex flex-col gap-4">
            {appliedJobs.length === 0 && <p className="tet-md sm:text-lg md:text-xl font-semibold text-center my-10">No Jobs you have applied</p>}
                {appliedJobs.map((job) => (
                    <div
                        key={job.id}
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

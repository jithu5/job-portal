import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRemovewishlistMutation } from "../../Store/Auth/Auth-Api";
import { removeWishlist } from "../../Store/Auth/index";
import { toast } from "react-toastify";

function WishList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    // Sample job data
    const { wishlist } = useSelector((state) => state.Auth);
    
    const [ removewishlist ] = useRemovewishlistMutation()

    async function handleRemove(jobId) {
        try {
            const response = await removewishlist(jobId).unwrap();
            console.log(response);
            if (!response.success) {
                return 
            }
            dispatch(removeWishlist(jobId));
            toast.success(response.message);
        } catch (error) {
            const errMessage = error?.data?.message || "Failed to remove from wishlist";
            toast.error(errMessage);
        }
    }

    return (
        <>
            <div className="w-full p-4 min-h-screen">
                <h1 className="text-xl font-bold mb-4 text-center my-5">
                    My Wish List
                </h1>
                <div className="flex flex-col gap-4">
                    {wishlist.map((job) => (
                        <div
                            key={job._id}
                            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between px-3 md:px-10 bg-white"
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
                            <div className="flex gap-6 items-center">
                                <button
                                    onClick={() => navigate("/user/jobs")}
                                    className="text-sm md:tet-lg font-medium text-stone-700 hover:text-slate-900"
                                >
                                    Go to Job
                                </button>
                                <button onClick={()=>handleRemove(job._id)} className="text-sm md:text-lg font-medium text-red-500 hover:text-red-700 transition-colors duration-300">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default WishList;

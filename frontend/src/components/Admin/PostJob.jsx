import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePostJobMutation } from "../../Store/AdminAuth/AdminAuth-Api";
import { useNavigate } from "react-router-dom";


function AdminPostJob() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [ postJob ] = usePostJobMutation()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await postJob(data).unwrap();
            console.log(response);
            if (!response.success) {
                toast.error(response.data.message);
                return;
            }
            toast.success("Job posted successfully");
            reset();
            setTimeout(() => {
              navigate("/admin/dashboard/applications");
            }, 1000)
            
        } catch (error) {
            toast.error(error);
        }
       
    };

    return (
        <>
            <main className="w-full h-full">
                <div className="w-full h-full flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-stone-900">
                        Post New Job
                    </h1>
                </div>
                {/* Job Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center gap-4 w-[85%] max-w-[800px] mx-auto p-6 rounded-lg my-10"
                >
                    {/* Title */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.title && "border-red-500"
                        }`}
                        type="text"
                        placeholder="Job Title"
                        {...register("title", { required: true })}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">
                            Title is required
                        </p>
                    )}

                    {/* Description */}
                    <textarea
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.description && "border-red-500"
                        }`}
                        placeholder="Job Description"
                        {...register("description", { required: true })}
                        rows="5"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            Description is required
                        </p>
                    )}

                    {/* Location */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.location && "border-red-500"
                        }`}
                        type="text"
                        placeholder="Location"
                        {...register("location", { required: true })}
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm">
                            Location is required
                        </p>
                    )}

                    {/* Date */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.date && "border-red-500"
                        }`}
                        type="date"
                        {...register("date", { required: true })}
                    />
                    {errors.date && (
                        <p className="text-red-500 text-sm">Date is required</p>
                    )}

                    {/* Salary */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.salary && "border-red-500"
                        }`}
                        type="number"
                        placeholder="Salary"
                        {...register("salary", { required: true })}
                    />
                    {errors.salary && (
                        <p className="text-red-500 text-sm">
                            Salary is required
                        </p>
                    )}

                    {/* Workers Count */}
                    <input
                        className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.workersCount && "border-red-500"
                        }`}
                        type="number"
                        placeholder="Workers Count"
                        {...register("workersCount", { required: true })}
                    />
                    {errors.workersCount && (
                        <p className="text-red-500 text-sm">
                            Workers Count is required
                        </p>
                    )}


                    {/* Reset Form Button */}
                    <button
                    type="reset"
                        className="text-red-500 hover:text-red-600"
                    >
                        Reset
                    </button>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-stone-800 text-white p-3 rounded-md mt-4 w-full hover:bg-stone-900 disabled:bg-gray-400"
                        disabled={isSubmitting}
                    >
                        Submit
                    </button>
                </form>
            </main>
        </>
    );
}

export default AdminPostJob;

import React from "react";

function JobForm({
    isEdit,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    register,
    keralaDistricts,
    ...props
}) {
    const {
        title,
        location,
        date,
        startTime,
        endTime,
        salary,
        description,
        workersCount,
        district,
    } = props;
    return (
        <>
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
                    defaultValue={title}
                    {...register("title", { required: true })}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">Title is required</p>
                )}

                {/* Description */}
                <textarea
                    className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.description && "border-red-500"
                    }`}
                    placeholder="Job Description"
                    defaultValue={description}
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
                    defaultValue={location}
                    {...register("location", { required: true })}
                />
                {errors.location && (
                    <p className="text-red-500 text-sm">Location is required</p>
                )}

                {/* district */}
                {/* District */}
                <select
                    className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register("district", { required: true })}
                >
                    <option value="">Select District</option>
                    {keralaDistricts.map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>

                {/* Date */}
                <input
                    className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.date && "border-red-500"
                    }`}
                    type="date"
                    defaultValue={date}
                    {...register("date", { required: true })}
                />
                {errors.date && (
                    <p className="text-red-500 text-sm">Date is required</p>
                )}

                <div className="flex items-center justify-center w-full gap-2 flex-col md:flex-col">
                    {/* Time Selection */}
                    <div className="flex w-full justify-start gap-2 items-start flex-col">
                        <label
                            htmlFor="startTime"
                            className="block whitespace-nowrap"
                        >
                            Start Time:
                        </label>
                        <input
                            className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                            type="time"
                            defaultValue={startTime}
                            {...register("startTime", { required: true })}
                        />
                        {errors.time && (
                            <p className="text-red-500 text-sm">
                                Time is required
                            </p>
                        )}
                    </div>
                    <div className="flex w-full justify-start gap-2 items-start flex-col">
                        <label
                            htmlFor="startTime"
                            className="block whitespace-nowrap"
                        >
                            End Time:
                        </label>
                        <input
                            className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                            type="time"
                            defaultValue={endTime}
                            placeholder="End Time"
                            {...register("endTime", { required: true })}
                        />
                        {errors.time && (
                            <p className="text-red-500 text-sm">
                                Time is required
                            </p>
                        )}
                    </div>
                </div>

                {/* Salary */}
                <input
                    className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.salary && "border-red-500"
                    }`}
                    type="number"
                    placeholder="Salary"
                    defaultValue={salary}
                    {...register("salary", { required: true })}
                />
                {errors.salary && (
                    <p className="text-red-500 text-sm">Salary is required</p>
                )}

                {/* Workers Count */}
                <input
                    className={`border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.workersCount && "border-red-500"
                    }`}
                    type="number"
                    placeholder="Workers Count"
                    defaultValue={workersCount}
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
                    {isEdit ? "Edit" : "Submit"}
                </button>
            </form>
        </>
    );
}

export default JobForm;

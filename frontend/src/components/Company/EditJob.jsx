import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    useEditJobMutation,
    useGetJobByIdQuery,
} from "../../Store/AdminAuth/AdminAuth-Api";
import JobForm from "./JobForm";
import { toast } from "react-toastify";

const keralaDistricts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
];

function AdminEditJob() {
    const { jobId } = useParams();
    const { data: job, isFetching } = useGetJobByIdQuery(jobId);
    const [editJob] = useEditJobMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            location: "",
            date: "",
            time: "",
            salary: "",
            description: "",
            workersCount: "",
            district: "",
        },
    });

    useEffect(() => {
        if (job?.data && !isFetching) {
            reset({
                title: job.data.title,
                location: job.data.location,
                date: job.data.date ? job.data.date.split("T")[0] : "",
                time: job.data.time,
                salary: job.data.salary,
                description: job.data.description,
                workersCount: job.data.workersCount,
                district: job.data.district,
            });
        }
    }, [job, reset, isFetching]);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await editJob({ jobId, data }).unwrap();
            console.log(response);
            // if (!response?.success) {
            //     return
            // }
            toast.success("Job updated successfully!");
            navigate(`/company/dashboard/applications`);
        } catch (error) {
            console.log(error);
            const errorMessage = error?.data?.message || "Error in updating";
            toast.error(errorMessage);
        }
    };

    if (isFetching) return <p>Loading...</p>;

    return (
        <main className="w-full h-full">
            <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-4xl font-bold text-stone-900">Edit Job</h1>
            </div>
            <JobForm
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                register={register}
                keralaDistricts={keralaDistricts}
                isEdit={true}
            />
        </main>
    );
}

export default AdminEditJob;

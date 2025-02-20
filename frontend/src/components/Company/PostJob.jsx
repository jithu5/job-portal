import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePostJobMutation } from "../../Store/AdminAuth/AdminAuth-Api";
import { useNavigate } from "react-router-dom";
import JobForm from "./JobForm";

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
              navigate("/company/dashboard/applications");
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
                <JobForm handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} isSubmitting={isSubmitting} register={register} keralaDistricts={keralaDistricts} title='' location='' date='' time='' salary='' description='' workersCount='' />
            </main>
        </>
    );
}

export default AdminPostJob;

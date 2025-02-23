import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
    useDeleteCompanyMutation,
    useGetCompanyQuery,
} from "../../Store/adminapi/SuperAdmin-Api";
import { useNavigate } from "react-router-dom";

export default function Companies() {
    const [companies, setCompanies] = useState([]);
    const { data, isFetching } = useGetCompanyQuery();
    const [deleteCompany] = useDeleteCompanyMutation();
    const navigate = useNavigate()

    useEffect(() => {
        if (data?.data && !isFetching) {
            console.log(data.data);
            setCompanies(data.data);
        }
    }, [data]);

    const handleDeleteCompany = (id) => {
        toast(
            <div>
                <p>Are you sure you want to delete this company?</p>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={() => deleteCompanyFn(id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-300 px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-right",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
            }
        );
    };

    async function deleteCompanyFn(id) {
        try {
            const response = await deleteCompany(id).unwrap();
            if (!response.success) {
                return;
            }
            setCompanies((prevCompany) =>
                prevCompany.filter((comp) => comp._id !== id)
            );
        } catch (error) {
            const errMessage =
                error?.data?.message || "Error in deleting Company";
            toast.error(errMessage);
        }
        toast.dismiss();
    }

    return (
        <div className="p-6 font-Abel">
            <h1 className="text-2xl font-bold mb-4 text-secondary">
                Companies
            </h1>
            <Card className="p-4">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 font-bold">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2">Jobs Posted</th>
                            <th className="border p-2">Active Jobs</th>
                            <th className="border p-2">Profile</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            companies.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No companies found
                                    </td>
                                </tr>
                            )
                        }
                        {companies.length>0 && companies.map((company) => (
                            <tr
                                key={company._id}
                                className="border font-semibold"
                            >
                                <td className="p-2">{company.companyName}</td>
                                <td className="p-2">{company.email}</td>
                                <td className="p-2">{company.phone}</td>
                                <td className="p-2 text-center">
                                    {company.NoOfjobs}
                                </td>
                                <td className="p-2 text-center">
                                    {company.NoOfactivejobs}
                                </td>
                                <td className="p-2">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            paddingX: "9px",
                                            paddingY: "5px",
                                            backgroundColor: "#44403C",
                                            fontSize: "12px",
                                            "&:hover": {
                                                backgroundColor: "#1C1917",
                                            },
                                        }}
                                        onClick={() =>
                                            navigate(
                                                `/admin/dashboard/company/${company._id}`
                                            )
                                        }
                                    >
                                        VIEW Details
                                    </Button>
                                </td>
                                <td className="p-2">
                                    <Button
                                        variant="destructive"
                                        className="p-2"
                                        onClick={() =>
                                            handleDeleteCompany(company._id)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

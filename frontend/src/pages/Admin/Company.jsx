import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useGetCompanyQuery } from "../../Store/adminapi/SuperAdmin-Api";

const initialCompanies = [
    {
        id: 1,
        name: "Tech Corp",
        email: "contact@techcorp.com",
        phone: "123-456-7890",
        jobsPosted: 10,
        activeJobs: 5,
    },
    {
        id: 2,
        name: "Innovate Ltd",
        email: "info@innovate.com",
        phone: "987-654-3210",
        jobsPosted: 7,
        activeJobs: 3,
    },
    {
        id: 3,
        name: "Future Solutions",
        email: "hr@futuresolutions.com",
        phone: "456-789-0123",
        jobsPosted: 12,
        activeJobs: 8,
    },
];

export default function Companies() {
    const [companies, setCompanies] = useState(initialCompanies);
    const {data,isFetching} = useGetCompanyQuery()

    useEffect(() => {
      if (data?.data && !isFetching) {
        console.log(data.data)
      }
    }, [data])
    

    const handleDeleteCompany = (id) => {
        toast.info(
            <div>
                <p>Are you sure you want to delete this company?</p>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={() => {
                            setCompanies(
                                companies.filter((company) => company.id !== id)
                            );
                            toast.dismiss();
                            toast.success("Company deleted successfully!");
                        }}
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

    return (
        <div className="p-6 font-Abel">
            <h1 className="text-2xl font-bold mb-4 text-secondary">Companies</h1>
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
                        {companies.map((company) => (
                            <tr key={company.id} className="border font-semibold">
                                <td className="p-2">{company.name}</td>
                                <td className="p-2">{company.email}</td>
                                <td className="p-2">{company.phone}</td>
                                <td className="p-2 text-center">
                                    {company.jobsPosted}
                                </td>
                                <td className="p-2 text-center">
                                    {company.activeJobs}
                                </td>
                                <td className="p-2">
                                    <Button
                                        variant="destructive"
                                        className="p-2"
                                        
                                    >
                                        VIEW
                                    </Button>
                                </td>
                                <td className="p-2">
                                    <Button
                                        variant="destructive"
                                        className="p-2"
                                        onClick={() =>
                                            handleDeleteCompany(company.id)
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

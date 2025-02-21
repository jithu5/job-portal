import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useGetUsersQuery } from "../../Store/adminapi/SuperAdmin-Api";

const initialUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        jobsApplied: 5,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        jobsApplied: 3,
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "456-789-0123",
        jobsApplied: 7,
    },
];

export default function Users() {
    const [users, setUsers] = useState([]);
    const { data, isFetching } = useGetUsersQuery();

    useEffect(() => {
        if (data?.data && !isFetching) {
            console.log(data?.data);
            setUsers(data.data);
        }
    }, [data]);

    const handleDeleteUser = (id) => {
        toast(
            <div>
                <p>Are you sure you want to delete this user?</p>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={deleteUser}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-300 px-3 py-1 rounded text-secondary"
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
                theme: "dark",
            }
        );
    };

    async function deleteUser() {
        setUsers(users.filter((user) => user.id !== id));
        toast.dismiss();
        toast.success("User deleted successfully!");
    }

    if (isFetching) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Loader2 className="w-5 h-5 md:w-24 md:h-24 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 font-Abel">
            <h1 className="text-2xl font-bold mb-4 text-secondary">Users</h1>
            {users.length === 0 && !isFetching && (
                <p className="text-md sm:text-lg md:text-xl font-semibold text-center text-secondary">
                    No users found
                </p>
            )}
            {users.length > 0 && (
                <Card className="p-4">
                    <table className="w-full border-collapse border border-gray-600">
                        <thead>
                            <tr className="bg-gray-100 font-bold">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Phone</th>
                                {/* <th className="border p-2">Jobs Applied</th> */}
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border font-semibold"
                                >
                                    <td className="p-2">{user.name}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.phone}</td>
                                    {/* <td className="p-2 text-center">
                                    {user.jobsApplied}
                                </td> */}
                                    <td className="p-2">
                                        <Button
                                            variant="destructive"
                                            className="p-2"
                                            onClick={() =>
                                                handleDeleteUser(user._id)
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
            )}
        </div>
    );
}

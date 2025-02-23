import { Box, DialogTitle, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

import { MdSpaceDashboard, MdWorkHistory, MdAddBox } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";

const CompanyNavigationLink = [
    {
        name: "Dashboard",
        path: "",

        icon: <MdSpaceDashboard className="text-white text-lg lg:text-xl" />,
    },
    {
        name: "Applications",
        path: "applications",
        icon: <MdWorkHistory className="text-white text-lg lg:text-xl" />,
    },
    {
        name: "Post A Job",
        path: "postajob",
        icon: <MdAddBox className="text-white text-lg lg:text-xl" />,
    },
    {
        name: "Profile",
        path: "profile",
        icon: <RiUserSettingsFill className="text-white text-lg lg:text-xl" />,
    },
];
const AdminNavigation = [
    {
        name: "Dashboard",
        path: "",
        icon: <MdSpaceDashboard className="text-white text-lg lg:text-xl" />,
    },
    {
        name: "User",
        path: "users",
        icon: <MdSpaceDashboard className="text-white text-lg lg:text-xl" />,
    },
    {
        name: "Company",
        path: "companies",
        icon: <MdSpaceDashboard className="text-white text-lg lg:text-xl" />,
    },
]

function AdminDrawer({ isOpen, setIsOpen ,usedIn}) {
    const [NavigationLink, setNavigationLink] = useState([])

    useEffect(() => {
        if (usedIn.toLowerCase() === "company") {
            setNavigationLink(CompanyNavigationLink)
        }else if(usedIn.toLowerCase() === "admin"){
            setNavigationLink(AdminNavigation)
        }
    }, [])
    
    return (
        <>
            <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
                <Box
                    sx={{
                        width: {
                            sm: 380,
                            xs: 200,
                        },
                        paddingY: {
                            sm: 8,
                            xs: 5,
                        },
                        paddingX: 1,
                        backgroundColor: "#1C1917",
                        minHeight: "100vh",
                        color: "#FFFFFF",
                    }}
                >
                    <div className="w-[90%] flex items-center justify-between">
                        <DialogTitle>Dashboard</DialogTitle>
                        <IoClose
                            className="text-lg"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                    <h1 className="text-lg font-bold font-Oswald text-center my-6">
                        Job Portal
                    </h1>
                    <div>
                        <ul className="flex flex-col gap-6">
                            {NavigationLink.map((link) => (
                                <li key={link.path}>
                                    <Link onClick={()=> setIsOpen(false)}
                                        to={link.path}
                                        className="flex gap-2 items-center px-4 py-2 rounded-lg hover:bg-stone-800"
                                    >
                                        {link.icon}
                                        <span className="ml-2 block">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Box>
            </Drawer>
        </>
    );
}

export default AdminDrawer;

import React from "react";
import { NavLink } from "react-router-dom";

import { MdSpaceDashboard, MdWorkHistory, MdAddBox } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";

const NavigationLink = [
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
function AdminSideBar() {
    return (
        <>
            <aside className="w-full h-full bg-stone-900 text-white flex flex-col items-center py-7 lg:py-12 gap-10">
                <h1 className="text-xl lg:text-4xl font-bold font-Oswald">
                    Job Portal
                </h1>
                <div>
                    <ul className="flex flex-col gap-6">
                        {NavigationLink.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    end
                                    className={({isActive})=>`flex gap-2 items-center px-4 py-2 rounded-lg hover:bg-stone-800 ${isActive?"bg-stone-700":null}`}
                                >
                                    {link.icon}
                                    <span className="ml-2 block">
                                        {link.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default AdminSideBar;

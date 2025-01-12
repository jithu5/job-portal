import React from "react";
import { Link } from "react-router-dom";

import { HiOutlineUser } from "react-icons/hi";

function NavBar() {
    const currentUser = true;
    return (
        <>
            <header className="w-full flex items-center justify-between font-BarlowSemiCondensed font-medium md:px-10">
                <nav>
                    <ul className="flex items-center gap-6 sm:gap-8 md:gap-20 md:px-5 text-sm sm:text-md sm:text-lg">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Find Job</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <ul className="flex items-center gap-6">
                        {!currentUser && (
                            <>
                                <Link
                                    to={"/"}
                                    className="px-5 py-1 rounded-2xl border-[2px] border-secondary"
                                >
                                    Login
                                </Link>
                                <Link
                                    to={"/"}
                                    className="px-5 py-1 rounded-2xl border-[2px]   border-secondary"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                        {currentUser && (
                            <div className="flex justify-center items-center p-1 md:p-2 rounded-full border-[2px] border-secondary">
                                <HiOutlineUser className="text-sm sm:text-md md:text-lg" />
                            </div>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default NavBar;

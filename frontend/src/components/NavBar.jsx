import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MenuButton, NavigationLinks } from "./index";

import { HiOutlineUser } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";

function NavBar() {
    const currentUser = true;

    const [isActive, setIsActive] = useState(false);

    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getResponsiveSize = () => {
        if (screenSize < 768) {
            // Mobile
            return {
                open: {
                    width: 320,
                    height: 450,
                    top: "5px",
                    right: "15px",
                    transition: "all 0.75s cubic-bezier(0.76,0,0.24,1)",
                },
                close: {
                    width: 0,
                    height: 0,
                    top: "20px",
                    right: "24px",
                    transition: {
                        duration: 0.75,
                        delay: 0.3, // Delay for the animation
                        ease: [0.76, 0, 0.24, 1],
                    },
                    // opacity: 0,
                },
            };
        } else if (screenSize < 1024) {
            // Tablet
            return {
                open: {
                    width: 320,
                    height: 500,
                    top: "5px",
                    right: "50px",
                    transition: "all 0.75s cubic-bezier(0.76,0,0.24,1)",
                    // opacity: 1,
                },
                close: {
                    width: 0,
                    height: 0,
                    top: "16px",
                    right: "64px",
                    // opacity: 0,
                    transition: {
                        duration: 0.75,
                        delay: 0.3, // Delay for the animation
                        ease: [0.76, 0, 0.24, 1],
                    },
                },
            };
        } else {
            // Desktop
            return {
                open: {
                    width: 420,
                    height: 600,
                    top: "5px",
                    right: "50px",
                    // opacity: 1,
                    transition: "all 0.75s cubic-bezier(0.76,0,0.24,1)",
                },
                close: {
                    width: 0,
                    height: 0,
                    top: "20px",
                    right: "66px",
                    // opacity: 0,
                    transition: {
                        duration: 0.75,
                        delay: 0.3, // Delay for the animation
                        ease: [0.76, 0, 0.24, 1],
                    },
                },
            };
        }
    };

    const variants = getResponsiveSize();
    return (
        <>
            <header className="w-full flex items-center justify-end font-BarlowSemiCondensed font-medium md:px-10">
                {/* logo */}
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
                            <>
                                <FaRegHeart className="text-md sm:text-xl md:text-2xl" />
                                <MdOutlineWorkHistory className="text-md sm:text-xl md:text-2xl" />
                                <div className="flex justify-center items-center p-1 md:p-2 rounded-full border-[2px] border-secondary mr-7">
                                    <HiOutlineUser className="text-sm sm:text-md md:text-lg" />
                                </div>
                                <motion.div
                                    variants={variants}
                                    animate={isActive ? "open" : "close"}
                                    initial="close"
                                    className="bg-third rounded-2xl absolute top-4 right-6 md:right-16 z-10"
                                >
                                    <AnimatePresence>
                                        {isActive && (
                                            <NavigationLinks
                                                setIsActive={setIsActive}
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                <MenuButton
                                    isActive={isActive}
                                    setIsActive={setIsActive}
                                />
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default NavBar;

import React from "react";

import { NavLinks } from "../data";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

function NavigationLinks() {
    const animation = {
        initial: { opacity: 0, rotateX: 90, translateX: -10, translateY: 10 },
        animate: (index) => ({
            opacity: 1,
            rotateX: 0,
            translateX: 0,
            translateY: 0,

            y: 0,
            transition: {
                delay: 0.4 + index * 0.1,
                duration: 0.65,
                ease: [0.215, 0.61, 0.355, 1],
            },
        }),
        exit: {
            opacity: 0,
            transition: {
                duration:0.5,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    };
    return (
        <>
            <div className="h-full w-full pt-20 px-20 md:pt-36 md:text-4xl flex flex-col text-2xl gap-7 md:gap-10 font-semibold font-Abel">
                {NavLinks.map((link, index) => (
                    <div
                        key={index}
                        style={{
                            perspective: "120px",
                            perspectiveOrigin: "bottom",
                        }}
                    >
                        <motion.div
                            variants={animation}
                            custom={index}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            whileHover={{ scale: 1.05 }}
                            key={index}
                        >
                            <Link to={link.href}>{link.label}</Link>
                        </motion.div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default NavigationLinks;

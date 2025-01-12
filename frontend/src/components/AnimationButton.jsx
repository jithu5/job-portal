import React, { useState } from "react";
import { motion } from "framer-motion";

import { FaArrowRight } from "react-icons/fa";

function AnimationButton() {
    const [mouseOver, setMouseOver] = useState(false);
    return (
        <>
            <motion.button
                onMouseEnter={() => setMouseOver(true)}
                onMouseLeave={() => setMouseOver(false)}
                className="relative text-xl sm:text-3xl lg:text-4xl font-medium font-BebasNeue border-[2.7px] px-6 lg:px-8 py-1 md:py-2 border-third rounded-2xl overflow-hidden mix-blend-darken"
            >
                <motion.div
                    className="absolute left-2 top-[40%] translate-y-[60%] bg-third rounded-full h-2 w-2"
                    style={{
                        display: "none",
                    }}
                    animate={{
                        scale: mouseOver ? 45 : 1,
                        display: mouseOver ? "block" : "none",
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeIn",
                    }}
                ></motion.div>

                <motion.h1
                    style={{
                        color: "#9263f3",
                    }}
                    animate={{
                        x: mouseOver ? 4 : 0,
                        color: mouseOver ? "#FFFFFF" : "#9263f3",
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeIn",
                    }}
                >
                    Find a Job
                </motion.h1>
                <motion.div
                    className="absolute top-1/2 -translate-y-[50%]"
                    style={{
                        right: 4,
                    }}
                    animate={{
                        right: mouseOver ? 3 : 4,
                    }}
                    transition={{
                        duration: 0.1,
                        ease: "easeIn",
                    }}
                >
                    <FaArrowRight className="text-primary text-sm" />
                </motion.div>
            </motion.button>
        </>
    );
}

export default AnimationButton;

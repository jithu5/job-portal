import React, { useState } from "react";
import { motion } from "framer-motion";

import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AnimationButton({children,bgColor,colorCode,destination}) {
    const [mouseOver, setMouseOver] = useState(false);
    const navigate = useNavigate()
    return (
        <>
            <motion.button
            onClick={()=>navigate(destination)}
                onMouseEnter={() => setMouseOver(true)}
                onMouseLeave={() => setMouseOver(false)}
                className={`relative text-xl sm:text-3xl lg:text-4xl font-medium font-BebasNeue border-[2.7px] px-6 lg:px-8 py-1 md:py-2 ${bgColor=="third"?"border-third":"border-secondary"} rounded-2xl overflow-hidden`}
            >
                <motion.div
                    className={`absolute left-2 top-[40%] translate-y-[60%] bg-${bgColor} rounded-full h-2 w-2`}
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
                        color: colorCode, // Initial color from props
                    }}
                    animate={{
                        x: mouseOver ? 4 : 0,
                        color:mouseOver
                                ? "#FFFFFF"
                                : colorCode,
                        mixBlendMode:
                            bgColor === "secondary" && mouseOver
                                ? "difference"
                                : "normal",
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeIn",
                    }}
                >
                    {children}
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

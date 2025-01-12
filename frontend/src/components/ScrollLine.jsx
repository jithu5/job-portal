import React from "react";
import { motion } from "framer-motion";

function ScrollLine() {
    return (
        <>
            <div className="w-full flex justify-center items-center">
                <motion.div className="rounded-2xl"
                    style={{
                        width: "30%",
                        height: "3px",
                        backgroundColor:"black",
                    }}
                    whileInView={{
                        width: "100%",
                    }}
                    viewport={{
                        once: true,
                        edge: "bottom",
                    }}
                    transition={{
                        duration: 2,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                ></motion.div>
            </div>
        </>
    );
}

export default ScrollLine;

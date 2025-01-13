import React from "react";
import "../App.css";

import { motion } from "framer-motion";

function MenuButton({ isActive, setIsActive }) {
    return (
        <>
            <div
                onClick={() => setIsActive((prev) => !prev)}
                className="h-10 w-28 rounded-3xl cursor-pointer absolute overflow-hidden font-semibold font-Oswald group menuBtnAnim z-20"
            >
                <motion.div
                    style={{
                        position: "relative",
                        height: "100%",
                        width: "100%",
                    }}
                    animate={{
                        top: isActive ? "-100%" : "0",
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.75, 0, 0.24, 1],
                    }}
                >
                    <div className="h-full w-full bg-third text-secondary">
                        <PerspectiveAnimation label={"MENU"} />
                    </div>
                    <div className="w-full h-full absolute top-[100%] bg-secondary text-white">
                        <PerspectiveAnimation label={"CLOSE"} />
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default MenuButton;

function PerspectiveAnimation({ label }) {
    return (
        <div
            className="w-ful h-full flex justify-center items-center buttonRotate"
        >
            <p className="firstLabel">{label}</p>
            <p className="secondLabel">{label}</p>
        </div>
    );
}

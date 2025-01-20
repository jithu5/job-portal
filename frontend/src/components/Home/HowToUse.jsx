import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";




function HowToUse({ onboardingSteps }) {
    const [mouseOver, setMouseOver] = useState(null); // Track which step is hovered

    useEffect(() => {
        console.log(mouseOver);
    }, [mouseOver]);

    return (
        <div className="w-full py-10 md:px-10 mb-6 mt-10 md:mt-20">
            <h1 className="text-center text-5xl font-semibold font-Abel">
                How To Use US
            </h1>
            <div className="w-full flex flex-col mt-10">
                {onboardingSteps.map((step) => (
                    <div
                        key={step.id}
                        onMouseEnter={() => setMouseOver(step.id)} // Set mouseOver to current step id
                        onMouseLeave={() => setMouseOver(null)} // Reset mouseOver when mouse leaves
                        className="w-full py-4 md:py-6 px-1 md:px-3 flex items-center justify-between relative cursor-pointer"
                        style={{
                            backgroundColor: "#EDEAEB",
                            color: "#020204",
                        }}
                    >
                        {/* Sliding background */}
                        <motion.div
                            className="absolute w-full top-0 left-0 bg-secondary rounded-b-lg"
                            style={{
                                height: "0%", // Start with hidden background
                            }}
                            animate={{
                                height: mouseOver === step.id ? "100%" : "0%", // Slide in/out based on hover
                            }}
                            transition={{
                                duration: 0.5, // Smooth transition duration
                                ease: "easeInOut", // Smooth easing effect
                            }}
                            initial={{ height: "0%" }} // Ensure the background starts hidden
                        />

                        <motion.h1
                            className="text-lg font-BarlowSemiCondensed font-semibold"
                            style={{
                                mixBlendMode:
                                    mouseOver === step.id
                                        ? "difference"
                                        : "normal", // Apply mix-blend-mode on hover
                                color:
                                    mouseOver === step.id ? "#FFF" : "#020204", // Make sure text is visible
                            }}
                            animate={{
                                scale: mouseOver === step.id ? 1.3 : 1, // Increase font size on hover
                            }}
                            transition={{
                                duration: 0.4, // Smooth transition duration
                            }}
                        >
                            {step.id}
                        </motion.h1>

                        <motion.h1
                            className="text-md md:text-xl font-BarlowSemiCondensed font-semibold max-w-[25%]"
                            style={{
                                mixBlendMode:
                                    mouseOver === step.id
                                        ? "difference"
                                        : "normal", // Apply mix-blend-mode on hover
                                color:
                                    mouseOver === step.id ? "#FFF" : "#020204", // Make sure text is visible
                            }}
                            animate={{
                                scale: mouseOver === step.id ? 1.1 : 1, // Increase font size on hover
                            }}
                            transition={{
                                duration: 0.4, // Smooth transition duration
                            }}
                        >
                            {step.title}
                        </motion.h1>
                        <motion.p
                            className="text-xs md:text-lg font-BarlowSemiCondensed font-medium max-w-[45%]"
                            style={{
                                mixBlendMode:
                                    mouseOver === step.id
                                        ? "difference"
                                        : "normal", // Apply mix-blend-mode on hover
                                color:
                                    mouseOver === step.id ? "#FFF" : "#020204", // Make sure text is visible
                            }}
                            animate={{
                                scale: mouseOver === step.id ? 1.01 : 1, // Increase font size
                            }}
                            transition={{
                                duration: 0.3, // Smooth transition duration
                            }}
                        >
                            {step.description}
                        </motion.p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HowToUse;

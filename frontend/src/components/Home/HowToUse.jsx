import React, { useState } from "react";
import { motion } from "framer-motion";

function HowToUse({ onboardingSteps }) {
    const [mouseOver, setMouseOver] = useState(null);

    // Reusable function for hover styles
    const getHoverStyles = (stepId) => ({
        mixBlendMode: mouseOver === stepId ? "difference" : "normal",
        color: mouseOver === stepId ? "#FFF" : "#020204",
    });

    return (
        <div className="w-full py-10 md:px-10 mb-6 mt-10 md:mt-20">
            <h1 className="text-center text-5xl font-semibold font-Abel">
                How To Use US
            </h1>
            <div className="w-full flex flex-col mt-6">
                {onboardingSteps.map((step) => (
                    <div
                        key={step.id}
                        onMouseEnter={() => setMouseOver(step.id)}
                        onMouseLeave={() => setMouseOver(null)}
                        className="w-full py-4 md:py-6 px-5 sm:px-6 md:px-8 grid grid-cols-4 relative cursor-pointer"
                        style={{
                            backgroundColor: "#EDEAEB",
                            color: "#020204",
                        }}
                    >
                        {/* Sliding background */}
                        <motion.div
                            className="absolute w-full top-0 left-0 bg-secondary rounded-b-lg"
                            style={{ height: "0%" }}
                            animate={{
                                height: mouseOver === step.id ? "100%" : "0%",
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            initial={{ height: "0%" }}
                        />

                        {/* Step Number */}
                        <motion.h1
                            className="text-md md:text-lg font-BarlowSemiCondensed font-semibold"
                            style={getHoverStyles(step.id)}
                        animate={{ scale: mouseOver === step.id ? 1.1 : 1 }}
                        transition={{ duration: 0.4 }}
                        >
                            {step.id}
                        </motion.h1>

                        {/* Step Title */}
                        <motion.h1
                            className="text-sm sm:text-md md:text-xl font-BarlowSemiCondensed font-semibold justify-self-start"
                            style={getHoverStyles(step.id)}
                            animate={{ scale: mouseOver === step.id ? 1.1 : 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {step.title}
                        </motion.h1>

                        {/* Step Description */}
                        <motion.p
                            className="text-xs md:text-lg font-BarlowSemiCondensed font-medium col-start-3 col-end-5"
                            style={getHoverStyles(step.id)}
                            animate={{
                                scale: mouseOver === step.id ? 1.04 : 1,
                            }}
                            transition={{ duration: 0.3 }}
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

import React from "react";
import HomeImage from "../../assets/job-image.png";

import { motion } from "framer-motion";

import {
    AnimationButton,
    ScrollLine,
    HowToUse,
    AboutUs,
} from "../index";

const onboardingSteps = [
    {
        id: 1,
        title: "Login or Signup",
        description:
            "Users need to create a new account or log in using their existing credentials.",
        icon: "🔑",
        color: "#5F4B8B",
    },
    {
        id: 2,
        title: "Verify Your Email",
        description:
            "This step involves securing the user's account by verifying their email address through an OTP.",
        icon: "📧",
        color: "#F45B69",
    },
    {
        id: 3,
        title: "Post Jobs",
        description:
            "Users can personalize their profiles by specifying the types of jobs they are interested in. This enables us to provide relevant job.",
        icon: "📝",
        color: "#2D9C9B",
    },
    
];

function AdminHome() {
    const parentVariants = {
        hidden: {
            opacity: 1,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Time between each word animation
            },
        },
    };

    const childVariants = {
        hidden: { y: "100%" },
        visible: { y: 0 },
    };

    const text = "GET YOUR DREAM JOB"; // Text to be animated
    const words = text.split(" "); // Split the text into words

    return (
        <>
            <main className="w-full mt-10 sm:mt-20">
                <div className="flex flex-col sm:flex-row items-start justify-between sm:px-10 md:px-16 mb-12">
                    <div className="w-full sm:w-[64%] flex flex-col items-center">
                        <motion.div
                            className="flex flex-wrap overflow-hidden w-fit h-fit mb-10"
                            variants={parentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {words.map((word, index) => (
                                <div
                                    key={index}
                                    className="w-fit h-fit overflow-hidden"
                                >
                                    <motion.span
                                        variants={childVariants}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeInOut",
                                        }}
                                        className="text-6xl sm:text-7xl md:text-8xl lg:text-10xl xl:text-11xl font-medium font-BebasNeue tracking-wider leading-1 block ml-4 md:ml-8"
                                        style={{
                                            overflow: "hidden", // Ensures word movement stays inside
                                        }}
                                    >
                                        {word}{" "}
                                    </motion.span>
                                </div>
                            ))}
                        </motion.div>
                        <AnimationButton
                            destination={"/admin/dashboard"}
                            bgColor={"third"}
                            colorCode={"#9263f3"}
                        >
                            Post a Job
                        </AnimationButton>
                    </div>
                    <div className="w-full sm:w-[37%] items-end">
                        {/* Add your image here */}
                        <img
                            src={HomeImage}
                            alt="Placeholder Image"
                            className="object-cover sm:w-full h-full"
                        />
                    </div>
                </div>
                <ScrollLine />
                <HowToUse onboardingSteps={onboardingSteps} />
                <ScrollLine />
                <AboutUs />
            </main>
        </>
    );
}

export default AdminHome;

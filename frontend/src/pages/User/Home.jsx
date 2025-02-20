import React from "react";
import HomeImage from "../../assets/job-image.png";

import { motion } from "framer-motion";

import {
    AnimationButton,
    ScrollLine,
    HowToUse,
    RecommendedJobs,
    AboutUs,
} from "../../components/index";
import { useSelector } from "react-redux";

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
        title: "Search for Jobs",
        description:
            "Users can explore job opportunities using filters such as location, job type, and keywords to narrow down their search.",
        icon: "🔍",
        color: "#F1C40F",
    },
    {
        id: 4,
        title: "Apply for a Job",
        description:
            "In the final step, users can submit their applications for the jobs that align with their preferences and interests.",
        icon: "✅",
        color: "#27AE60",
    },
];

function Home() {
    const { user: currentUser } = useSelector((state) => state.Auth);

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
                        {currentUser ? (
                            <AnimationButton
                                destination={"/user/jobs"}
                                bgColor={"third"}
                                colorCode={"#9263f3"}
                            >
                                Find a Job
                            </AnimationButton>
                        ) : (
                            <div className="flex items-center gap-6">
                                <AnimationButton
                                    destination={"/api/user/login"}
                                    bgColor={"secondary"}
                                    colorCode={"#020204"}
                                >
                                    LOG IN
                                </AnimationButton>
                                
                            </div>
                        )}
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
                {!currentUser ? (
                    <>
                        <ScrollLine />
                        <HowToUse onboardingSteps={onboardingSteps} />
                    </>
                ) : (
                    <>
                        <ScrollLine />
                        <RecommendedJobs />
                    </>
                )}
                <ScrollLine />
                <AboutUs />
            </main>
        </>
    );
}

export default Home;

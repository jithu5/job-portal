import React from "react";
import HomeImage from "../assets/job-image.png";

import {
    AnimationButton,
    ScrollLine,
    HowToUse,
    RecommendedJobs,
    AboutUs
} from "../components/index";

function Home() {
    return (
        <>
            <main className="w-full mt-10 md:mt-20">
                <div className="flex flex-col sm:flex-row items-start justify-between sm:px-10 md:px-16 mb-12">
                    <div className="w-full sm:w-[64%] flex flex-col items-center">
                        <h1 className="text-7xl md:text-8xl lg:text-10xl xl:text-10xl mb-10 font-medium font-BebasNeue tracking-wider leading-1">
                            GET YOUR DREAM JOB
                        </h1>
                        <AnimationButton />
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
                <HowToUse />
                <ScrollLine />
                <RecommendedJobs />
                <ScrollLine />
                <AboutUs />
            </main>
        </>
    );
}

export default Home;

import React from "react";
import HomeImage from "../assets/job.png";

import { AnimationButton , ScrollLine} from "../components/index";

function Home() {
    return (
        <>
            <main className="flex w-full items-start justify-between mt-20 px-16 mb-72">
                <div className="w-[58%] flex flex-col items-center">
                    <h1 className="text-10xl mb-10 font-medium font-BebasNeue tracking-wider leading-[180px]">
                        GET YOUR DREAM JOB
                    </h1>
                    <AnimationButton />
                </div>
                <div className="w-[40%]">
                    {/* Add your image here */}
                    <img
                        src={HomeImage}
                        alt="Placeholder Image"
                        className="object-cover w-full h-full"
                    />
                </div>
            </main>
            <ScrollLine />
        </>
    );
}

export default Home;

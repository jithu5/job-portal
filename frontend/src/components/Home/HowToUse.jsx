import React from "react";

const onboardingSteps = [
    {
        id: 1,
        title: "Login or Signup",
        description:
            "Create an account or log in to access personalized features.",
        icon: "🔑",
        color: "#5F4B8B", // A rich, dark purple that provides contrast with white text.
    },
    {
        id: 2,
        title: "Verify Your Email",
        description: "Secure your account by verifying your email with an OTP.",
        icon: "📧",
        color: "#F45B69", // A deep coral red that’s vibrant yet not too bright.
    },
    {
        id: 3,
        title: "Add Jobs to Your Profile",
        description:
            "Specify the types of jobs you're interested in for better matches.",
        icon: "📝",
        color: "#2D9C9B", // A deep teal for a calming, professional look.
    },
    {
        id: 4,
        title: "Search for Jobs",
        description:
            "Explore jobs using filters and keywords to find the perfect match.",
        icon: "🔍",
        color: "#F1C40F", // A golden yellow that is warm and attention-grabbing.
    },
    {
        id: 5,
        title: "Apply for a Job",
        description:
            "Submit your application for jobs that align with your preferences.",
        icon: "✅",
        color: "#27AE60", // A deep, confident green that conveys action.
    },
];

function HowToUse() {
    return (
        <>
            <div className="w-full py-10 px-10 mb-6">
                <h1 className="text-center text-5xl font-semibold font-Abel">
                    How To Use US
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                    {onboardingSteps.map((step) => (
                        <div
                            key={step.id}
                            className="flex flex-col gap-3 px-2 py-4 pb-3 rounded-lg max-w-[300px]"
                            style={{
                                backgroundColor: step.color,
                            }}
                        >
                            <div className="flex items-center justify-center p-4 text-3xl">
                                {step.icon}
                            </div>
                            <div className="text-center text-white">
                                <h2 className="text-center text-xl font-semibold">
                                    {step.title}
                                </h2>
                                <p className="text-md mt-5 text-white font-medium mb-5">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HowToUse;

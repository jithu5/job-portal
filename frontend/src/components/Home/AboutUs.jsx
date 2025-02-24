import React from "react";

function AboutUs() {
    return (
        <div className="w-full py-10 px-8 md:px-16 lg:px-24 bg-gray-100 my-10 md:my-20">
            <h1 className="text-4xl md:text-5xl font-bold font-Abel text-center text-indigo-600">
                About Us
            </h1>
            <p className="mt-6 text-lg md:text-xl text-center text-gray-700 leading-7 font-BarlowSemiCondensed">
                We understand that being a student can be financially
                challenging. Our mission is to help students find flexible,
                part-time job opportunities that align with their schedules,
                enabling them to earn pocket money and cover expenses without
                compromising their education.
            </p>
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="bg-white shadow-lg p-6 rounded-lg text-center w-72">
                    <div className="text-indigo-600 text-5xl">🎓</div>
                    <h3 className="text-2xl font-semibold mt-4 text-gray-800">
                        For Students
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Discover job opportunities tailored for students, giving
                        you the freedom to balance work and studies effectively.
                    </p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg text-center w-72">
                    <div className="text-indigo-600 text-5xl">🕒</div>
                    <h3 className="text-2xl font-semibold mt-4 text-gray-800">
                        Flexible Hours
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Work on your terms with part-time roles offering
                        flexible hours, perfect for your student lifestyle.
                    </p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg text-center w-72">
                    <div className="text-indigo-600 text-5xl">💰</div>
                    <h3 className="text-2xl font-semibold mt-4 text-gray-800">
                        Achieve Financial Independence
                    </h3>
                    <p className="mt-2 text-gray-600">
                        You can earn money for your own needs and expenses.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;

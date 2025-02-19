import React from "react";
import cover from "../../assets/coverImage.jpg";
import profile from "../../assets/avatar.png";
import { useViewCompanyQuery } from "../../Store/Auth/Auth-Api";
import { useParams } from "react-router-dom";

function CompanyProfile() {
    const {comapnyId} = useParams()
    const { data} = useViewCompanyQuery()
    return (
        <>
            <main className="w-full p-4 mt-10 min-h-screen grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-[90%] shadow-sm rounded-xl h-[70vh] bg-white rounded-t-3xl">
                    <div className="w-full h-[30%] relative rounded-t-3xl mb-10">
                        <img
                            className="w-full h-full object-cover rounded-t-3xl"
                            src={cover}
                            alt=""
                        />
                        <img
                            className="h-16 w-16 rounded-full object-cover absolute left-[6%] -bottom-8"
                            src={profile}
                            alt=""
                        />
                    </div>
                    <div className="p-4 px-10">
                        <h1 className="text-3xl font-bold text-blue-600">
                            Company Name
                        </h1>
                        <p className="text-lg text-gray-700">
                            Description of the company
                        </p>
                        <div className="flex items-center mt-6">
                            <p className="text-lg font-semibold text-blue-600">
                                Location:
                            </p>
                            <p className="text-lg ml-2">Location of the company</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Company Overview
                    </h2>
                    <p className="text-lg text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        vel neque auctor, lobortis ex sed, viverra felis. Donec
                        tristique, arcu ac consectetur tincidunt, justo velit
                        condimentum justo, non ullamcorper velit nunc sed nisi.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-10">
                        Company History
                    </h2>
                </div>
            </main>
        </>
    );
}

export default CompanyProfile;

import { Mail } from "lucide-react";
import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
{/* <MdEmail /> */}
function Footer() {
    return (
        <footer className="w-full bg-secondary rounded-t-xl py-20 text-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Find Your Perfect Job
                    </h2>
                    <p className="text-lg">
                        Helping students connect with flexible part-time job
                        opportunities to fund their education and expenses.
                    </p>
                </div>

                <div className="mt-8 text-center flex justify-between gap-6 w-full px-1 sm:px-5 md:px-10 max-sm:flex-col items-center">
                    <a
                        href="mailto:shabari24371@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-indigo-400 flex items-center gap-2"
                    >
                        <Mail />
                        <h2 className="text-xs sm:text-sm md:text-lg">
                            SURJITH. S
                        </h2>
                    </a>
                    <a
                        href="mailto:ajith.aju39502@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-indigo-400 flex items-center gap-2"
                    >
                        <Mail />
                        <h2 className="text-xs sm:text-sm md:text-lg">
                            AJITH P
                        </h2>
                    </a>
                    <a
                        href="mailto:leohari17@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-indigo-400 flex items-center gap-2"
                    >
                        <Mail />
                        <h2 className="text-xs sm:text-sm md:text-lg">
                            SREEVAIDYANATHAN R
                        </h2>
                    </a>
                    <a
                        href="mailto:akashas321s@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-indigo-400 flex items-center gap-2"
                    >
                        <Mail />
                        <h2 className="text-xs sm:text-sm md:text-lg">
                            AKASH S
                        </h2>
                    </a>
                </div>
                <p className="cursor-pointer text-center mt-8">
                    Admin:
                    <a
                        className=" text-red-500"
                        href="mailto:shabari24371@gmail.com"
                        target="__blank"
                    >
                        {" "}
                        shabari24371@gmail.com
                    </a>
                </p>
                <div className="mt-6 text-center">
                    <p className="text-sm">
                        © 2025 Find Your Dream Job. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

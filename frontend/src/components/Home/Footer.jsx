import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="w-full bg-secondary rounded-t-xl py-20 text-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
                <div
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Find Your Perfect Job
                    </h2>
                    <p className="text-lg">
                        Helping students connect with flexible part-time job
                        opportunities to fund their education and expenses.
                    </p>
                </div>

                <div
                    className="mt-8 text-center flex justify-center gap-6"
                >
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-indigo-400"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-indigo-400"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-indigo-400"
                    >
                        <FaLinkedinIn />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-indigo-400"
                    >
                        <FaInstagram />
                    </a>
                </div>

                <div
                    className="mt-6 text-center"
                >
                    <p className="text-sm">
                        © 2025 Find Your Dream Job. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

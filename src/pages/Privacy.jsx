import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Privacy = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-16 h-16 border-4 border-green-200 border-t-green-700 rounded-full"
                />
                <p className="text-green-700 font-semibold animate-pulse">
                    Loading About Page...
                </p>
            </div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto p-16">
            <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
                Privacy Policy
            </h1>

            <div className="bg-white shadow-md rounded-lg p-6 space-y-4 text-gray-700">
                <p>
                    Your privacy is important to us. This platform is designed to ensure
                    transparency while protecting user data.
                </p>

                <h2 className="text-xl font-semibold text-green-700">
                    Information We Collect
                </h2>
                <ul className="list-disc ml-6">
                    <li>Name and email for authentication</li>
                    <li>Issue and contribution data</li>
                    <li>Basic usage analytics</li>
                </ul>

                <h2 className="text-xl font-semibold text-green-700">
                    How We Use Information
                </h2>
                <p>
                    Data is used only to manage issues, contributions, and improve user
                    experience. We never sell personal information.
                </p>

                <h2 className="text-xl font-semibold text-green-700">
                    Data Security
                </h2>
                <p>
                    We follow industry-standard security practices to protect user data.
                </p>
            </div>
        </div>
    );
};

export default Privacy;

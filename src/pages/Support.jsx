import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Support = () => {

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
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
                Help & Support
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-green-700 mb-3">
                        Frequently Asked Questions
                    </h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>✔ How to report an issue?</li>
                        <li>✔ How to make a contribution?</li>
                        <li>✔ How to track my reports?</li>
                        <li>✔ How to download contribution report?</li>
                    </ul>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-green-700 mb-3">
                        Contact Support
                    </h2>
                    <p className="text-gray-700 mb-2">
                        📧 Email: support@cleancommunity.com
                    </p>
                    <p className="text-gray-700 mb-2">
                        📞 Phone: +880 1XXX-XXXXXX
                    </p>
                    <p className="text-gray-700">
                        🕘 Support Hours: 9 AM – 6 PM (Sun–Thu)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Support;

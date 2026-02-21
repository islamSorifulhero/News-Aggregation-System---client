import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
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
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-6"
            >
                About Our Platform
            </motion.h1>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-gray-400 max-w-3xl mx-auto mb-10"
            >
                This Community Cleanliness & Issue Reporting Platform helps citizens
                report local issues like garbage, drainage, and road problems, so that
                communities can take action together.
            </motion.p>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Mission */}
                <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white shadow-lg rounded-xl p-6"
                >
                    <h3 className="text-xl font-semibold text-green-700 mb-2">
                        🌱 Our Mission
                    </h3>
                    <p className="text-gray-600 text-sm">
                        To create cleaner, safer, and more responsible communities by
                        enabling people to report and solve local cleanliness issues.
                    </p>
                </motion.div>

                {/* How it works */}
                <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white shadow-lg rounded-xl p-6"
                >
                    <h3 className="text-xl font-semibold text-green-700 mb-2">
                        ⚙️ How It Works
                    </h3>
                    <p className="text-gray-600 text-sm">
                        Users can post issues with images and locations, and others can
                        view, support, and contribute to solving those problems.
                    </p>
                </motion.div>

                {/* Community */}
                <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white shadow-lg rounded-xl p-6"
                >
                    <h3 className="text-xl font-semibold text-green-700 mb-2">
                        🤝 Community Driven
                    </h3>
                    <p className="text-gray-600 text-sm">
                        This platform is built to encourage teamwork, transparency, and
                        civic responsibility among community members.
                    </p>
                </motion.div>
            </div>

            {/* Footer text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-gray-400 text-sm mt-12"
            >
                © {new Date().getFullYear()} Community Cleanliness Platform. All rights reserved.
            </motion.p>
        </div>
    );
};

export default About;

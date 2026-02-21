import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
    const statData = [
        { id: 1, label: "Issues Reported", value: "1,200+" },
        { id: 2, label: "Resolved Today", value: "45" },
        { id: 3, label: "Active Volunteers", value: "350" },
        { id: 4, label: "Cleaned Areas", value: "85" },
    ];

    return (
        <section className="py-16 mt-4 dark:bg-slate-900 transition-colors  bg-linear-to-r from-cyan-600 to-emerald-500">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                {statData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h2 className="text-4xl font-bold mb-2">{item.value}</h2>
                        <p className="text-green-100 dark:text-gray-400 font-medium">{item.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
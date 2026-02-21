import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Arif Ahmed",
        role: "Local Resident",
        comment: "The speed at which the garbage was cleared after my report was amazing! This platform really works.",
        image: "https://i.pravatar.cc/150?u=arif"
    },
    {
        id: 2,
        name: "Sara Khan",
        role: "Community Volunteer",
        comment: "Reporting broken public property has never been easier. I feel like I'm finally contributing to my city.",
        image: "https://i.pravatar.cc/150?u=sara"
    },
    {
        id: 3,
        name: "Dr. Rakib",
        role: "Environmentalist",
        comment: "A great initiative to keep our environment clean. The transparency of the status updates is commendable.",
        image: "https://i.pravatar.cc/150?u=rakib"
    }
];

const Testimonials = () => {
    return (
        <section className="py-10 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
                        What Our Citizens Say
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Real feedback from people who are helping to make our community cleaner and safer every day.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center relative"
                        >
                            <div className="absolute top-4 left-6 text-green-200 dark:text-slate-800 text-6xl font-serif">
                                “
                            </div>

                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 rounded-full border-4 border-green-500 mb-4 object-cover"
                            />

                            <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10">
                                "{item.comment}"
                            </p>

                            <div className="mt-auto">
                                <h4 className="font-bold text-gray-800 dark:text-white">{item.name}</h4>
                                <p className="text-sm text-green-600 dark:text-green-500 font-medium">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
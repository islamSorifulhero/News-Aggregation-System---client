import React from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Subscribed!',
            text: 'Thank you for joining our community.',
            showConfirmButton: false,
            timer: 2000
        });
        e.target.reset();
    };

    return (
        <section className="py-10 bg-gray-100 dark:bg-slate-950">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
                        Stay Updated
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Subscribe to get the latest news on city cleaning projects and community impacts.
                    </p>

                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <label className="sr-only">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="px-6 py-3 rounded-full border border-gray-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500 flex-grow max-w-md"
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-700 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-lg animate__animated animate__pulse animate__infinite"
                        >
                            Subscribe
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;

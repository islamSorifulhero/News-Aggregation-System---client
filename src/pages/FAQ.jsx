import React from 'react';

const FAQ = () => {
    const faqs = [
        { q: "How do I report an issue?", a: "Simply sign up, go to 'Add Issue', upload a photo and location, then submit." },
        { q: "Is this service free?", a: "Yes, reporting issues is completely free for all citizens." },
        { q: "How long does it take to resolve?", a: "Typically, issues are reviewed within 24 hours and addressed based on priority." }
    ];

    return (
        <section className="py-10 max-w-4xl mx-auto px-6 dark:bg-slate-950">
            <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-10">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="collapse collapse-arrow bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800"
                    >
                        <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />

                        <div className="collapse-title text-xl font-medium text-gray-800 dark:text-gray-200">
                            {faq.q}
                        </div>

                        <div className="collapse-content text-gray-600 dark:text-gray-300">
                            <p>{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;

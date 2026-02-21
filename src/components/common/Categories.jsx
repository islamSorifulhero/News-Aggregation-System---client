import React from "react";
import { motion } from "framer-motion";
import garbage from "../../assets/garbage.jpg";
import construction from "../../assets/construction.jpg";
import property from "../../assets/property.jpg";
import road from "../../assets/road.jpg";

const categories = [
  { id: 1, name: "Garbage", image: garbage },
  { id: 2, name: "Illegal Construction", image: construction },
  { id: 3, name: "Broken Public Property", image: property },
  { id: 4, name: "Road Damage", image: road },
];

const Categories = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center text-green-700 mb-8"
      >
        Issue Categories
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}

            whileHover={{
              scale: 1.05,
              y: -10,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.15)"
            }}
            whileTap={{ scale: 0.95 }}

            className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden cursor-pointer border border-transparent dark:border-slate-700"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover" />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg text-green-700 dark:text-green-400 animate__animated animate__pulse animate__infinite">{cat.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
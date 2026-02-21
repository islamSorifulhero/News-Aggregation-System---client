import React from 'react';
import { motion } from 'framer-motion';
import banner11 from "../../assets/banner1.jpg";
import banner22 from "../../assets/banner2.jpg";
import banner33 from "../../assets/banner3.jpg";

const Banner = () => {
  const slides = [
    { id: "slide1", img: banner11, next: "#slide2", prev: "#slide3", title: "Clean Our Streets", desc: "Join us in making our city a better place to live." },
    { id: "slide2", img: banner22, next: "#slide3", prev: "#slide1", title: "Report Issues Instantly", desc: "See garbage or road damage? Let us know with just a few clicks." },
    { id: "slide3", img: banner33, next: "#slide1", prev: "#slide2", title: "Track Your Impact", desc: "Watch how your reports turn into real changes in our community." },
  ];

  return (
    <div className="carousel w-full h-[65vh] relative overflow-hidden">
      {slides.map((slide, index) => (
        <div key={slide.id} id={slide.id} className="carousel-item relative w-full h-full">
          <img src={slide.img} className="w-full h-full object-cover brightness-[0.6]" alt="Banner" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-3xl font-bold mb-4"
            >
              {slide.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-lg mb-6 text-gray-200"
            >
              {slide.desc}
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button className="btn btn-primary bg-green-700 border-none hover:bg-green-600 text-white px-8 animate__animated animate__pulse animate__infinite">
                Get Started
              </button>
            </motion.div>
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between z-30">
            <a href={slide.prev} className="btn btn-circle btn-ghost text-white bg-black/20 hover:bg-black/50 border-none">❮</a>
            <a href={slide.next} className="btn btn-circle btn-ghost text-white bg-black/20 hover:bg-black/50 border-none">❯</a>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center text-white/70">
              <span className="text-xs uppercase tracking-widest mb-1 font-semibold">Scroll Down</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
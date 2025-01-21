import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${offset * 0.5}px)`,
          backgroundImage: `url('/images/gym2.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Enhanced gradient overlay with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />

      {/* Animated decorative elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl ml-8 lg:ml-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-xl md:text-2xl font-bold mb-6 leading-tight text-white">
              Transform Your Body,
              <br />
              <span className="text-primary bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                Transform Your Life
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl">
              Join the elite community of fitness enthusiasts and achieve your
              ultimate fitness goals with our state-of-the-art facilities and
              expert trainers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg 
                            hover:bg-red-700 transition-colors shadow-lg shadow-primary/20 
                            hover:shadow-primary/40"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 
                            rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View Programs
              </motion.button>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
                <p className="text-gray-400 text-sm">Active Members</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                <p className="text-gray-400 text-sm">Expert Trainers</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">25+</h3>
                <p className="text-gray-400 text-sm">Programs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

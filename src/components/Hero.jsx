import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Hero = () => {
  const [offset, setOffset] = useState(0);

    // Scroll to top on component mount
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 z-10" />

      {/* Animated decorative elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Vertical flowing text on right */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 transform z-20 hidden lg:flex items-center">
        <div
          className="relative -rotate-180 mr-10"
          style={{ writingMode: "vertical-rl" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col gap-2 text-gray-500 tracking-widest uppercase text-base md:text-lg"
          >
            <span className="hover:text-primary transition-colors duration-300">
              Strength
            </span>
            <span className="text-primary font-bold">Discipline</span>
            <span className="hover:text-primary transition-colors duration-300">
              Dedication
            </span>
            <span className="text-primary/80 font-bold">Excellence</span>
          </motion.div>
        </div>

        <div className="w-[2px] h-48 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto px-2 sm:px-6 lg:px-16 w-full pt-24">
        <div className="max-w-2xl ml-2 md:ml-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-open font-extrabold mb-6 text-white">
              Transform Your <br />
              Body,
              <br />
              <span className="text-primary bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                Transform Your Life
              </span>
            </h1>
            <p className="text-base md:text-lg font-nunito text-gray-300 mb-8 max-w-xl">
              Join the elite community of fitness enthusiasts and achieve your
              ultimate fitness goals with our state-of-the-art facilities and
              expert trainers.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white mb-8 px-10 py-3 sm:py-4 rounded-2xl font-semibold text-lg 
                            hover:bg-red-700 transition-colors shadow-lg shadow-primary/20 
                            hover:shadow-primary/40"
            >
              <span className="text-[0.9rem] sm:text-base">
                Start Your Journey
              </span>
            </motion.button>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mb-16">
              {[
                { icon: FaFacebookF, link: "#" },
                { icon: FaInstagram, link: "#" },
                { icon: FaXTwitter, link: "#" },
                { icon: FaYoutube, link: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
                           text-gray-300 hover:text-white hover:bg-primary/20 transition-all duration-300
                           border border-white/10 hover:border-primary"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="sm:pl-12"
        >
          {/* Stats Section */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-8 md:max-w-4xl">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl sm:px-10 py-6">
              <h3 className="text-xl sm:text-4xl font-bold text-primary mb-2">
                100+
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">Active Members</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl sm:px-10 py-6">
              <h3 className="text-xl sm:text-4xl font-bold text-primary mb-2">
                10+
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Expert Trainers
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl sm:px-10 py-6">
              <h3 className="text-xl sm:text-4xl font-bold text-primary mb-2">
                15+
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">Programs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

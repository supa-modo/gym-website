import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 group">
              <img
                src="/images/logo-gym.png"
                alt="Elite Fitness"
                className="h-20 w-20 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-extrabold font-nunito tracking-wider text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                ELITE•FITNESS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-10 font-nunito font-extrabold text-[17px]">
              {["Home", "Classes", "Store", "Membership", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-300 hover:text-white relative inline-block transition-colors duration-300
                    before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 
                    before:bg-primary before:transition-all before:duration-300 hover:before:w-full"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Join Now Button */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-xl font-extrabold font-nunito 
                            hover:bg-red-700 transition-colors shadow-lg shadow-primary/20 
                            hover:shadow-primary/40"
            >
              Join Now
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-8 w-8 transition-transform duration-300 hover:rotate-90" />
              ) : (
                <Menu className="h-8 w-8 transition-transform duration-300 hover:scale-110" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-[88px] left-0 right-0 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-lg border-t border-gray-800">
          {["Home", "Classes", "Store", "Membership", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-primary/20 
                rounded-lg transition-all duration-300 font-nunito font-extrabold text-lg"
            >
              {item}
            </a>
          ))}
          <div className="px-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-2 bg-primary text-white px-8 py-2 rounded-xl font-extrabold 
            font-nunito transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-primary/20"
            >
              Join Now
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

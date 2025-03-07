import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { IoFitnessOutline } from "react-icons/io5";
import { BsArrowUpCircle } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/", type: "scrollTop" },
    { name: "Classes", href: "classes", type: "scroll" },
    { name: "Store", href: "/store", type: "router" },
    { name: "Pricing", href: "pricing", type: "scroll" },
    { name: "Contact", href: "contact", type: "scroll" },
    { name: "Admin Login", href: "/admin", type: "router" },
  ];

  const programs = [
    { name: "Strength Training", href: "#" },
    { name: "HIIT Classes", href: "#" },
    { name: "Boxing", href: "#" },
    { name: "Yoga & Wellness", href: "#" },
    { name: "Zumba Dance", href: "#" },
    { name: "Personal Training", href: "#" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "#",
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
      color: "hover:bg-pink-600",
    },
    { name: "Twitter", icon: FaTwitter, href: "#", color: "hover:bg-sky-500" },
    { name: "YouTube", icon: FaYoutube, href: "#", color: "hover:bg-red-600" },
    { name: "TikTok", icon: FaTiktok, href: "#", color: "hover:bg-slate-800" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-zinc-900 pt-20 pb-5 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#FF0000,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#FF0000,_transparent_55%)] opacity-5"></div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 mb-5">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-red-600 
                            p-0.5 transform rotate-3 transition-transform duration-300"
              >
                <div
                  className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center
                             transform -rotate-3 transition-transform duration-300"
                >
                  <IoFitnessOutline className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Elite•Fitness</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your body, transform your life. Join our community and
              achieve your fitness goals with expert guidance and
              state-of-the-art facilities.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 rounded-lg ${social.color} bg-zinc-800/50 flex items-center justify-center
                            transition-colors duration-300`}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.type === "router" ? (
                    <RouterLink
                      to={link.href}
                      className="text-gray-400 hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary"></span>
                      {link.name}
                    </RouterLink>
                  ) : link.type === "scrollTop" ? (
                    <RouterLink
                      to="/"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className="text-gray-400 hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary"></span>
                      {link.name}
                    </RouterLink>
                  ) : (
                    <RouterLink
                      to="/"
                      onClick={() => {
                        setTimeout(() => {
                          const element = document.getElementById(link.href);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 100);
                      }}
                      className="text-gray-400 hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary"></span>
                      {link.name}
                    </RouterLink>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white">Our Programs</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <motion.li
                  key={program.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={program.href}
                    className="text-gray-400 hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    {program.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Fitness Street, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-primary" />
                <span className="text-gray-400 text-sm">+254 712 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-primary" />
                <span className="text-gray-400 text-sm">
                  info@elitefitness.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <p>Mon - Fri: 5:00 AM - 11:00 PM</p>
                  <p>Sat - Sun: 6:00 AM - 10:00 PM</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative pt-8 mt-10 border-t border-zinc-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Elite•Fitness. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-primary text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 -top-5 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-red-600 
                      p-0.5 transform transition-transform duration-300 hidden sm:block"
          >
            <div className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center">
              <BsArrowUpCircle className="w-5 h-5 text-white" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsSend } from "react-icons/bs";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const contactInfo = [
    {
      icon: FiPhone,
      title: "Phone",
      details: ["+254 712 345 678", "+254 787 654 321"],
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: FiMail,
      title: "Email",
      details: ["info@elitefitness.com", "support@elitefitness.com"],
      color: "from-primary to-red-600",
    },
    {
      icon: FiMapPin,
      title: "Location",
      details: ["123 Fitness Street", "Nairobi, Kenya"],
      color: "from-green-600 to-emerald-600",
    },
    {
      icon: FiClock,
      title: "Working Hours",
      details: ["Daily: 5:00 AM - 11:00 PM", "Weekends: 6:00 AM - 10:00 PM"],
      color: "from-yellow-600 to-amber-600",
    },
  ];

  return (
    <section
      id="contact"
      className="pt-24 pb-20 bg-secondary relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#FF0000,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#FF0000,_transparent_55%)] opacity-5"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
            Get In Touch
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent"></div>
          </h2>
          <p className="text-gray-400 text-[15px] sm:text-lg">
            Have questions? We're here to help and answer any question you might
            have.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-7">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative">
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-zinc-900/50 text-white text-sm sm:text-base rounded-xl px-4 py-3 outline-none transition-all
                             border border-zinc-700 focus:border-primary"
                    placeholder="Your Name"
                  />
                  {focusedField === "name" && (
                    <motion.div
                      layoutId="focus-border"
                      className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-zinc-900/50 text-white text-sm sm:text-base rounded-xl px-4 py-3 outline-none transition-all
                             border border-zinc-700 focus:border-primary"
                    placeholder="Your Email"
                  />
                  {focusedField === "email" && (
                    <motion.div
                      layoutId="focus-border"
                      className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div className="relative">
                <motion.input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-zinc-900/50 text-white text-sm sm:text-base rounded-xl px-4 py-3 outline-none transition-all
                           border border-zinc-700 focus:border-primary"
                  placeholder="Your Phone"
                />
                {focusedField === "phone" && (
                  <motion.div
                    layoutId="focus-border"
                    className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>

              {/* Subject Field */}
              <div className="relative">
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-zinc-900/50 text-white text-sm sm:text-base rounded-xl px-4 py-3 outline-none transition-all
                           border border-zinc-700 focus:border-primary"
                  placeholder="Subject"
                />
                {focusedField === "subject" && (
                  <motion.div
                    layoutId="focus-border"
                    className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={8}
                  className="w-full bg-zinc-900/50 text-white text-sm sm:text-base rounded-xl px-4 py-3 outline-none transition-all
                           border border-zinc-700 focus:border-primary resize-none"
                  placeholder="Your Message"
                />
                {focusedField === "message" && (
                  <motion.div
                    layoutId="focus-border"
                    className="absolute inset-0 rounded-xl  pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-red-600 text-white py-4 rounded-xl
                         font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300
                         flex items-center justify-center gap-2"
              >
                <span className="text-sm sm:text-base">Send Message</span>
                <BsSend className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className=" grid grid-cols-2 gap-4 sm:gap-5">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-4 sm:px-5 sm:py-4 "
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${info.color} 
                                p-0.5 transform rotate-3 transition-transform duration-300`}
                  >
                    <div
                      className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center
                                transform -rotate-3 transition-transform duration-300"
                    >
                      <info.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-gray-400 text-[11px] sm:text-sm"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl aspect-video col-span-2"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818396737371!2d36.81796!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMTEuMCJTIDM2wrA0OScwNC43IkU!5e0!3m2!1sen!2sus!4v1644856123456!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen=""
                loading="lazy"
                title="location map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

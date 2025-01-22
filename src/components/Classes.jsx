import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDumbbell, FaFire, FaYinYang } from "react-icons/fa";
import { SiAudiomack } from "react-icons/si";
import { GiBoxingGlove } from "react-icons/gi";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { BsClockFill, BsPeopleFill } from "react-icons/bs";

const Classes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const classes = [
    {
      id: 1,
      title: "Strength Training & Body Building",
      icon: FaDumbbell,
      description:
        "Build muscle, increase strength, and transform your physique with our comprehensive strength training program.",
      color: "from-blue-600 to-cyan-600",
      image: "/images/strength.jpg",
      schedule: [
        { day: "Monday & Thursday", time: "6:00 AM - 8:00 AM" },
        { day: "Tuesday & Friday", time: "5:00 PM - 7:00 PM" },
        { day: "Saturday", time: "8:00 AM - 10:00 AM" },
      ],
      trainer: "Alex Rodriguez",
      maxCapacity: 12,
      level: "Beginner to Advanced",
      benefits: [
        "Muscle Growth",
        "Strength Gains",
        "Expert Guidance",
        "Form Correction",
      ],
    },
    {
      id: 2,
      title: "HIIT Blast Workout",
      icon: FaFire,
      description:
        "Intense, calorie-burning sessions that combine cardio and strength exercises for maximum results.",
      color: "from-red-600 to-orange-600",
      image: "/images/hiits.jpg",
      schedule: [
        { day: "Monday & Wednesday", time: "7:00 AM - 8:00 AM" },
        { day: "Tuesday & Thursday", time: "6:00 PM - 7:00 PM" },
        { day: "Saturday", time: "9:00 AM - 10:00 AM" },
      ],
      trainer: "Sarah Chen",
      maxCapacity: 15,
      level: "Intermediate to Advanced",
      benefits: ["Fat Burning", "Endurance", "Quick Results", "High Energy"],
    },
    {
      id: 3,
      title: "Yoga & Wellness Flow",
      icon: FaYinYang,
      description:
        "Find balance, flexibility, and inner peace with our expert-led yoga and wellness sessions.",
      color: "from-green-600 to-emerald-600",
      image: "/images/yoga.jpg",
      schedule: [
        { day: "Tuesday & Thursday", time: "8:00 AM - 9:30 AM" },
        { day: "Wednesday & Friday", time: "6:00 PM - 7:30 PM" },
        { day: "Sunday", time: "8:00 AM - 9:30 AM" },
      ],
      trainer: "Maya Patel",
      maxCapacity: 20,
      level: "All Levels",
      benefits: ["Flexibility", "Mental Peace", "Core Strength", "Balance"],
    },
    {
      id: 4,
      title: "Zumba Dance Classes",
      icon: SiAudiomack,
      description:
        "Dance your way to fitness with high-energy, Latin-inspired choreography and music.",
      color: "from-purple-600 to-pink-600",
      image: "/images/zumba.jpg",
      schedule: [
        { day: "Monday & Wednesday", time: "6:00 PM - 7:00 PM" },
        { day: "Thursday", time: "7:00 PM - 8:00 PM" },
        { day: "Saturday", time: "10:00 AM - 11:00 AM" },
      ],
      trainer: "Isabella Martinez",
      maxCapacity: 25,
      level: "All Levels",
      benefits: ["Cardio", "Dance Skills", "Fun Workout", "Community"],
    },
    {
      id: 5,
      title: "Elite Boxing",
      icon: GiBoxingGlove,
      description:
        "Master the art of boxing with professional training, conditioning, and sparring sessions.",
      color: "from-yellow-600 to-amber-600",
      image: "/images/boxing.jpg",
      schedule: [
        { day: "Monday & Wednesday", time: "5:00 PM - 6:30 PM" },
        { day: "Tuesday & Thursday", time: "7:00 AM - 8:30 AM" },
        { day: "Saturday", time: "11:00 AM - 12:30 PM" },
      ],
      trainer: "Mike 'Thunder' Thompson",
      maxCapacity: 15,
      level: "All Levels",
      benefits: ["Self Defense", "Power", "Agility", "Confidence"],
    },
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveIndex(
      (prevIndex) =>
        (prevIndex + newDirection + classes.length) % classes.length
    );
  };

  const activeClass = classes[activeIndex];

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_50%)] opacity-5"
        style={{ "--tw-gradient-from": activeClass.color.split(" ")[1] }}
      ></div>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from),_transparent_55%)] opacity-5"
        style={{ "--tw-gradient-from": activeClass.color.split(" ")[1] }}
      ></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
            Elite Training Programs
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent"></div>
          </h2>
          <p className="text-gray-400 text-[15px] sm:text-lg">
            Discover your perfect fitness journey with our diverse range of
            expert-led classes
          </p>
        </motion.div>

        {/* Main Carousel Section */}
        <div className="relative pb-20 sm:pb-12 mb-10">
          <div className="relative h-[700px] sm:h-[600px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 100, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Image */}
                  <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent z-10"></div>
                    <img
                      src={activeClass.image}
                      alt={activeClass.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-6 z-20 flex flex-col justify-between">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${activeClass.color} 
                                  p-0.5`}
                      >
                        <div className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center">
                          <activeClass.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                      </motion.div>

                      <div>
                        <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                          {activeClass.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 mb-4">
                          with {activeClass.trainer}
                        </p>

                        {/* Benefits as tags */}
                        <div className="flex flex-wrap gap-2">
                          {activeClass.benefits.map((benefit, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                              className={`inline-flex px-3 py-1 rounded-lg text-[11px] sm:text-xs font-medium
                                        bg-gradient-to-r ${activeClass.color} bg-opacity-20 text-white
                                        backdrop-blur-sm border border-white/10`}
                            >
                              {benefit}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="space-y-4 md:space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6"
                    >
                      <h4 className="text-white text-sm md:text-base font-semibold mb-4">
                        About This Class
                      </h4>
                      <p className="text-gray-400 text-sm md:text-base">{activeClass.description}</p>
                    </motion.div>

                    {/* Schedule */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <BsClockFill className="text-primary" />
                        <h4 className="text-white text-sm md:text-base font-semibold">
                          Class Schedule
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {activeClass.schedule.map((slot, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-sm md:text-base"
                          >
                            <span className="text-gray-400">{slot.day}</span>
                            <span className="text-primary font-medium">
                              {slot.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Class Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 text-sm md:text-base "
                    >
                      <div className="flex items-center gap-2 ">
                        <BsPeopleFill className="text-primary" />
                        <span className="text-gray-400">Max Capacity:</span>
                        <span className="text-white">
                          {activeClass.maxCapacity}
                        </span>
                      </div>
                      <div className="text-gray-400">
                        Level:{" "}
                        <span className="text-white">{activeClass.level}</span>
                      </div>
                    </motion.div>

                    {/* Join Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-gradient-to-r ${activeClass.color} text-white text-sm md:text-base px-6 py-3 rounded-xl
                                font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      Join This Class
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons - Adjusted positioning */}
            <div className="absolute -bottom-56 sm:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8 z-30 w-full max-w-md mx-auto justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-800 backdrop-blur-sm flex items-center justify-center
                         text-white hover:bg-primary transition-colors shadow-lg shadow-black/20
                         border border-white/10"
              >
                <IoArrowBack className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Class Indicators - Adjusted for mobile */}
              <div className="flex gap-2 px-3 sm:px-4 py-2 rounded-full bg-zinc-800/80 backdrop-blur-sm">
                {classes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-4 sm:w-6 bg-primary"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-800 backdrop-blur-sm flex items-center justify-center
                         text-white hover:bg-primary transition-colors shadow-lg shadow-black/20
                         border border-white/10"
              >
                <IoArrowForward className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom CTA - Adjusted spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-44 md:mt-10 relative z-20"
        >
          <p className="text-gray-400 text-sm md:text-base mb-6">
            Can't find what you're looking for? We also offer personalized
            training sessions.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white text-sm md:text-base px-8 py-3 rounded-xl font-semibold
                     hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
          >
            Schedule a Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Classes;

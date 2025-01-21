import React from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Trophy,
  Target,
  Users,
  Clock,
  Zap,
  Shield,
  HeartPulse,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Dumbbell,
      title: "Premium Equipment",
      description: "State-of-the-art fitness equipment for maximum performance",
      color: "from-red-600 to-orange-600",
    },
    {
      icon: Trophy,
      title: "Expert Coaching",
      description:
        "Professional certified trainers to guide your fitness journey",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: Target,
      title: "Custom Programs",
      description: "Personalized workout plans tailored to your goals",
      color: "from-green-600 to-emerald-600",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join a motivated community that inspires success",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Train anytime with round-the-clock facility access",
      color: "from-yellow-600 to-amber-600",
    },
    {
      icon: Zap,
      title: "HIIT Classes",
      description: "High-intensity interval training for rapid results",
      color: "from-indigo-600 to-violet-600",
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Clean and secure facilities for peace of mind",
      color: "from-teal-600 to-cyan-600",
    },
    {
      icon: HeartPulse,
      title: "Health Tracking",
      description: "Monitor your progress with advanced metrics",
      color: "from-rose-600 to-pink-600",
    },
  ];

  return (
    <section className="py-20 bg-zinc-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#FF0000,_transparent_50%)] opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#FF0000,_transparent_50%)] opacity-10"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
              Why ChooseElite Fitness?
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent"></div>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Experience a new level of fitness with our premium facilities and
              expert guidance
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 overflow-hidden"
            >
              {/* Gradient Border */}
              <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 z-0"></div>

              {/* Content Container */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div className="mb-4 relative">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} 
                                p-0.5 transform rotate-3 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <div
                      className="w-full h-full bg-zinc-900 rounded-[7px] flex items-center justify-center
                                 transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"
                    >
                      <feature.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-open font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} 
                              opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300 rounded-full`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-zinc-800/50 via-zinc-800/30 to-zinc-800/50 
                     backdrop-blur-sm rounded-2xl p-8 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Fitness Journey?
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-2xl mx-auto">
              Join Elite Fitness today and experience the difference our premium
              facilities and expert guidance can make in your fitness journey.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-xl font-semibold
                       hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
            >
              Join Us Now
            </motion.button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

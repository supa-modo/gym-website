import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaDumbbell, FaRegCheckCircle } from "react-icons/fa";
import { BsCheck2, BsCheckLg, BsLightningChargeFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";

const Pricing = () => {
  const [period, setPeriod] = useState("monthly"); // "weekly", "monthly", "yearly"

  const periods = {
    weekly: { label: "Weekly", multiplier: 1 },
    monthly: { label: "Monthly", multiplier: 3.5 },
    yearly: { label: "Yearly", multiplier: 35 },
  };

  const plans = [
    {
      name: "Beginner Plan",
      icon: FaDumbbell,
      price: 25,
      color: "from-blue-600 to-cyan-600",
      features: [
        "Access to gym equipment",
        "Basic fitness assessment",
        "2 Group classes per week",
        "Locker room access",
        "Fitness tracking app",
        "Water dispenser access",
      ],
      popular: false,
    },
    {
      name: "Premium Plan",
      icon: BsLightningChargeFill,
      price: 45,
      color: "from-primary to-red-600",
      features: [
        "All Beginner features",
        "Unlimited group classes",
        "3 Personal trainer sessions",
        "Nutrition consultation",
        "Access to spa facilities",
        "Priority class booking",
        "Towel service",
        "Smoothie bar discount",
      ],
      popular: true,
    },
    {
      name: "Elite Plan",
      icon: FaCrown,
      price: 75,
      color: "from-yellow-600 to-amber-600",
      features: [
        "All Premium features",
        "Unlimited PT sessions",
        "Custom meal plans",
        "Recovery sessions",
        "VIP member events",
        "24/7 support",
        "Guest passes",
        "Partner gym access",
        "Exclusive workshops",
      ],
      popular: false,
    },
  ];

  const calculatePrice = (basePrice, selectedPeriod) => {
    const price = basePrice * periods[selectedPeriod].multiplier;
    return price % 1 === 0 ? price : price.toFixed(1);
  };

  return (
    <section id="pricing" className="pt-24 pb-20 bg-secondary/40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#FF0000,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#FF0000,_transparent_55%)] opacity-5"></div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
            Choose Your Journey
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent"></div>
          </h2>
          <p className="text-gray-400 text-[15px] sm:text-lg mb-8">
            Flexible plans designed to fit your fitness goals and lifestyle
          </p>

          {/* Period Toggle */}
          <div className="inline-flex items-center p-1 bg-zinc-800/50 backdrop-blur-sm rounded-xl">
            {Object.keys(periods).map((key) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPeriod(key)}
                className={`relative px-6 py-2 text-sm sm:text-base rounded-lg transition-all duration-300
                          ${
                            period === key
                              ? "text-white"
                              : "text-gray-400 hover:text-gray-300"
                          }`}
              >
                {period === key && (
                  <motion.div
                    layoutId="periodBubble"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{periods[key].label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-7 sm:px-0 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl text-sm sm:text-base p-8 
                        ${plan.popular ? "ring-2 ring-primary" : ""}
                        hover:transform hover:scale-[1.02] transition-all duration-300`}
            >
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-red-600 
                              text-white text-[11px] sm:text-[13px] font-semibold px-4 py-1 rounded-full"
                >
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} 
                              p-0.5 transform rotate-3 group-hover:rotate-6 transition-transform duration-300`}
                >
                  <div
                    className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center
                               transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"
                  >
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {plan.name}
                  </h3>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    ${calculatePrice(plan.price, period)}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{period.slice(0, -2)}
                  </span>
                </div>
                <p className="text-center text-sm text-gray-400 mt-2">
                  {period === "yearly" ? "Save 15% with annual billing" : ""}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 sm:space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1 + idx * 0.1,
                    }}
                    className="flex items-center text-gray-300 text-sm sm:text-base"
                  >
                    {/* Updated Icon Styling */}
                    <div
                      className={`w-5 h-5 mr-4 flex items-center justify-center`}
                    >
                      <BsCheckLg className="w-4 h-4 text-amber-500" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r ${plan.color} text-white py-4 rounded-xl font-semibold
                          hover:shadow-lg hover:shadow-primary/20 transition-all duration-300`}
              >
                Get Started Now
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-gray-400 text-[13px] sm:text-base">
            All plans include access to our mobile app, free WiFi, and secure
            parking.
            <br />
            Not sure which plan to choose? <br />
            Talk to us - +254712345678
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

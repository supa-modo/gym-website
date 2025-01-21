import React, { useState } from "react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Beginner Plan",
      price: isYearly ? "100" : "10",
      features: [
        "Access to gym equipment",
        "Basic fitness assessment",
        "Group classes",
        "Locker room access",
      ],
    },
    {
      name: "Premium Plan",
      price: isYearly ? "150" : "15",
      features: [
        "All Beginner features",
        "Personal trainer sessions",
        "Nutrition consultation",
        "Access to spa facilities",
        "Priority booking",
      ],
    },
    {
      name: "Elite Plan",
      price: isYearly ? "200" : "20",
      features: [
        "All Premium features",
        "Unlimited PT sessions",
        "Custom meal plans",
        "Recovery sessions",
        "VIP member events",
        "24/7 support",
      ],
    },
  ];

  return (
    <section className="py-20 bg-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">JOIN TODAY</h2>
          <div className="flex justify-center items-center space-x-4">
            <span
              className={`text-lg ${
                !isYearly ? "text-white" : "text-gray-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-700"
            >
              <span
                className={`${
                  isYearly ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
            <span
              className={`text-lg ${isYearly ? "text-white" : "text-gray-400"}`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-zinc-900 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary">
                  ${plan.price}
                </span>
                <span className="text-gray-400">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 text-primary mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

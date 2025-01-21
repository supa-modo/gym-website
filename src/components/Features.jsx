import React, { useState, useEffect } from "react";

const Features = () => {
  const [isVisible, setIsVisible] = useState({});

  const features = [
    { title: "Years of Service", count: "5+", desc: "Experience" },
    { title: "Certified Trainers", count: "10+", desc: "Professionals" },
    { title: "Happy Members", count: "786+", desc: "Satisfied Clients" },
    { title: "Customer Satisfaction", count: "95%", desc: "Success Rate" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isElementVisible = rect.top <= window.innerHeight * 0.8;
        setIsVisible((prev) => ({
          ...prev,
          [element.id]: isElementVisible,
        }));
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              id={`feature-${index}`}
              className={`animate-on-scroll p-8 bg-zinc-800 rounded-lg transform transition-all duration-500 hover:scale-105 ${
                isVisible[`feature-${index}`]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">
                {feature.count}
              </h3>
              <h4 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h4>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

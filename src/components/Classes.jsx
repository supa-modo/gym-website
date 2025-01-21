import React, { useState, useEffect } from "react";

const Classes = () => {
  const [isVisible, setIsVisible] = useState({});

  const classes = [
    {
      title: "Strength Training",
      description: "Build muscle and increase strength",
      image: "/images/strength.jpg",
    },
    {
      title: "HIIT Workouts",
      description: "High-intensity interval training",
      image: "/images/hiit.jpg",
    },
    {
      title: "Yoga & Wellness",
      description: "Mind and body balance",
      image: "/images/yoga.jpg",
    },
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
    <section className="py-20 bg-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Our Premium Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <div
              key={index}
              id={`class-${index}`}
              className={`animate-on-scroll relative group overflow-hidden rounded-lg ${
                isVisible[`class-${index}`]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {classItem.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{classItem.description}</p>
                  <button className="text-primary font-semibold group-hover:text-red-400 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classes;

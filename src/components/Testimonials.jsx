import React, { useState } from "react";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Kerry Rohan",
      role: "Member since 2023",
      text: "Joining Elite Fitness was the best decision I've made. The trainers are exceptional and the community is incredibly supportive.",
      image: "/images/testimonial1.jpg",
    },
    {
      name: "Michael Chen",
      role: "Member since 2022",
      text: "The facilities are state-of-the-art and the personalized training programs have helped me achieve results I never thought possible.",
      image: "/images/testimonial2.jpg",
    },
    {
      name: "Emma Williams",
      role: "Member since 2024",
      text: "From the moment you walk in, you feel the energy. This isn't just a gym, it's a transformation hub.",
      image: "/images/testimonial3.jpg",
    },
  ];

  return (
    <section className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          What Our Members Say
        </h2>
        <div className="relative">
          <div className="flex overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 transition-transform duration-500 transform ${
                  index === activeTestimonial
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              >
                <div className="max-w-3xl mx-auto text-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-6 object-cover"
                  />
                  <p className="text-xl mb-6 text-gray-300">
                    "{testimonial.text}"
                  </p>
                  <h4 className="font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeTestimonial ? "bg-primary" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

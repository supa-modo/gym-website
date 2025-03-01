import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Classes from "../components/Classes";
import Pricing from "../components/Pricing";
import ContactForm from "../components/ContactForm";

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <Classes />
      <Pricing />
      <ContactForm />
    </main>
  );
};

export default Home;

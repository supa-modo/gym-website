import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Classes from "./components/Classes";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import StoreSection from "./components/Store";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Classes />
      <Pricing />
      <ContactForm />
      <Footer />
    <StoreSection />
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import StoreSection from "./pages/Store";

const App = () => {
  return (
      <Router>
        <div className="bg-secondary min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<StoreSection />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
};

export default App;

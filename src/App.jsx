import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="bg-secondary min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

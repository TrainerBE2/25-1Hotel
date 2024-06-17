import { Routes, Route } from "react-router-dom";
import NavbarComp from "./component/dashboard/NavbarComp";
import Hero from "./component/dashboard/Hero";
import Footer from "./component/dashboard/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import Pages from "./pages/Pages";

function App() {
  return (
    <div>
      <NavbarComp />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/pages" element={<Pages />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

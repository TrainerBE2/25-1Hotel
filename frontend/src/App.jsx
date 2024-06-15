import { Routes, Route } from "react-router-dom"; 
import Navbar from "./component/NavbarComponent";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import Pages from "./pages/Pages";

function App() {
  return <div>
    <Navbar />
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/about" Component={About}/>
      <Route path="/service" Component={Service}/>
      <Route path="/contact" Component={Contact}/>
      <Route path="/Rooms" Component={Rooms}/>
      <Route path="/Pages" Component={Pages}/>
    </Routes>
    <Footer />
  </div>
}

export default App;

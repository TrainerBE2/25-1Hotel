import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./component/dashboard/NavbarComp";
import Hero from "./component/dashboard/Hero";
import Footer from "./component/dashboard/Footer";
import { GlobalProvider } from "./context/GlobalProvider";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import Pages from "./pages/Pages";
import Layout from "./Layout/layout";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Hero />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/service"
            element={
              <Layout>
                <Service />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/rooms"
            element={
              <Layout>
                <Rooms />
              </Layout>
            }
          />
          <Route
            path="/pages"
            element={
              <Layout>
                <Pages />
              </Layout>
            }
          />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;

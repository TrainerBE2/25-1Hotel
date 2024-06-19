import { eventListeners } from "@popperjs/core";
import React, { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom"; // Impor Link dari react-router-dom untuk navigasi internal // Pastikan gambar logo diimpor dengan benar
import MainComponent from "../../assets/js/main";

const NavbarComp = () => {
  const location = useLocation();
  const handleReload = (path) => {
    window.location.reload();
    Navigate(path);
  };
  return (
    <>
      <MainComponent />
      <div id="preloder">
        <div className="loader"></div>
      </div>
      <div className="offcanvas-menu-overlay"></div>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <ul className="header__top__widget">
                  <li>
                    <span className="icon_pin_alt"></span> 96 Ernser Vista Suite
                    437, NY, US
                  </li>
                  <li>
                    <span className="icon_phone"></span> (123) 456-78-910
                  </li>
                </ul>
              </div>
              <div className="col-lg-5">
                <div className="header__top__right">
                  <div className="header__top__auth">
                    <ul>
                      <li>
                        <Link to="#">Login</Link>
                      </li>
                      <li>
                        <Link to="#">Register</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="header__top__language">
                    <img src="img/lan.png" alt="Language" />
                    <span>English</span>
                    <i className="fa fa-angle-down"></i>
                    <ul>
                      <li>English</li>
                      <li>Bangla</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__nav__option">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="header__logo">
                  <Link
                    to="/"
                    onClick={() => {
                      handleReload("/");
                    }}
                  >
                    <img src="/img/logo-rara.png" alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="header__nav">
                  <nav className="header__menu">
                    <ul className="menu__class">
                      <li className="active">
                        <Link
                          to="/"
                          onClick={() => {
                            handleReload("/");
                          }}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/rooms"}
                          onClick={() => {
                            handleReload("/rooms");
                          }}
                        >
                          Rooms
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          onClick={() => {
                            handleReload("/about");
                          }}
                        >
                          About Us
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/pages"
                          onClick={() => {
                            handleReload("/pages");
                          }}
                        >
                          Pages
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="/about">About Us</Link>
                          </li>
                          <li>
                            <Link to="/room-details">Room Details</Link>
                          </li>
                          <li>
                            <Link to="/blog-details">Blog Details</Link>
                          </li>
                        </ul>
                      </li> */}
                      {/* <li>
                        <Link to="/blog">News</Link>
                      </li> */}
                      <li>
                        <Link
                          to="/contact"
                          onClick={() => {
                            handleReload("/contact");
                          }}
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="header__nav__widget">
                    <Link to="#">
                      Book Now <span className="arrow_right"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="canvas__open">
              <span className="fa fa-bars"></span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarComp;

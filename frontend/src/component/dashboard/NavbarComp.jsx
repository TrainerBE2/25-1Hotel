import React from "react";
import { Link } from "react-router-dom"; // Impor Link dari react-router-dom untuk navigasi internal // Pastikan gambar logo diimpor dengan benar

const NavbarComp = () => {
  return (
    <>
      <div id="preloder">
        <div className="loader"></div>
      </div>
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__logo">
          <Link to="/">
            <img src="/img/logo.png" alt="Logo" />
          </Link>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__btn__widget">
          <Link to="#">
            Book Now <span className="arrow_right"></span>
          </Link>
        </div>
        <div className="offcanvas__widget">
          <ul>
            <li>
              <span className="icon_pin_alt"></span> 96 Ernser Vista Suite 437,
              NY, US
            </li>
            <li>
              <span className="icon_phone"></span> (123) 456-78-910
            </li>
          </ul>
        </div>
        <div className="offcanvas__language">
          <img src="img/lan.png" alt="Language" />
          <span>English</span>
          <i className="fa fa-angle-down"></i>
          <ul>
            <li>English</li>
            <li>Bangla</li>
          </ul>
        </div>
        <div className="offcanvas__auth">
          <ul>
            <li>
              <Link to="#">Login</Link>
            </li>
            <li>
              <Link to="#">Register</Link>
            </li>
          </ul>
        </div>
      </div>
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
                  <Link to="/">
                    <img src="/img/logo.png" alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="header__nav">
                  <nav className="header__menu">
                    <ul className="menu__class">
                      <li className="active">
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/rooms">Rooms</Link>
                      </li>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="#">Pages</Link>
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
                      </li>
                      <li>
                        <Link to="/blog">News</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
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

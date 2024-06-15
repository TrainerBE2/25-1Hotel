import React, { useState } from "react";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { isActive } from "../utils/helper";

const NavbarComponent = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  return (
    <>
      <div className="container-fluid bg-light px-0">
        <Row className="gx-0">
          <Col lg={3} className="bg-dark d-none d-lg-block">
            <Navbar
              bg="dark"
              variant="dark"
              className="w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <Navbar.Brand href="/">
                <h1 className="m-0 text-primary text-uppercase">SIMO HOTEL</h1>
              </Navbar.Brand>
            </Navbar>
          </Col>
          <Col lg={9}>
            <Row className="gx-0 bg-white d-none d-lg-flex">
              <Col lg={7} className="px-5 text-start">
                <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                  <i className="fa fa-envelope text-primary me-2"></i>
                  <p className="mb-0">herepfc@gmail.com</p>
                </div>
                <div className="h-100 d-inline-flex align-items-center py-2">
                  <i className="fa fa-phone-alt text-primary me-2"></i>
                  <p className="mb-0">+012 345 6789</p>
                </div>
              </Col>
              <Col lg={5} className="px-5 text-end">
                <div className="d-inline-flex align-items-center py-2">
                  <a className="me-3" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="me-3" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="me-3" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="me-3" href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </Col>
            </Row>
            <Navbar expand="lg" bg="dark" variant="dark" className="p-3 p-lg-0">
              <Navbar.Brand href="#home" className="d-block d-lg-none">
                <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarCollapse" />
              <Navbar.Collapse
                id="navbarCollapse"
                className="justify-content-between"
              >
                <Nav className="mr-auto py-0">
                  <Nav.Link as={NavLink} to="/" className={isActive("/")}>
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/about"
                    className={isActive("/about")}
                  >
                    About
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/service"
                    className={isActive("/service")}
                  >
                    Services
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/rooms"
                    className={isActive("/rooms")}
                  >
                    Rooms
                  </Nav.Link>
                  <NavDropdown title="Pages" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      as={NavLink}
                      to="/booking"
                      className={isActive("/booking")}
                    >
                      Booking
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to="/team"
                      className={isActive("/team")}
                    >
                      Our Team
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to="/testimonial"
                      className={isActive("/testimonial")}
                    >
                      Testimonial
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <a
                  href="https://htmlcodex.com/hotel-html-template-pro"
                  className="btn btn-primary rounded-0 py-4 px-md-5 d-none d-lg-block"
                >
                  Login<i className="fa fa-arrow-right ms-3"></i>
                </a>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NavbarComponent;

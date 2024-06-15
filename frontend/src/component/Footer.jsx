import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from "react-bootstrap";

const Footer = () => {
  return (
    <div
      className="container-fluid bg-dark text-light footer wow fadeIn"
      data-wow-delay="0.1s"
    >
      <Container className="pb-5">
        <Row className="g-5">
          <Col md={6} lg={4}>
            <div className="bg-primary rounded p-4">
              <a href="index.html">
                <h1 className="text-white text-uppercase mb-3">Hotelier</h1>
              </a>
              <p className="text-white mb-0">
                Download{" "}
                <a
                  className="text-dark fw-medium"
                  href="https://htmlcodex.com/hotel-html-template-pro"
                >
                  Hotelier – Premium Version
                </a>
                , build a professional website for your hotel business and grab
                the attention of new visitors upon your site’s launch.
              </p>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <h6 className="section-title text-start text-primary text-uppercase mb-4">
              Contact
            </h6>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3"></i>123 Street, New York,
              USA
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3"></i>+012 345 67890
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3"></i>info@example.com
            </p>
            <div className="d-flex pt-2">
              <Button variant="outline-light" className="btn-social me-3">
                <i className="fab fa-twitter"></i>
              </Button>
              <Button variant="outline-light" className="btn-social me-3">
                <i className="fab fa-facebook-f"></i>
              </Button>
              <Button variant="outline-light" className="btn-social me-3">
                <i className="fab fa-youtube"></i>
              </Button>
              <Button variant="outline-light" className="btn-social">
                <i className="fab fa-linkedin-in"></i>
              </Button>
            </div>
          </Col>
          <Col lg={5} md={12}>
            <Row className="gy-5 g-4">
              <Col md={6}>
                <h6 className="section-title text-start text-primary text-uppercase mb-4">
                  Company
                </h6>
                <Nav className="flex-column">
                  <Nav.Link href="#" className="btn btn-link">
                    About Us
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Contact Us
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Privacy Policy
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Terms & Condition
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Support
                  </Nav.Link>
                </Nav>
              </Col>
              <Col md={6}>
                <h6 className="section-title text-start text-primary text-uppercase mb-4">
                  Services
                </h6>
                <Nav className="flex-column">
                  <Nav.Link href="#" className="btn btn-link">
                    Food & Restaurant
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Spa & Fitness
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Sports & Gaming
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Event & Party
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    GYM & Yoga
                  </Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="copyright">
          <Row>
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              &copy;{" "}
              <a className="border-bottom" href="#">
                Your Site Name
              </a>
              , All Right Reserved.
              <br />
              Designed By{" "}
              <a className="border-bottom" href="https://htmlcodex.com">
                HTML Codex
              </a>
              <br />
              Distributed By:{" "}
              <a
                className="border-bottom"
                href="https://themewagon.com"
                target="_blank"
              >
                ThemeWagon
              </a>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="footer-menu">
                <Nav className="flex-column">
                  <Nav.Link href="#" className="btn btn-link">
                    Home
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Cookies
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    Help
                  </Nav.Link>
                  <Nav.Link href="#" className="btn btn-link">
                    FQAs
                  </Nav.Link>
                </Nav>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

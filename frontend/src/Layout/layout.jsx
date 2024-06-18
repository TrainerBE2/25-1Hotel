import React, { Children } from "react";
import NavbarComp from "../component/dashboard/NavbarComp";
import Footer from "../component/dashboard/Footer";
import PropTypes from "prop-types";

const Layout = (props) => {
  return (
    <>
      <NavbarComp />
      {props.children}
      <Footer />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;

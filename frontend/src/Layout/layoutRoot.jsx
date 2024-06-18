import React, { Children } from "react";
import NavbarComp from "../component/dashboard/NavbarComp";
import Footer from "../component/dashboard/Footer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const loginRoot = (props) => {
  if (Cookies.get("token") !== undefined) {
    return Navigate("/");
  } else if (Cookies.get("token")) {
    return props.children;
  }
};
loginRoot.propTypes = {
  children: PropTypes.node.isRequired,
};
export default loginRoot;

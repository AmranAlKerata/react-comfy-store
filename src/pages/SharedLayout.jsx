import React, { Fragment } from "react";
import { Navbar, Sidebar, Footer } from "../components";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default SharedLayout;

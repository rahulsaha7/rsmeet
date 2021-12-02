import React, { useState, useEffect } from "react";

import BlankDp from "../../Assets/image/blankDp.png";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";

import UserInfo from "../users/UserInfo";
import ProfileInfo from "../users/ProfileInfo";

import "./Dashboard.css";


const Dashboard = ({ authTokenValues }) => {
  const [Width, setWidth] = useState(window.screen.width);
  const [historyChnaged, sethistoryChnaged] = useState(false);
  const ChangeWidth = () => {
    setWidth(window.screen.width);
  };


  useEffect(() => {
    window.addEventListener("resize", ChangeWidth);
    return () => {
      window.removeEventListener("resize", ChangeWidth);
    };
  });

  // return Width < 576 ? (
  //   <MobileView
  //     authTokenValues={authTokenValues}
  //   />
  // ) : (
  //   <DesktopView />
  // );
return(
  <MobileView
      authTokenValues={authTokenValues}
    />
);
};

export default Dashboard;

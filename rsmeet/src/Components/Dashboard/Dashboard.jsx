import React, { useState, useEffect } from "react";

import BlankDp from "../../Assets/image/blankDp.png";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";

import "./Dashboard.css";

const Chatlist = [
  {
    img: BlankDp,
    name: "jhon Doe",
    time: "now",
  },
  {
    img: BlankDp,
    name: "jhon Doe",
    time: "9:30am",
  },
  {
    img: BlankDp,
    name: "jhon Doe",
    time: "2:07pm",
  },
  {
    img: BlankDp,
    name: "jhon Doe",
    time: "2:07pm",
  },
  {
    img: BlankDp,
    name: "jhon Doe",
    time: "2:07pm",
  },
  {
    img: BlankDp,
    name: "jhon Doe",
    time: "2:07pm",
  },
];

const Dashboard = () => {
  const [Width, setWidth] = useState(window.screen.width);

  const ChangeWidth = () => {
    setWidth(window.screen.width);
  };

  useEffect(() => {
    window.addEventListener("resize", ChangeWidth);
    return () => {
      window.removeEventListener("resize", ChangeWidth);
    };
  });

  return Width < 576 ? <MobileView Chatlist={Chatlist} /> : <DesktopView />;
};

export default Dashboard;

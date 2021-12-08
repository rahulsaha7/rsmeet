import React from "react";
import logo from "../../Assets/image/logoOne.svg.png";
import "./style.css";

const Header = ({ haderTitle, height, width }) => {
  return (
    <>
      <section className="d-flex flex-sm-row flex-column justify-content-sm-center align-items-center align-items-center h-100 w-100">
        <figure
          className="logoLogin "
          style={{
            height: `${height}`,
            width: `${width}`,
          }}
        >
          <img src={logo} alt="LOGO" />
        </figure>

        <section className="title px-4 w-100">
          <h3 className="text-break">RSMEET</h3>
          <h4 className="ms-3 text-center text-break">Create Confidence</h4>
        </section>
      </section>

      <div className="SigninBanner mt-5">
        <p className="text-center word-break pt-2">{haderTitle}</p>
      </div>
    </>
  );
};

export default Header;

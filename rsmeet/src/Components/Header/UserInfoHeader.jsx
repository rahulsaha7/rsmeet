import React from "react";
import { useParams } from "react-router";
import BlankDp from "../../Assets/image/blankDp.png";
import { AiOutlineMore } from "react-icons/ai";


const UserInfoHeader = ({ modalDisplay, setmodalDisplay,name,status,dp }) => {
  const {username} = useParams();

  

  return (
    <>
      <header className="UserInfoHeader position-relative ">
        <div className="d-flex flex-column justify-content-center align-items-center position-absolute bottom-0 py-2 px-2 w-100">
          <section className="profileImage py-2 mb-0">
            <figure style={{ height: "50px", width: "50px" }}>
              <img
                src={dp}
                alt="dp"
              />
            </figure>

            <span
              className="position-absolute onlineStatus"
              style={{ top: "48px !important", left: "11pc !important" }}
            ></span>
          </section>
          <section className="d-flex flex-column align-items-center mt-3">
            <h6 style={{ color: "white" }}>{name}</h6>
            {/* It will show wither online or last active */}

            <span className="" style={{ color: "white" }}>
              {status ? "online" : "offline"}
            </span>
          </section>
        </div>
      </header>
    </>
  );
};

export default UserInfoHeader;

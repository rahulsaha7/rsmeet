import React from "react";

import BlankDp from "../../Assets/image/blankDp.png";
import { AiOutlineMore } from "react-icons/ai";

const UserHeader = ({ modalDisplay,setmodalDisplay }) => {
  return (
    <>
      <header className="headerContainer position-relative ">
        <div className="d-flex justify-content-between align-content-center position-absolute bottom-0 py-2 px-2 w-100">
          <section className="profileImage py-2">
            <figure style={{ height: "50px", width: "50px" }}>
              <img
                src={BlankDp}
                alt="BlankDp to visualize user for chooseing Profile Picture"
              />
            </figure>

            <span className="position-absolute onlineStatusShow"></span>
          </section>
          <section className="d-flex flex-column align-items-center mt-3">
            <h6 style={{ color: "white" }}>Jhon Doe</h6>
            {/* It will show wither online or last active */}
            <span className="" style={{ color: "white" }}>
              online
            </span>
          </section>

          <section
            className="mt-4 d-flex justify-content-center align-items-center"
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              background:
                " linear-gradient(180deg, #676882 0%, rgba(8, 9, 46, 0) 100%)",
            }}
            onClick={()=>{modalDisplay==="none" ? setmodalDisplay("block") : setmodalDisplay("none") }}
          >
            <AiOutlineMore />
          </section>
        </div>
      </header>
    </>
  );
};

export default UserHeader;

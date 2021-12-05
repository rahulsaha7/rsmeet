import React from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";

const DashHeader = ({ dp,id,count,onlineStatus }) => {
  let history = useHistory();
  const openProfileInfo = () =>{
    history.push(`/dashboard/home/profileinfo/${id}`);
  }

  return (
    <>
      <header className="headerContainer position-relative " style={{WebkitBackdropFilter:"blur(40px)"}} >
        <div className="d-flex justify-content-between align-content-center position-absolute bottom-0 py-2 px-2 w-100">
          <section className="profileImage py-2">
            <figure style={{ height: "50px", width: "50px" }}>
              <img
                src={dp}
                alt="BlankDp "
              />
            </figure>

            {onlineStatus ? <span className="position-absolute onlineStatusShow" ></span> : ''}
            {/* <span className="position-absolute onlineStatusShow"></span> */}
          </section>
          <section className="d-flex align-items-center mt-3">
            <h6 style={{ color: "white" }}>{count > 0  ? `${count} new message` : `no new message` }</h6>
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
            onClick = {()=>{openProfileInfo()}}
          >
            <AiOutlineMore />
          </section>
        </div>
      </header>
    </>
  );
};

export default DashHeader;

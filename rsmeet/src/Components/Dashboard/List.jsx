import React from "react";
const List = ({ dp, name, time }) => {
  return (
    <>
      <section className="Container userName-container">
        <div className="d-flex justify-content-between align-content-center py-2 px-2 w-100">
          <section className="profileImage py-2 d-flex align-items-center">
            <figure style={{ height: "50px", width: "50px" }}>
              <img
                src={dp}
                alt="BlankDp to visualize user for chooseing Profile Picture"
              />
            </figure>
            <span className="position-relative onlineStatus"></span>
          </section>
          <section className="d-flex align-items-center mt-3 flex-column ">
            <h6 style={{ color: "white" }}>{name}</h6>
            <p
              className="text-truncate"
              style={{ color: "#c4bebe", maxWidth: "100px" }}
            >
              last sent message will be displayed here
            </p>
          </section>

          <section
            className="mt-4 d-flex justify-content-center align-items-center"
            style={{ color: "white" }}
          >
            {time}
          </section>
        </div>
      </section>
    </>
  );
};

export default List;

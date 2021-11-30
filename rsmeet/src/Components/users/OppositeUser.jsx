import BlankDp from "../../Assets/image/blankDp.png";
const OppositeUser = ({msg,time}) => {
  return (
    <>
      <section className="profileImage py-2 d-flex flex-row">
        <div className="align-self-end">
          <figure className="mb-0" style={{ height: "30px", width: "30px" }}>
            <img
              src={BlankDp}
              alt="BlankDp to visualize user for chooseing Profile Picture"
            />
          </figure>
        </div>

        <section className="userMessage1 mx-2">
          <p
            className="d-flex flex mb-0"
            style={{ padding: "10px 10px 0 10px", fontSize: "0.9rem" }}
          >
            {msg}
          </p>
          <p
            className="d-flex flex-end mb-0 flex-row-reverse"
            style={{ padding: "0 10px 10px 10px", fontSize: "0.9rem" }}
          >
            {time}
          </p>
        </section>
      </section>
    </>
  );
};

export default OppositeUser;

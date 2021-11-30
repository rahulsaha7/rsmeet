const UserMsg = ({msg,time}) => {
  return (
    <>
      <section className="profileImage py-2 d-flex flex-row-reverse">
        <section className="userMessage2 mx-2">
          <p
            className="d-flex flex-row-reverse mb-0"
            style={{ padding: "10px 10px 0 10px", fontSize: "0.9rem" }}
          >
            {msg}
          </p>
          <p
            className="d-flex  mb-0"
            style={{ padding: "0 10px 10px 10px", fontSize: "0.9rem" }}
          >
            {time}
          </p>
        </section>
      </section>
    </>
  );
};

export default UserMsg;

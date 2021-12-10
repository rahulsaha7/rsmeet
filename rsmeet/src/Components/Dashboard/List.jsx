import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Badge from "./Badge";
import { getApiData } from "../../apis/api";
const List = ({
  dp,
  name,
  time,
  userId,
  authorId,
  username,
  count,
  u,
  uname,
  msg,
}) => {
  const [lastMessage, setlastMessage] = useState([]);
  const history = useHistory();
  const openChats = () => {
    history.push(
      `/dashboard/home/${username}/chatlist/nt/${userId}/${authorId}`
    );
  };

  const getLastMessage = () => {
    let url = "http://localhost:9000/login/lastMessage";
    let formData = new FormData();
    formData.append("username", username);
    formData.append("userid", userId);
    getApiData(formData, url)
      .then((output) => {
        if (output.error) {
          console.log(output);
        } else {
          setlastMessage(output.data.body);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLastMessage();
  }, []);

  return (
    <section
      className="Container userName-container"
      onClick={(e) => openChats()}
    >
      <div className="d-flex justify-content-between align-content-center py-2 px-2 w-100">
        <section className="profileImage py-2 d-flex align-items-center">
          <figure style={{ height: "50px", width: "50px" }}>
            <img src={dp} alt="dp" />
          </figure>
        </section>
        <section className="d-flex align-items-center mt-3 flex-column ">
          <h6 style={{ color: "white" }}>{name}</h6>
          <p
            className="text-truncate"
            style={{ color: "#c4bebe", maxWidth: "100px" }}
          >
            {lastMessage ? lastMessage : msg}
          </p>
        </section>

        <section
          className="mt-4 d-flex justify-content-center align-items-center"
          style={{ color: "white" }}
        >
          {time}
        </section>
      </div>
      {userId === u && username === uname ? <Badge count={count} /> : ""}
    </section>
  );
};

export default List;

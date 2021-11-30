import  { useEffect,useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { getApiData } from "../../apis/api";
const List = ({ dp, name, time, userId,authorId,username }) => {
  const history = useHistory();
  const [lastValues, setlastValues] = useState([]);
  let { url } = useRouteMatch();
  const openChats = () => {
    history.push(`/dashboard/home/${username}/chatlist/nt/${userId}/${authorId}`);
  };


  const showLastMessage = () =>{
    // let url = "http://localhost:9000/login/msglist";
    // let formData = new FormData();
    // formData.append("id", id);
    // getApiData(formData, url)
  }

  useEffect(() => {
    showLastMessage();
  }, []);

  return (
    <section
      className="Container userName-container"
      onClick={(e) => openChats()}
    >
      <div className="d-flex justify-content-between align-content-center py-2 px-2 w-100">
        <section className="profileImage py-2 d-flex align-items-center">
          <figure style={{ height: "50px", width: "50px" }}>
            <img
              src={dp}
              alt="dp"
            />
          </figure>
          <span className="position-relative onlinestatus"></span>
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
  );
};

export default List;

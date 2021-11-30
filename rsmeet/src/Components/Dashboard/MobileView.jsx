import { useEffect, useState } from "react";
import {
  Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import DashHeader from "../Header/DashHeader";
import List from "./List";
import Users from "../users/Users";
import { getApiData } from "../../apis/api";

import io from "socket.io-client";

const socket = io("http://localhost:9000");

const MobileView = () => {
  let { path } = useRouteMatch();
  let { username } = useParams();
  const [chatlist, setchatlist] = useState([]);
  const [authorId, setauthorId] = useState({
    id: "",
  });

  socket.on("newMsg", (payload) => {
    // socket.emit("create", payload);
    // if(payload){
    //   socket.emit('updated',payload);
    // }
  });

  const setAuthToken = () => {
    let url = "http://localhost:9000/login/chatlist";
    let formData = new FormData();

    formData.append("id", username);
    getApiData(formData, url)
      .then((output) => {
        console.log(output);
        if (output.error) {
          console.log(output);
          setchatlist(output.data);
        } else {
          setchatlist(output.data);
          setauthorId({ ...authorId, id: output.user });
        }
      })
      .catch((err) => {
        console.lof(err.message);
      });
  };

  useEffect(() => {
    setAuthToken();
  }, [path]);

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <main
            className="chatListContainer"
            style={{ width: "100vw", height: "100vh" }}
          >
            <section className="Dashboard-header">
              <DashHeader id={username} />
            </section>
            <section
              className="overflow-auto"
              style={{ height: "calc(100vh - 140px)" }}
            >
              <div className="listDivs">
                {chatlist?.map((chats, i) => (
                  <List
                    dp={chats.image}
                    name={chats.name}
                    key={i}
                    userId={chats._id}
                    authorId={authorId.id}
                    username={username}
                  />
                ))}
              </div>
            </section>
          </main>
        </Route>

       
      </Switch>
    </>
  );
};

export default MobileView;

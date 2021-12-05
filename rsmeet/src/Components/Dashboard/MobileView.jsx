import { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import DashHeader from "../Header/DashHeader";
import List from "./List";
import { getApiData } from "../../apis/api";
import useOnlineStatus from "@rehooks/online-status";

import io from "socket.io-client";

const socket = io("http://localhost:9000");

const MobileView = () => {
  const onlineStatus = useOnlineStatus();
  let { path } = useRouteMatch();
  let { username } = useParams();
  const [chatlist, setchatlist] = useState([]);
  const [authorId, setauthorId] = useState({
    id: "",
  });
  const [userInfo, setuserInfo] = useState({
    dp: "",
  });

  const [newMsg, setnewMsg] = useState({
    count: 0,
    user: "",
    uname: "",
  });

  socket.on("newMsg", (payload) => {
    console.log(payload.output);
    if (payload.output.updated) {
      let c = newMsg.count;
      c = c + 1;
      let u = payload.payload.author;
      setnewMsg({ count: c, user: u, uname: payload.output.username });
      // console.log(u);
    }
  });

  useEffect(() => {
    let url = "http://localhost:9000/login/chatlist";
    let formData = new FormData();

    formData.append("id", username);
    getApiData(formData, url)
      .then((output) => {
        // console.log(output);
        if (output.error) {
          setchatlist(output.data);
        } else {
          setchatlist(output.data);
          setauthorId({ ...authorId, id: output.user });
        }
      })
      .catch((err) => {
        console.lof(err.message);
      });
  }, [path, username]);

  useEffect(() => {
    let date;
    let url = "http://localhost:9000/login/UpdateStatus";
    let formData = new FormData();
    formData.append("username", username);

    var today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let d = today.getDate();
    let mo = today.getMonth();
    mo += 1;
    date = d + "/" + mo + " " + h + ":" + m;

    formData.append("status", onlineStatus);
    formData.append("date", date);
    getApiData(formData, url)
      .then((output) => {})
      .catch((err) => {
        console.log(err.message);
      });
  }, [onlineStatus]);

  useEffect(() => {
    let url = "http://localhost:9000/login/user";
    let formData = new FormData();
    formData.append("username", username);
    getApiData(formData, url)
      .then((output) => {
        setuserInfo({ dp: output.data.dp });
      })
      .catch((error) => {});
  }, [username]);

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <main
            className="chatListContainer"
            style={{ width: "100vw", height: "100vh" }}
          >
            <section className="Dashboard-header">
              <DashHeader
                dp={userInfo.dp}
                id={username}
                count={newMsg.count}
                onlineStatus={onlineStatus}
              />
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
                    count={newMsg.count}
                    u={newMsg.user}
                    uname={newMsg.uname}
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

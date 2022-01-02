import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import MessageList from "./MessageList";
import UserHeader from "../Header/UserHeader";
import { BsEmojiLaughing } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { getApiData } from "../../apis/api";
import io from "socket.io-client";

// emoji picker

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const socket = io("http://localhost:9000");

const Users = () => {
  const { username, id, aId, type } = useParams();
  const [modal, setmodal] = React.useState("none");
  const [userMsg, setuserMsg] = useState({
    message: "",
  });
  const [userDetails, setuserDetails] = useState([]);
  const titleRef = useRef(null);
  const [emoji, setemoji] = useState("none");
  const [height, setheight] = useState("");
  const [msglist, setmsglist] = useState([]);

  const [Status, setStatus] = useState([]);

  const [blkDisplay, setblkDisplay] = useState({
    blocked: false,
  });
  const [blocker, setblocker] = useState({
    blc: "",
  });
  const blockUser = () => {
    if (window.confirm("are you sure !")) {
      let url = "http://localhost:9000/login/blockUser";
      let formData = new FormData();
      formData.append("id", id);
      formData.append("aid", aId);
      getApiData(formData, url)
        .then((output) => {
          if (output.updated) {
            setblkDisplay({ blocked: true });
            setblocker({ ...blocker, blc: aId });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const unblockUser = () => {
    if (window.confirm("are you sure !")) {
      let url = "http://localhost:9000/login/unblockUser";
      let formData = new FormData();
      formData.append("id", id);
      formData.append("aid", aId);
      getApiData(formData, url)
        .then((output) => {
          if (output.updated) {
            setblkDisplay({ blocked: false });
            setblocker({ ...blocker, blc: "" });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let key = Date.now();
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let time = h + ":" + m;
    let value = {
      body: userMsg.message,
      time: time,
      author: aId,
      reciever: id,
      type: type,
      msgId: key,
    };

    socket.emit("rsmeet", value);

    setuserMsg({ ...userMsg, message: "" });
  };

  socket.on("newMsg", (payload) => {
    let url = "http://localhost:9000/login/msglist";
    let formData = new FormData();
    formData.append("id", id);
    formData.append("aid", aId);
    formData.append("type", type);
    getApiData(formData, url).then((output) => {
      let check = output.data;
      check.sort((a, b) => {
        return a.msgId - b.msgId;
      });
      setmsglist(check);
    });
  });

  const addEmoji = (e) => {
    let emoji = e.native;
    setuserMsg({
      message: userMsg.message + emoji,
    });
  };

  const changeHeight = () => {
    let p = document.querySelector(".emoji-mart").offsetHeight;
    emoji === "inline"
      ? setheight(`calc(100vh - 70px - 140px - ${p}px)`)
      : setheight(`calc(100vh - 60px - 140px)`);
  };

  const getMessage = () => {
    let url = "http://localhost:9000/login/msglist";
    let formData = new FormData();
    formData.append("id", id);
    formData.append("aid", aId);
    formData.append("type", type);
    getApiData(formData, url).then((output) => {
      let check = output.data;
      check.sort((a, b) => {
        return a.msgId - b.msgId;
      });
      console.log(output.blocker);
      if (output.blocked || output.blocked2) {
        setblkDisplay({ ...blkDisplay, blocked: true });
        setblocker({ ...blocker, blc: output.blocker });
      }
      setmsglist(check);
      setuserDetails(output.user);
    });
  };

  useEffect(() => {
    changeHeight();
  }, [emoji]);

  // console.log(msglist);

  useEffect(() => {
    let elm = document.getElementById("chatBottom");
    elm.scrollIntoView({ behavior: "smooth" });
  }, [msglist]);

  useEffect(() => {
    getMessage();
  }, []);

  const checkUserStatus = () => {
    let url = `http://localhost:9000/login/showStatus/${id}`;
    let formData = new FormData();
    formData.append("id", id);
    getApiData(formData, url)
      .then((output) => {
        setStatus(output.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    setInterval(() => checkUserStatus(), 10000);
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <main
      className="chatListContainer"
      style={{ width: "100vw", height: "100vh" }}
    >
      <section className="Dashboard-header">
        <UserHeader
          modalDisplay={modal}
          setmodalDisplay={setmodal}
          name={userDetails.name}
          dp={userDetails.image}
          status={Status}
        />
      </section>

      <section
        className="overflow-auto"
        style={{ height: "calc(100vh - 140px)" }}
      >
        <div className="ChatsContainer position-relative h-100">
          <div
            className="messageContainer overflow-auto"
            style={{ height: height }}
            ref={titleRef}
          >
            {msglist.length > 0 ? (
              msglist?.map((list, index) => (
                <MessageList
                  msg={list.body}
                  time={list.time}
                  author={list.author}
                  key={index}
                  id={id}
                  aid={aId}
                  receiver={list.receiver}
                  dp={userDetails.image}
                />
              ))
            ) : (
              <h5>start a new chat</h5>
            )}

            {blkDisplay.blocked ? "can't send message as user is blocked" : ""}

            {/* Section for auto scroll to bottom */}

            <section ref={titleRef} id="chatBottom"></section>
          </div>

          <div className="inputContainer position-absolute bottom-0 px-2 mb-3 w-100">
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <section className="d-flex sendMessage justify-content-center align-items-center p-1">
                <span
                  className="px-1"
                  onClick={() => {
                    emoji === "none" ? setemoji("inline") : setemoji("none");
                  }}
                >
                  <BsEmojiLaughing />
                </span>

                <input
                  type="textarea"
                  className="form-control px-3 Message-input"
                  value={userMsg.message}
                  placeholder="Type your text here"
                  aria-label="Amount (to the nearest dollar)"
                  disabled={blkDisplay.blocked}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                  onChange={(e) => {
                    setuserMsg({ ...userMsg, message: e.target.value });
                  }}
                />

                <button className="px-2 submitButton" type="submit">
                  <FiSend />
                </button>
              </section>
            </form>

            {/* Emoji Picker code */}

            <span style={{ display: emoji }}>
              <Picker
                showSkinTones={false}
                emojiTooltip={true}
                showPreview={false}
                onSelect={(e) => {
                  addEmoji(e);
                }}
                style={{ marginTop: ".5rem", width: "auto" }}
              />
            </span>
          </div>
        </div>
      </section>

      {/* Modal for options list */}

      <section
        className="optionsModal position-absolute p-2 mt-2"
        style={{ display: modal }}
      >
        <div className="d-flex flex-row options-div">
          <span>
            <AiFillInfoCircle />
          </span>
          <button className="option-button">
            <Link to={`/dashboard/home/userinfo/${username}/${id}/${aId}`}>
              <span>user info</span>
            </Link>
          </button>
        </div>
        <div className="d-flex flex-row options-div">
          <span>
            <AiOutlineClear />
          </span>
          <button
            className="option-button"
            onClick={() => {
              alert("clear chat option will be enabled soon");
            }}
          >
            <span>clear chat</span>
          </button>
        </div>
        <div
          className=" flex-row options-div"
          style={{
            display: blkDisplay.blocked ? "none" : "flex",
          }}
        >
          <span>
            <BiBlock />
          </span>
          <button
            className="option-button"
            onClick={() => {
              blockUser();
            }}
          >
            <span>block user</span>
          </button>
        </div>

        <div
          className="flex-row options-div"
          style={{
            display: blocker.blc === aId ? "flex" : "none",
          }}
        >
          <span>
            <BiBlock />
          </span>
          <button className="option-button" onClick={() => unblockUser()}>
            <span>unblock</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Users;

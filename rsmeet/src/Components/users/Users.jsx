import React, { useState, useEffect, useRef } from "react";

import MessageList from "./MessageList";
import UserHeader from "../Header/UserHeader";
import { BsEmojiLaughing } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

// emoji picker

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const Users = () => {
  const [modal, setmodal] = React.useState("none");
  const [userMsg, setuserMsg] = useState({
    message: "",
  });
  const titleRef = useRef(null);
  const [emoji, setemoji] = useState("none");
  const [height, setheight] = useState("");
  const [msglist, setmsglist] = useState([
    {
      body: "hey",
      time: "7:30",
      author: "user",
      msgId: "1",
    },
    {
      body: "hello",
      time: "8:30",
      author: "you",
      msgId: "2",
    },
    {
      body: "how are you? ",
      time: "9:30",
      author: "user",
      msgId: "3",
    },
    {
      body: "whre are you from",
      time: "10:30",
      author: "user",
      msgId: "4",
    },
    {
      body: "I am fron west bengal",
      time: "11:30",
      author: "you",
      msgId: "5",
    },
    {
      body: "ohh, I am from delhi",
      time: "12:30",
      author: "user",
      msgId: "6",
    },
    {
      body: "how you are doing? ",
      time: "1:30",
      author: "user",
      msgId: "7",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let key = Date.now();
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let time = h + " " + m;
    msglist.push({
      body: userMsg.message,
      time: time,
      author: "you",
      msgId: key,
    });
    setmsglist(msglist);
    titleRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    setuserMsg({ ...userMsg, message: "" });
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setuserMsg({
      message: userMsg.message + emoji,
    });
  };

  const changeHeight = () => {
    let p = document.querySelector(".emoji-mart").style.height;
    console.log(p);
    height === "calc(100vh - 60px - 140px)"
      ? setheight("100px")
      : setheight("calc(100vh - 60px - 140px)");
  };

  

  useEffect(() => {
    changeHeight();
  }, [emoji]);



  useEffect(() => {
    titleRef.current.scrollIntoView({ behavior: 'smooth' });
  }, );

  return (
    <main
      className="chatListContainer"
      style={{ width: "100vw", height: "100vh" }}
    >
      <section className="Dashboard-header">
        <UserHeader modalDisplay={modal} setmodalDisplay={setmodal} />
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
            {msglist?.map((list) => (
              <MessageList
                msg={list.body}
                time={list.time}
                author={list.author}
                key={list.msgId}
              />
            ))}

            {/* Section for auto scroll to bottom */}

            <section ref={titleRef}></section>
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
            <span>user info</span>
          </button>
        </div>
        <div className="d-flex flex-row options-div">
          <span>
            <AiOutlineClear />
          </span>
          <button className="option-button">
            <span>clear chat</span>
          </button>
        </div>
        <div className="d-flex flex-row options-div">
          <span>
            <BiBlock />
          </span>
          <button className="option-button">
            <span>block user</span>
          </button>
        </div>
        <div className="d-flex flex-row options-div">
          <span>
            <AiFillDelete />
          </span>
          <button className="option-button">
            <span>delete user</span>
          </button>
        </div>
      </section>
      {/* End here */}
    </main>
  );
};

export default Users;

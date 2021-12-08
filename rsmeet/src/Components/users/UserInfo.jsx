import { useState, useEffect } from "react";
import UserInfoHeader from "../Header/UserInfoHeader";
import { BiDownArrow } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { getApiData } from "../../apis/api";

const UserInfo = () => {
  const { username, id, aId } = useParams();

  const [pchat, setpchat] = useState({
    display: "none",
  });

  const [userinfo, setuserinfo] = useState({
    name: "",
    dp: "",
    status: [],
  });

  const [ruser, setruser] = useState({
    display: "none",
  });

  const [accnt, setaccnt] = useState({
    display: "none",
  });

  // useEffect(() => {
  //     getuserInfo();
  // }, []);

  const getUserInfo = () => {
    let url = "http://localhost:9000/login/userinfo";
    let formData = new FormData();
    formData.append("id", id);
    getApiData(formData, url).then((output) => {
      let d = new Date(output.data.date);
      setuserinfo({
        name: output.data.name,
        dp: output.data.dp,
        status: output.data.status,
        date: d.toLocaleDateString(),
      });
    });
  };

  useEffect(() => {
    getUserInfo();
  }, [username]);

  return (
    <main
      className="chatListContainer"
      style={{ width: "100vw", height: "100vh" }}
    >
      <section className="Dashboard-header">
        <UserInfoHeader
          name={userinfo.name}
          status={userinfo.status}
          dp={userinfo.dp}
        />
      </section>
      <section className="" style={{ height: "calc(100vh - 140px)" }}>
        <div className="listDivs h-100 pt-5">
          <div className="d-flex flex-row options-div justify-content-center mt-5">
            <button
              className="option-button me-5"
              onClick={() =>
                pchat.display === "none"
                  ? setpchat({ ...pchat, display: "flex" })
                  : setpchat({ ...pchat, display: "none" })
              }
            >
              <span>Private chat</span>
            </button>
            <span>
              <BiDownArrow />
            </span>
          </div>

          <section
            className="justify-content-center"
            style={{ display: pchat.display }}
          >
            <Link
              to={`/dashboard/home/${username}/chatlist/ps/${id}/${aId}`}
              style={{ color: "black" }}
            >
              {" "}
              start chat{" "}
            </Link>
          </section>

          <div className="d-flex flex-row options-div justify-content-center">
            <button
              className="option-button me-4"
              onClick={() =>
                ruser.display === "none"
                  ? setruser({ ...pchat, display: "flex" })
                  : setruser({ ...pchat, display: "none" })
              }
            >
              <span>Privacy & Help</span>
            </button>
            <span>
              <BiDownArrow />
            </span>
          </div>

          <button
            className="option-button w-100 me-4 justify-content-center"
            style={{ display: ruser.display }}
          >
            <span>Report</span>
          </button>

          <div className="d-flex flex-row options-div justify-content-center">
            <button
              className="option-button me-4"
              onClick={() =>
                accnt.display === "none"
                  ? setaccnt({ ...accnt, display: "flex" })
                  : setaccnt({ ...accnt, display: "none" })
              }
            >
              <span>Account Info</span>
            </button>
            <span>
              <BiDownArrow />
            </span>
          </div>

          <section
            className="justify-content-center align-items-center"
            style={{ display: accnt.display }}
          >
            <p>{`name : ${userinfo.name}`}</p>
            <p>{`since : ${userinfo.date}`}</p>
          </section>
        </div>
      </section>
    </main>
  );
};

export default UserInfo;

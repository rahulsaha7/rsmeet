import { useEffect, useState } from "react";
import ProfileInfoHeader from "../Header/ProfileInfoHeader";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useHistory, useParams } from "react-router-dom";
import { getApiData } from "../../apis/api";
import useOnlineStatus from "@rehooks/online-status";

const ProfileInfo = ({ removecookies }) => {
  let history = useHistory();
  let { id } = useParams();
  const onlineStatus = useOnlineStatus();
  const [userInfo, setuserInfo] = useState({
    name: "",
    dp: "",
  });

  const updateStatus = () =>{
    let date;
    let url = "http://localhost:9000/login/UpdateStatus";
    let formData = new FormData();
    formData.append("username", id);

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
  }


  const LogOut = () => {
   updateStatus();
    removecookies("authToken",{path:'/'});
   

    history.push(`/`);
  };

  useEffect(() => {
    let url = "http://localhost:9000/login/user";
    let formData = new FormData();
    formData.append("username", id);
    getApiData(formData, url)
      .then((output) => {
        setuserInfo({ name: output.data.name, dp: output.data.dp });
      })
      .catch((error) => {});
  }, []);

  return (
    <main
      className="chatListContainer"
      style={{ width: "100vw", height: "100vh" }}
    >
      <section className="Dashboard-header">
        <ProfileInfoHeader
          name={userInfo.name}
          onlineStatus={onlineStatus}
          dp={userInfo.dp}
        />
      </section>
      <section className="" style={{ height: "calc(100vh - 140px)" }}>
        <div className="pt-5 listDivs h-100 ">
          <div className="d-flex flex-row options-div justify-content-center">
            <span>
              <FaUserAlt />
            </span>
            <button className="option-button ms-4">
              <span>{id}</span>
            </button>
          </div>
          {/* <div className="d-flex flex-row options-div justify-content-center">
            <button className="option-button ms-4">
              <span>User Since : 18/05/2020</span>
            </button>
          </div>
          <div className="d-flex flex-row options-div justify-content-center">
            <span>
              <ImBlocked />
            </span>
          </div> */}
          <div className="d-flex flex-row options-div justify-content-center">
            <span>
              <BiLogOut />
            </span>
            <button className="option-button ms-5" onClick={() => LogOut()}>
              <span>log out</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileInfo;

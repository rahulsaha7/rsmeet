import UserInfoHeader from "../Header/UserInfoHeader";
import { BiDownArrow } from "react-icons/bi";

const UserInfo = () => {
  return (
    <main
      className="chatListContainer"
      style={{ width: "100vw", height: "100vh" }}
    >
      <section className="Dashboard-header">
        <UserInfoHeader />
      </section>
      <section className="" style={{ height: "calc(100vh - 140px)" }}>
        <div className="listDivs h-100 pt-5">
          <div className="d-flex flex-row options-div justify-content-center mt-5">
            <button className="option-button me-5">
              <span>Private chat</span>
            </button>
            <span>
              <BiDownArrow />
            </span>
          </div>
          <div className="d-flex flex-row options-div justify-content-center">
            <button className="option-button me-4" >
              <span>Privacy & Help</span>
            </button>
            <span>
              <BiDownArrow />
            </span>
          </div>
          <div className="d-flex flex-row options-div justify-content-center">
            <button className="option-button me-4">
              <span>Account Info</span>
            </button>
            <span>
              <BiDownArrow />
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserInfo;

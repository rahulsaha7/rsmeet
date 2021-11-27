import UserInfoHeader from "../Header/UserInfoHeader";
import {FaUserAlt} from 'react-icons/fa';
import {ImBlocked} from 'react-icons/im';
import {BiLogOut} from 'react-icons/bi';


const ProfileInfo = () => {

    const LogOut = () =>{

    }

  return (
    <main
      className="chatListContainer"
      style={{ width: "100vw", height: "100vh" }}
    >
      <section className="Dashboard-header">
        <UserInfoHeader />
      </section>
      <section className="" style={{ height: "calc(100vh - 140px)" }}>
        <div className="pt-5 listDivs h-100 ">
          <div className="d-flex flex-row options-div justify-content-center">
            <span>
              <FaUserAlt />
            </span>
            <button className="option-button ms-4">
              <span>Rahul7</span>
            </button>
          </div>
          <div className="d-flex flex-row options-div justify-content-center">
            
            <button className="option-button ms-4">
              <span>User Since : 18/05/2020</span>
            </button>
          </div>
          <div className="d-flex flex-row options-div justify-content-center">
            <span>
              <ImBlocked />
            </span>
            <button className="option-button ms-4">
              <span>block list</span>
            </button>
          </div>
          <div className="d-flex flex-row options-div justify-content-center">
            <span>
              <BiLogOut />
            </span>
            <button className="option-button ms-5" onClick={()=>LogOut()} >
              <span>log out</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileInfo;

import DashHeader from "../Header/DashHeader";
import List from "./List";
const MobileView = ({Chatlist}) => {
  return (
    <main
      className="chatListContainer"
      style={{ width: "100vw", height: "100vh" }}
    >
      <section className="Dashboard-header">
        <DashHeader />
      </section>
    <section className="overflow-auto" style={{height: "calc(100vh - 140px)"}}>
        <div className="listDivs">
          {Chatlist?.map((chats, i) => (
            <List dp={chats.img} name={chats.name} time={chats.time} key={i} />
          ))}
        </div>

    </section>
     
    </main>
  );
};

export default MobileView;

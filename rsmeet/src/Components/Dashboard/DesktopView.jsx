import DashHeader from "../Header/DashHeader";
const DesktopView = ({ Chatlist }) => {
  return (
    <main
      className="chatListContainer"
      style={{ width: "100vw", height: "100vh" }}
    >
      <section className="header">
        <DashHeader />
      </section>
      <section className="chatList">
        <div className="listDivs">Hello world</div>
      </section>
    </main>
  );
};

export default DesktopView;

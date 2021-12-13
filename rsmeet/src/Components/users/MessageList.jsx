import UserMsg from "./UserMsg";
import OppositeUser from "./OppositeUser";

const MessageList = ({ msg, time, author, id, aid, receiver, dp }) => {
  return (
    <>
      {author === aid && receiver === id ? (
        <UserMsg msg={msg} time={time} />
      ) : author === id && receiver === aid ? (
        <OppositeUser msg={msg} time={time} dp={dp} />
      ) : (
        ""
      )}
    </>
  );
};

export default MessageList;

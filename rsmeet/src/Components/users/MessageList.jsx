import {useState} from 'react';
import BlankDp from "../../Assets/image/blankDp.png";
import UserMsg from './UserMsg';
import OppositeUser from './OppositeUser';

const MessageList = ({msg,time,author,id}) => {


  return (
    <>
     

      {author === id ? (<OppositeUser msg={msg} time={time} />) : <UserMsg msg={msg} time={time} />}

    </>
  );
};

export default MessageList;

import React from "react";
import UserInfo from "./UserInfo";
import ChatList from "./ChatList";

const List = ({ className }) => {
  return (
    <div className={`${className} flex flex-col flex-1 h-[100%]`}>
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;

import React from "react";
import UserInfo from "./UserInfo";
import ChatList from "./ChatList";

const List = ({
  className,
  modalIsOpen,
  setModalIsOpen,
  openModal,
  closeModal,
}) => {
  return (
    <div className={`${className} flex flex-col flex-1 h-[100%]`}>
      <UserInfo />
      <ChatList
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default List;

import React, { useState, useEffect, useRef } from "react";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const chatListRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      clearTimeout(chatListRef.current);
      chatListRef.current = setTimeout(() => setScrolling(false), 2500);
    };

    const chatListElem = chatListRef.current;
    chatListElem.addEventListener("scroll", handleScroll);

    return () => {
      chatListElem.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={chatListRef}
      className={`flex flex-col items-center gap-4 overflow-y-scroll ${
        scrolling ? "scrollbar-showing" : "scrollbar-hidden"
      } scrollbar-custom w-full max-w-full`}
    >
      <div className="search flex gap-4 items-center w-full max-w-full px-2">
        <div className="search-bar flex-1 bg-[rgb(36,54,88)] opacity-50 flex items-center rounded-[10px] py-[5px] px-[7px] w-full max-w-full">
          <img
            src="./search.png"
            alt="search.png"
            className="w-[20px] h-[20px]"
          />
          <input
            type="text"
            name="search"
            className="bg-transparent outline-none border-none text-white h-[25px] placeholder:text-slate-200 placeholder:font-light placeholder:text-xs w-full"
            placeholder="Search"
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="Plus.png"
          className="w-[36px] h-[36px] bg-[rgb(36,54,88)] opacity-50 p-[10px] rounded-md cursor-pointer"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="item w-full flex items-center gap-5 p-2 cursor-pointer border-b-[1px] border-[#dddddd35] bg-transparent"
        >
          <img
            src="./avatar.png"
            alt="Avatar.png"
            className="w-[50px] h-[50px] ring-1 ring-gray-400 rounded-full"
          />
          <div className="texts flex flex-col gap-[10px]">
            <span className="font-semibold text-white text-sm">
              Kanizah Baig
            </span>
            <p className="font-normal text-white text-xs">Hello cutuu</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

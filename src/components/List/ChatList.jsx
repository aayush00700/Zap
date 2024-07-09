import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";

const ChatList = ({ setModalIsOpen }) => {
  const [scrolling, setScrolling] = useState(false);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  const chatListRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      clearTimeout(chatListRef.current);
      chatListRef.current = setTimeout(() => setScrolling(false), 2500);
    };

    const chatListElem = chatListRef.current;
    if (chatListElem) {
      chatListElem.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatListElem) {
        chatListElem.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const data = res.data();

        if (!data || !data.chats) {
          setChats([]);
          return;
        }

        const items = data.chats;

        try {
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();

            return { ...item, user };
          });

          const chatData = await Promise.all(promises);
          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filterChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div
      ref={chatListRef}
      className={`flex flex-col items-center gap-2 overflow-y-scroll ${
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
            className="bg-transparent outline-none border-none focus:border-none focus:outline-none active:border-none active:outline-none text-white h-[25px] placeholder:text-slate-200 placeholder:font-light placeholder:text-xs w-full"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src="./plus.png"
          alt="Plus.png"
          className="w-[36px] h-[36px] bg-[rgb(36,54,88)] opacity-50 p-[10px] rounded-md cursor-pointer"
          onClick={() => {
            setModalIsOpen((prev) => !prev);
          }}
        />
      </div>
      {filterChats.map((chat, index) => (
        <div
          onClick={() => handleSelect(chat)}
          key={index}
          className={`item w-full flex items-center gap-5 p-2 cursor-pointer border-b-[1px] border-[#dddddd35] ${
            chat?.isSeen ? "bg-transparent" : "bg-[#5183fe]"
          }`}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? "./avatar.png"
                : chat?.user?.imgUrl
            }
            alt="Avatar.png"
            className="w-[40px] h-[40px] ring-1 ring-gray-400 rounded-full"
          />
          <div className="texts flex flex-col gap-1">
            <span className="font-normal text-white text-[14px]">
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat?.user?.username}
            </span>
            <p className="font-normal text-white text-[11px]">
              {chat?.lastMessage || "No messages yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

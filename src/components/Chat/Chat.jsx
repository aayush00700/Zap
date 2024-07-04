import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import "../../index.css";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import uploadFile from "../../lib/upload";

const Chat = ({ className }) => {
  const [chat, setChat] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [img, setImg] = useState({
    file: null,
    fileUrl: "",
  });
  const emojiPickerRef = useRef(null);
  const endRef = useRef(null);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        fileUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmoji = (e) => {
    setMessageInput((prev) => prev + e.emoji);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const handleSend = async () => {
    if (messageInput === "" && !img.file) return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await uploadFile(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          messageInput,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();

          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = messageInput;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImg({ file: null, fileUrl: "" });
    setMessageInput("");
  };

  return (
    <div
      className={`${className} flex flex-col border-r-[1px] border-l-[1px] border-[#dddddd35] h-[100%]`}
    >
      <div className="top p-3 flex items-center justify-between border-b-[1px] border-[#dddddd35]">
        <div className="user flex items-center gap-5">
          <img
            src={user.imgUrl || "./avatar.png"}
            alt="User.png"
            className="w-[45px] h-[45px] rounded-full ring-1 ring-gray-300 object-cover"
          />
          <div className="texts flex flex-col gap-1">
            <span className="text-white text-base font-semibold">
              {user.username || "Username"}
            </span>
            <p className="text-[#a5a5a5] text-xs font-light">
              It's just life. It'll be over before you know it
            </p>
          </div>
        </div>
        <div className="icons flex gap-3">
          <img
            src="./phone.png"
            alt="Phone.png"
            className="w-[15px] h-[15px]"
          />
          <img
            src="./video.png"
            alt="Video.png"
            className="w-[15px] h-[15px]"
          />
          <img src="./info.png" alt="Info.png" className="w-[15px] h-[15px]" />
        </div>
      </div>
      <div
        className={`center p-3 flex-1 overflow-y-scroll scrollbar-custom w-full max-w-full flex flex-col gap-4`}
      >
        {chat?.messages?.map((message, index) => (
          <div
            className={
              message.senderId === currentUser.id
                ? "message-own max-w-[70%] self-end"
                : "message-other max-w-[70%] self-start"
            }
            key={index}
          >
            <div className="texts ">
              {message.img && (
                <img
                  src={message.img}
                  alt="Image.png"
                  className="w-full max-h-80 object-fit rounded-md mb-2"
                />
              )}
              <p
                className={
                  message.senderId === currentUser.id
                    ? "bg-blue-600 text-slate-200 rounded-md p-3 text-sm"
                    : "bg-[rgba(50,59,86,0.5)] text-slate-200 rounded-md p-3 text-sm"
                }
              >
                {message.messageInput}
              </p>
            </div>
            {/* <span className="text-gray-400 text-xs">{message.createdAt.toLocaleTime}</span> */}
          </div>
        ))}
        {img.fileUrl && (
          <div className={`message-own max-w-[70%] self-end`}>
            <div className="texts ">
              <img
                src={img.fileUrl}
                alt="Image.png"
                className="w-full h-full rounded-md mb-2"
              />
            </div>
            {/* <span className="text-gray-400 text-xs">{message.createdAt}</span> */}
          </div>
        )}

        <div ref={endRef}></div>
      </div>
      <div className="bottom px-3 py-2 flex items-center justify-between border-t-[1px] border-[#dddddd35] relative">
        <div className="icons-bottom flex gap-3">
          <label htmlFor="file">
            <img
              src="./img.png"
              alt="Img.png"
              className="h-[18px] w-[18px] cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <img
            src="./camera.png"
            alt="Camera.png"
            className="h-[18px] w-[18px] cursor-pointer"
          />
          <img
            src="./mic.png"
            alt="Mic.png"
            className="h-[18px] w-[18px] cursor-pointer"
          />
        </div>
        <input
          type="text"
          className="flex text-white flex-1 bg-transparent border-none outline-none text-xs focus:outline-none focus:border-none focus:ring-0 disabled:cursor-not-allowed"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You are not allowed to send message"
              : "Type your message..."
          }
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <div className="emoji relative">
          <img
            src="./emoji.png"
            alt="Emoji.png"
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute bottom-[150%] left-0">
              <EmojiPicker
                className=""
                height={400}
                width={350}
                open={showEmojiPicker}
                onEmojiClick={handleEmoji}
                theme="auto"
              />
            </div>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          className="sendbutton px-3 py-2 bg-[#5183fe] text-sm rounded-md font-medium ml-3 text-white border-none cursor-pointer hover:ring-1 hover:ring-slate-200 disabled:cursor-not-allowed disabled:ring-0"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

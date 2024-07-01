import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

const Chat = ({ className }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const emojiPickerRef = useRef(null);

  const handleEmoji = (e) => {
    setMessageInput((prev) => prev + e.emoji);
    // setShowEmojiPicker(false);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

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

  return (
    <div
      className={`${className} flex flex-col border-r-[1px] border-l-[1px] border-[#dddddd35] h-[100%]`}
    >
      <div className="top p-3 flex items-center justify-between border-b-[1px] border-[#dddddd35]">
        <div className="user flex items-center gap-5">
          <img
            src="./avatar.png"
            alt="User.png"
            className="w-[45px] h-[45px] rounded-full ring-1 ring-gray-300 object-cover"
          />
          <div className="texts flex flex-col gap-1">
            <span className="text-white text-base font-semibold">
              Kanizah Baig
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
      <div className="center flex-1">
        <div className="message">
          <img src="./avatar.png" alt="Avatar.png" className="" />
          <div className="texts">
            <p className="">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
              velit veniam aliquam voluptatibus repellendus itaque quod vitae ex
              mollitia omnis.
            </p>
          </div>
        </div>
      </div>
      <div className="bottom px-3 py-2 flex items-center justify-between border-t-[1px] border-[#dddddd35] relative">
        <div className="icons-bottom flex gap-3">
          <img
            src="./img.png"
            alt="Img.png"
            className="h-[18px] w-[18px] cursor-pointer"
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
          className="flex text-white flex-1 bg-transparent border-none outline-none text-xs focus:outline-none focus:border-none focus:ring-0"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />

        <div className="emoji relative">
          <img
            src="./emoji.png"
            alt="Emoji.png"
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute bottom-[110%] left-0">
              <EmojiPicker
                className=""
                height={400}
                width={350}
                open={showEmojiPicker}
                onEmojiClick={handleEmoji}
                theme="dark"
              />
            </div>
          )}
        </div>
        <button className="sendbutton px-3 py-2 bg-[#5183fe] text-sm rounded-md font-medium ml-3 text-white border-none cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

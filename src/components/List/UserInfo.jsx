import React from "react";

const UserInfo = () => {
  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          src="./avatar.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover ring-2 ring-blue-500"
        />
        <h2 className="text-white">Akshansh Singh</h2>
      </div>
      <div className="flex gap-3">
        <img
          src="./more.png"
          alt=""
          className="cursor-pointer w-[15px] h-[15px]"
        />
        <img
          src="./video.png"
          alt=""
          className="cursor-pointer w-[15px] h-[15px]"
        />
        <img
          src="./edit.png"
          alt=""
          className="cursor-pointer w-[15px] h-[15px]"
        />
      </div>
    </div>
  );
};

export default UserInfo;

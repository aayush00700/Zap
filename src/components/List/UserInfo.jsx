import React from "react";
import { useUserStore } from "../../lib/userStore";

const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="px-3 py-4 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          src={currentUser.imgUrl}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover ring-2 ring-gray-200"
        />
        <h2 className="text-white">{currentUser.username}</h2>
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

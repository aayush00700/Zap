import React from "react";
import { MdClose } from "react-icons/md";

const AddUser = ({ closeModal }) => {
  return (
    <div className="AddUser relative p-6 bg-slate-800 rounded-md w-max h-max">
      <form action="" className="flex gap-4">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="px-4 w-[250px] rounded-md border-none outline-none text-sm placeholder:text-slate-600"
        />
        <button className="px-4 py-1 border-md bg-sky-500 active:bg-sky-600 text-slate-100 border-none cursor-pointer rounded-md">
          Search
        </button>
      </form>
      <div className="user mt-6 flex items-center justify-between ">
        <div className="detail flex items-center gap-4">
          <img
            src="./avatar.png"
            alt=""
            className="w-9 h-9 rounded-full object-cover "
          />
          <span className="text-slate-100">Akshansh Singh</span>
        </div>
        <button className="px-2 py-1 border-md bg-sky-500 text-slate-100 border-none cursor-pointer rounded-md active:bg-sky-600">
          Add user
        </button>
      </div>
      <button
        onClick={closeModal}
        className="p-[3px] rounded-full bg-transparent absolute top-0 right-0"
      >
        <MdClose className="text-slate-100" size={18} />
      </button>
    </div>
  );
};

export default AddUser;

import React, { useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    toast.warn("Error while logging in");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid, // Corrected from res.user.id to res.user.uid
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account registered successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="login flex items-center h-[100%] w-full">
      <div className="item flex flex-col flex-1 items-center gap-4 ">
        <h2 className="text-gray-200 text-2xl font-semibold">Welcome back</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-4"
        >
          <div className="w-[250px] px-3 flex items-center bg-inputGrey rounded-md">
            <FaUser className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="py-3 w-full bg-transparent border-none outline-none text-gray-300 font-light text-sm focus:ring-0"
            />
          </div>
          <div className="w-[250px] px-3 flex items-center bg-inputGrey rounded-md">
            <RiLockPasswordLine className="text-gray-300" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="py-3 w-full bg-transparent border-none outline-none text-gray-300 font-light text-sm focus:ring-0"
            />
          </div>
          <button className="text-gray-300 w-30 px-5 py-2 text-sm hover:bg-blue-700 font-medium border-none outline-none bg-[#1f8ef1] rounded-md cursor-pointer">
            Login
          </button>
        </form>
      </div>
      <div className="seperator h-[100%] w-[1px] bg-[#dddddd35] "></div>
      <div className="item flex flex-col flex-1 items-center gap-4">
        <h2 className="text-gray-200 text-2xl font-semibold">
          Create an account
        </h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center gap-4"
        >
          <label
            htmlFor="file"
            className="w-full flex items-center gap-5 cursor-pointer underline decoration-white underline-offset-2"
          >
            <img
              src={avatar.url || "./avatar.png"}
              alt=""
              className="w-10 h-10 rounded-md object-cover opacity-80 ring-1 ring-gray-200"
            />
            <span className="text-gray-300">Upload an image</span>
          </label>
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
            className="px-4 py-3 text-sm w-[250px] border-none outline-none bg-inputGrey text-gray-300 rounded-md"
          />
          <div className="w-[250px] px-3 flex items-center bg-inputGrey rounded-md">
            <MdOutlineDriveFileRenameOutline
              size={21}
              className="text-gray-400"
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="py-3 w-full bg-transparent border-none outline-none text-gray-300 font-light text-sm focus:ring-0"
            />
          </div>
          <div className="w-[250px] px-3 flex items-center bg-inputGrey rounded-md">
            <FaUser className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="py-3 w-full bg-transparent border-none outline-none text-gray-300 font-light text-sm focus:ring-0"
            />
          </div>
          <div className="w-[250px] px-3 flex items-center bg-inputGrey rounded-md">
            <RiLockPasswordLine className="text-gray-300" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="py-3 w-full bg-transparent border-none outline-none text-gray-300 font-light text-sm focus:ring-0"
            />
          </div>
          <button className="text-gray-300 w-30 px-5 py-2 text-sm hover:bg-blue-700 font-medium text border-none outline-none bg-[#1f8ef1] rounded-md cursor-pointer">
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

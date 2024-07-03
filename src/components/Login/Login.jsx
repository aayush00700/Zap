import React, { useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import "../../index.css";
import uploadFile from "../../lib/upload";
import Notification from "../Notification/Notification";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    if (!email) {
      toast.error("Email is required");
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error("Password is required");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        toast.error("User not found.");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    if (!email) {
      toast.error("Email is required");
    }
    if (!password) {
      toast.error("Password is required");
    }
    if (!username) {
      toast.error("Username is required");
    }

    try {
      if (!avatar.file) {
        toast.error("Please upload an avatar");
      }

      const imgUrl = await uploadFile(avatar.file);

      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        imgUrl,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account registered successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
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
          <button
            disabled={loading}
            className="text-gray-300 w-30 px-5 py-2 text-sm hover:bg-blue-700 font-medium border-none outline-none bg-[#1f8ef1] rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
          >
            {loading ? "Loading..." : "Login"}
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
          <button
            disabled={loading}
            className="text-gray-300 w-30 px-5 py-2 text-sm hover:bg-blue-700 font-medium text border-none outline-none bg-[#1f8ef1] rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
          >
            {loading ? "Loading" : "Register"}
          </button>
        </form>
      </div>
      {/* <ToastContainer position="bottom-right" /> */}
      <Notification />
    </div>
  );
};

export default Login;

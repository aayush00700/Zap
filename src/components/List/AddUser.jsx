import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { db } from "../../lib/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../../lib/userStore";

const AddUser = ({ closeModal }) => {
  const { currentUser } = useUserStore();
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username.trim()));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
      if (querySnapShot.empty) {
        toast.error("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdOn: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AddUser relative p-6 bg-slate-800 rounded-md w-max h-max">
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="User"
          name="username"
          className="px-4 w-[250px] rounded-md border-none outline-none text-sm placeholder:text-slate-600"
        />
        <button className="px-4 py-1 border-md bg-sky-500 active:bg-sky-600 text-slate-100 border-none cursor-pointer rounded-md">
          Search
        </button>
      </form>
      {user && (
        <div className="user mt-6 flex items-center justify-between ">
          <div className="detail flex items-center gap-4">
            <img
              src={user.imgUrl || "./avatar.png"}
              alt="Avatar.png"
              className="w-9 h-9 rounded-full object-cover "
            />
            <span className="text-slate-100">{user.username}</span>
          </div>
          <button
            onClick={handleAdd}
            className="px-2 py-1 border-md bg-sky-500 text-slate-100 border-none cursor-pointer rounded-md active:bg-sky-600"
          >
            Add user
          </button>
        </div>
      )}
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

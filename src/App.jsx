import "./index.css";
import List from "./components/List/List";
import Chat from "./components/Chat/Chat";
import Details from "./components/Details/Details";
import Login from "./components/Login/Login";
import Notification from "./components/Notification/Notification";
import Modal from "react-modal";
import AddUser from "./components/List/AddUser";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import MoonLoader from "react-spinners/MoonLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading)
    return (
      <div>
        <MoonLoader color="#000000" size={40} loading={isLoading} />
      </div>
    );

  return (
    <div className=" w-[90vw] h-[90vh] bg-[rgb(17,25,40)] opacity-90 rounded-lg border-[1px] border-white border-opacity-15 flex">
      {currentUser ? (
        <>
          <List
            className="w-[25%]"
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
          <Chat className="w-[50%]" />
          <Details className="w-[25%]" />
          <Modal
            className="border-2 border-slate-200 absolute rounded-md"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={true}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <AddUser closeModal={closeModal} />
          </Modal>
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;

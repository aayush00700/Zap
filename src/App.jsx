import "./index.css";
import List from "./components/List/List";
import Chat from "./components/Chat/Chat";
import Details from "./components/Details/Details";
import Login from "./components/Login/Login";
import Notification from "./components/Notification/Notification";
import Modal from "react-modal";
import AddUser from "./components/List/AddUser";
import SelectionSvg from "../public/selection.svg";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import MoonLoader from "react-spinners/MoonLoader";
import "react-toastify/dist/ReactToastify.css";
import { useChatStore } from "./lib/chatStore";

Modal.setAppElement("#root");

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const [openDetails, setOpenDetails] = useState(true);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 900);

  const handleOpenDetails = () => {
    setOpenDetails((prev) => !prev);
  };

  const openDetailsModal = () => {
    setDetailsModalIsOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 900);
      if (window.innerWidth > 900) {
        setOpenDetails(true); // Ensure details are open on larger screens
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <div className="w-[90vw] h-[90vh] bg-[rgb(17,25,40)] opacity-90 rounded-lg border-[1px] border-white border-opacity-15 flex relative">
      {currentUser ? (
        <>
          <List
            className={openDetails && !smallScreen ? "w-[35%]" : "w-[25%]"}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
          {chatId && (
            <Chat
              handleOpenDetails={
                smallScreen ? openDetailsModal : handleOpenDetails
              }
              className={openDetails && !smallScreen ? "w-[50%]" : "w-[75%]"}
            />
          )}
          {chatId && openDetails && !smallScreen && (
            <Details className="w-[25%]" />
          )}
          {!chatId && (
            <div className="w-[75%] h-[100%] flex flex-col gap-5 items-center justify-center border-l-[1px] border-slate-600">
              <img src={SelectionSvg} alt="" className="w-[350px]" />
              <p className="text-lg text-slate-300">Select a chat</p>
            </div>
          )}

          <Modal
            isOpen={detailsModalIsOpen}
            onRequestClose={closeDetailsModal}
            contentLabel="Details Modal"
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
                width: "80%",
                height: "80%",
                borderRadius: "8px",
                backgroundColor: "#111928",
                border: "1px solid #ccc",
              },
            }}
          >
            <button
              className="absolute top-2 right-2 text-white"
              onClick={closeDetailsModal}
            >
              Close
            </button>
            <Details />
          </Modal>

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

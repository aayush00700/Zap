import "./index.css";
import List from "./components/List/List";
import Chat from "./components/Chat/Chat";
import Details from "./components/Details/Details";
import Login from "./components/Login/Login";
import Notification from "./components/Notification/Notification";

const App = () => {
  const user = false;

  return (
    <div className="w-[90vw] h-[90vh] bg-[rgb(17,25,40)] opacity-90 rounded-lg border-[1px] border-white border-opacity-15 flex">
      {user ? (
        <>
          <List className="w-[25%]" />
          <Chat className="w-[50%]" />
          <Details className="w-[25%]" />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;

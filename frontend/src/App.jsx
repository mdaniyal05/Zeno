import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function clearStorage() {
  let session = sessionStorage.getItem("register");

  if (session == null) {
    localStorage.removeItem("userInfo");
  }
  sessionStorage.setItem("register", 1);
}

function App() {
  window.addEventListener("load", clearStorage);

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;

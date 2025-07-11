import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogoutMutation } from "./redux/slices/authApiSlice";
import { logout } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const clearStorage = async () => {
    let session = sessionStorage.getItem("register");

    if (session == null) {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
    sessionStorage.setItem("register", 1);
  };

  window.addEventListener("load", clearStorage);

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;

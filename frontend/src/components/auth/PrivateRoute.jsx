import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  return userInfo && accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};
export default PrivateRoute;

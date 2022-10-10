import { Navigate, useLocation } from "react-router-dom";

import jwtDecode from "jwt-decode";

export const RequireAuth = ({ children }) => {
  const location = useLocation();

  try {
    var user = jwtDecode(localStorage.getItem("AccessToken"));
  } catch (err) {
    user = null;
  }

  // console.log(user);
  console.log("path", location);
  console.log("kfdsfd", location.pathname.split("/")[1]);

  return user !== null && user.userInfo.id !== undefined ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  );
};

import { Navigate, useLocation } from "react-router-dom";

import jwtDecode from "jwt-decode";

export const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();

  try {
    var user = jwtDecode(localStorage.getItem("AccessToken"));
  } catch (err) {
    user = null;
  }

  console.log(user);
  // console.log("path", location);
  // console.log("kfdsfd", location.pathname.split("/")[1]);
  console.log("Inside Required auth");
  // console.log(children);
  // console.log(allowedRoles[0])

  return allowedRoles?.find((role) => user?.userInfo?.role == role) ? (
    children
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  );
};

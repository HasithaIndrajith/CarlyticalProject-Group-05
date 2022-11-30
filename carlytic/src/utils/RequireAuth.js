import { Navigate, useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";

export const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();

  try {
    var user = jwt_decode(localStorage.getItem("AccessToken"));
  } catch (err) {
    user = null;
  }

  // console.log(jwt_decode(localStorage.getItem("AccessToken")));
  // console.log(
  //   allowedRoles?.find((role) => {
  //     console.log(role + " Role");
  //   })
  // );
  console.log("Inside Required auth");
  if (allowedRoles.length > 0 && allowedRoles.includes(user?.userInfo?.role)) {
    return children;
  } else if (user) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: location.pathname }}
        replace
      />
    );
  } else {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }
  // return allowedRoles?.find((role) => user?.userInfo?.role == role) ? (
  //   children
  // ) : user ? (
  //   <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
  // ) : (
  //   <Navigate to="/" state={{ from: location.pathname }} replace />
  // );
};

import axios from "axios";
const DNS = "http://localhost:3001";

const handleLogin = (LoginFormValue) => {
  console.log("Inside Handle Login");
  return axios({
    url: DNS + "/api/auth/signin",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: LoginFormValue,
  });
};
const handleSignUp = (SignUpFormValue) => {
  console.log("Inside Handle SignUp");
  return axios({
    url: DNS + "/api/auth/signup",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: SignUpFormValue,
  });
};

const handleLogout = () => {
  console.log("Inside Handle Logout");
  return axios({
    url: DNS + "/api/auth/logout",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
};
export default {
  handleLogin,
  handleSignUp,
  handleLogout,
};

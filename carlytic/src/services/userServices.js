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
export default {
  handleLogin,
};

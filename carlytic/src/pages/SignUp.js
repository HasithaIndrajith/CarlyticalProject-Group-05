import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import userServices from "../services/userServices";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Carlytical System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/navigation";
  const [errorMessage, setErrorMessage] = useState("");
  const [formError, setFormError] = useState({
    id: "Please enter your ID",
    email: "Plase Enter valid email",
    password: "(A-Z) (a-z) (0-9) (@#$% ...) (minimum length 8))",
    confirmpassword: "(A-Z) (a-z) (0-9) (@#$% ...) (minimum length 8))",
  });
  const [hasErrorObj, setHasErrorObject] = useState({
    id: true,
    email: true,
    password: true,
    confirmpassword: true,
  });
  // useEffect(() => {}, [errorMessage]);

  const changeID = (e) => {
    setErrorMessage("");
    if (e.target.value.length > 0) {
      setFormError({ ...formError, id: "" });
      setHasErrorObject({ ...hasErrorObj, id: false });
    } else {
      setFormError({ ...formError, id: "Please enter your ID" });
      setHasErrorObject({ ...hasErrorObj, id: true });
    }
  };
  const changeEmail = (e) => {
    setErrorMessage("");
    if (
      new RegExp(
        "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      ).test(e.target.value)
    ) {
      setFormError({ ...formError, email: "" });
      setHasErrorObject({ ...hasErrorObj, email: false });
    } else {
      setFormError({ ...formError, email: "Plase Enter valid email" });
      setHasErrorObject({ ...hasErrorObj, email: true });
    }
  };
  const changePassword = (e) => {
    setErrorMessage("");
    if (
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      ).test(e.target.value)
    ) {
      setFormError({ ...formError, password: "" });
      setHasErrorObject({ ...hasErrorObj, password: false });
    } else {
      setFormError({
        ...formError,
        password: "(A-Z) (a-z) (0-9) (@#$% ...) (minimum length 8))",
      });
      setHasErrorObject({ ...hasErrorObj, password: true });
    }
  };
  const changeConfirmPassword = (e) => {
    setErrorMessage("");
    if (
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      ).test(e.target.value)
    ) {
      setFormError({ ...formError, confirmpassword: "" });
      setHasErrorObject({ ...hasErrorObj, confirmpassword: false });
    } else {
      setFormError({
        ...formError,
        confirmpassword: "(A-Z) (a-z) (0-9) (@#$% ...) (minimum length 8))",
      });
      setHasErrorObject({ ...hasErrorObj, confirmpassword: true });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      id: data.get("userID"),
      email: data.get("email"),
      password: data.get("password"),
      confirmpassword: data.get("confirmpassword"),
    };
    if (
      hasErrorObj.id ||
      hasErrorObj.email ||
      hasErrorObj.password ||
      hasErrorObj.confirmpassword
    ) {
      setErrorMessage("Please fill the fields in correct format");
    } else if (userData.password !== userData.confirmpassword) {
      setErrorMessage("Password do not match");
    } else if (
      !hasErrorObj.id &&
      !hasErrorObj.email &&
      !hasErrorObj.password &&
      !hasErrorObj.confirmpassword &&
      errorMessage === ""
    ) {
      await userServices
        .handleSignUp(userData)
        .then((result) => {
          if (result.status === 201) {
            navigate("/");
          }
          if (result.data.alreadyRegistered === true) {
            setErrorMessage("User already registered with the system !!!");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.isMember === false) {
            setErrorMessage("No Member Found in organization !!!");
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/motor.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <TimeToLeaveIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                error={hasErrorObj.id}
                id="userID"
                label="User ID"
                name="userID"
                autoComplete="userID"
                autoFocus
                onChange={changeID}
                helperText={formError.id}
              />
              <TextField
                margin="normal"
                required
                error={hasErrorObj.email}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={changeEmail}
                helperText={formError.email}
              />
              <TextField
                margin="normal"
                required
                error={hasErrorObj.password}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changePassword}
                helperText={formError.password}
              />
              <TextField
                margin="normal"
                required
                error={hasErrorObj.confirmpassword}
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changeConfirmPassword}
                helperText={formError.confirmpassword}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "black" }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Already have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              {errorMessage !== "" ? (
                <Alert key={"warning"} variant={"warning"}>
                  {errorMessage}
                </Alert>
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

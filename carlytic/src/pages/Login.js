import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import car from "../images/car.jpg";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import UserServices  from "../services/userServices" ;
function Login() {
  const [LoginFormValue, setLoginFormValue] = useState({
    id: "",
    password: "",         
  });

  async function handleLogin(e) {
    e.preventDefault();
    console.log(LoginFormValue);


    const response = await UserServices.handleLogin(LoginFormValue);
    console.log(response);
    // localStorage.setItem("AccessToken", response?.data?.accessToken);
  }

  return (
    <div>
      <div className="container-fluid">
        <Row>
          <div
            sm
            className="col container-fluid"
            style={{
              backgroundColor: "#FFAE42",
              position: "relative",
              height: "720px",
              opacity: 0.8,
              zIndex: -1,
            }}
          >
            <img
              src={car}
              style={{
                width: "100%",
                height: "720px",
                // opacity: 0.8,
                position: "absolute",
              }}
              alt=""
            />
          </div>
          <Col sm>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Member ID</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setLoginFormValue((values) => ({
                      ...values,
                      id: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="Enter your id"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setLoginFormValue((values) => ({
                      ...values,
                      password: e.target.value,
                    }));
                  }}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button onClick={handleLogin} variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import userServices from "../services/userServices";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };
  const handleLogout = async (e) => {
    await userServices.handleLogout();
    toggleLogoutModal();
    localStorage.removeItem("AccessToken");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/managerhome">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Carlytical
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={toggleLogoutModal}>
              {/* <span className="fa fa-sign-in fa-lg"></span> Logout */}
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={isLogoutModalOpen} onHide={toggleLogoutModal}>
        <ModalHeader>
          <h4
            style={{
              textAlign: "center",
            }}
          >
            Logout
          </h4>
        </ModalHeader>
        <ModalBody>
          Are you sure you want to Logout?
          <br></br>
          <br></br>
          <Button className="btn-primary" onClick={handleLogout} href="/">
            Confirm
          </Button>
          <Button className="btn-secondary" onClick={toggleLogoutModal}>
            Close
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Header;

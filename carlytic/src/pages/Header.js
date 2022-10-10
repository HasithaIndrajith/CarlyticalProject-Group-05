import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Header = () => {

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const toggleLogoutModal = () => {
        setIsLogoutModalOpen(!isLogoutModalOpen);
    }

  return (
    <>
       <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
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
                <ModalHeader >
                    <h4 style={{
                        textAlign: "center"
                    }}>Logout</h4>
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to Logout?
                    <br></br><br></br>
                    <Button className='btn-primary' onClick={toggleLogoutModal}>Confirm</Button>
                    <Button className='btn-secondary' onClick={toggleLogoutModal}>Close</Button>
                </ModalBody>
            </Modal>
    </>
  )
}

export default Header

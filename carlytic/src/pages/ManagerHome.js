import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const ManagerHome = () => {
  return (
    <>
      <Header />
      <div>
        <br></br>
        <br></br>
        {/* <button
          onClick={async (e) => {
            const response = await axios.get(
              "http://localhost:3001/api/auth/refresh"
            );
            console.log(response);
          }}
        >
          Click me to get ur cookie
        </button> */}
        <Container>
          <div className="row">
            <div className="col-md-4 container">
              <Card className="shadow">
                <Card.Img variant="top" src="visualisations.jpg" />
                <Card.Body>
                  <Card.Title>View Dashboard</Card.Title>
                  <Card.Text>
                    View the interactive dashboard for valuable insights about
                    car insurance purchases
                  </Card.Text>
                  <br></br>

                  <div className="text-center">
                    <Button variant="primary" href="/home">
                      View Dashboard
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4 container">
              <Card className="shadow">
                <Card.Img variant="top" src="insurance.png" />
                <Card.Body>
                  <Card.Title>Predict for a Customer</Card.Title>
                  <Card.Text>
                    Input details and get a prediction on whether the customer
                    will purchase car insurance.
                  </Card.Text>
                  <br></br>

                  <div className="text-center">
                    <Button variant="primary" href="/home">
                      Predict for Customer
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4 container">
              <Card className="shadow">
                <Card.Img variant="top" src="DataSet.jpg" />
                <Card.Body>
                  <Card.Title>Predict for a Set of Customers</Card.Title>
                  <Card.Text>
                    Input a dataset and get a prediction on whether customers
                    will purchase car insurance.
                  </Card.Text>
                  <br></br>

                  <div className="text-center">
                    <Button variant="primary" href="/leaveApplication">
                      Predict for Dataset
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default ManagerHome;

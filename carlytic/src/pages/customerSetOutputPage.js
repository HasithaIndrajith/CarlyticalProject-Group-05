import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";


const CustomerSetOutputPage = () => {
    return (
        <div>
            <Header />
            <br></br>
            <div className="row">
                <div className="col-md-3 container"></div>

                <div className="col-md-6 container">


                    <div style={{ textAlign: 'center' }}>
                        <Card className="shadow">
                            <div className="row">
                                <div className="col-md-6 container">
                                    <Card.Img variant="top" src="motor.jpeg" />
                                </div>

                                <div className="col-md-6 container">
                                    <Card.Body>
                                        <br></br>
                                        <Card.Title>Predictions for Customer set</Card.Title>
                                        <Card.Text>
                                            Download the prediction dataset here
                                        </Card.Text>
                                        <br></br>
                                        <div className="text-center">
                                            <Button variant="primary" href="#">
                                                Download Dataset
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </div>
                            </div>

                        </Card>
                    </div>
                </div>

                <div className="col-md-3 container"></div>

            </div>
            <br></br>

        </div>

    )
}

export default CustomerSetOutputPage

import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Card from "react-bootstrap/Card";
import { Container } from 'react-bootstrap';


const CustomerOutputPage = () => {
//get output from backend
const [output, setOutput] = useState(true);

    return (
        <div>
            <Header />
            <br></br>
            <div>
                <br></br>
                <div className="row">
                    <div className="col-md-4 container"></div>

                    <div className="col-md-4 container">
                        <Container>
            <div style={{ textAlign: 'center' }}>

                            <Card className="shadow">
                                <Card.Body>
                                    {output ? (
                                        <Card.Title>Yes</Card.Title>
                                    ) : (
                                        <Card.Title>No</Card.Title>
                                    )}

                                    {output ? (
                                        <Card.Text>
                                            Customer will purchase car insurance
                                            <br></br>
                                            Predicted at 84.2% accuracy
                                        </Card.Text>
                                    ) : (
                                        <Card.Text>
                                            Customer will not purchase car insurance
                                            <br></br>
                                            Predicted at 84.2% accuracy
                                        </Card.Text>
                                    )}

                                    <br></br>
                                </Card.Body>
                                {output ? (
                                    <Card.Img variant="top" src="OIP.jpg" />
                                ) : (
                                    <Card.Img variant="top" src="4976537.png" />
                                )}
                            </Card>
                    </div>

                        </Container>
                    </div>

                    <div className="col-md-4 container"></div>
                </div>
            </div>
            <br></br>
            <Footer />
        </div>
    )
}

export default CustomerOutputPage

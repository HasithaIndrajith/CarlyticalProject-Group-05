import React from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer'

const EmployeeHome = () => {
    return (
        <>
            <Header />
            <div>

            <br></br>
                <Container>
                    <div className='row'>
                        <div className='col-md-2 container'></div>

                        <div className='col-md-4 container'>
                            <Card className='shadow'>
                                <Card.Img variant="top" src="motor.jpeg" />
                                <Card.Body>
                                    <Card.Title>Predict for Customer</Card.Title>
                                    <Card.Text>
                                        Input details and get a prediction on whether the customer will purchase car insurance.
                                    </Card.Text>
                                    <br></br>
                                    <div className='text-center'>
                                        <Button variant="primary" href='/predict'>Predict for Customer</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='col-md-4 container'>
                            <Card className='shadow'>
                                <Card.Img variant="top" src="Dataset.jpg" />
                                <Card.Body>
                                    <Card.Title>Predict for a Set of Customers</Card.Title>
                                    <Card.Text>
                                        Input a dataset and get a prediction on whether customers will purchase car insurance.
                                    </Card.Text>
                                    <br></br>
                                    <div className='text-center'>
                                        <Button variant="primary" href='/predict-dataset'>Predict for Dataset</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-md-2 container'></div>



                    </div>
                </Container>
                <br></br>
            </div>
            
            <Footer />


        </>
    )
}

export default EmployeeHome;

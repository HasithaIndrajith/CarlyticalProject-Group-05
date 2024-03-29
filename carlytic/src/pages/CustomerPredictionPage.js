import React from "react";
import axios from "axios";
import { Card, Container, Button, Toast } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Footer from "./Footer";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { MDBRange } from "mdb-react-ui-kit";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Message, useToaster } from "rsuite";
import TextField from "@material-ui/core/TextField";
import "rsuite/dist/rsuite.min.css";

const CustomerPredictionPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [lastDate, setLastDate] = useState(new Date());
  const [balance, setBalance] = useState(0);
  const [daysPassed, setDaysPassed] = useState(-1);
  const [customer, setCustomer] = useState({});
  const [age, setAge] = useState(0);
  const [placement, setPlacement] = React.useState("topCenter");
  const [type, setType] = React.useState("info");
  const toaster = useToaster();
  const message1 = (
    <Message showIcon type={type}>
      "No"
    </Message>
  );
  const message2 = (
    <Message showIcon type={type}>
      "Yes"
    </Message>
  );
  const onSubmit = (data) => {
    // axios({
    //   method: "POST",
    //   url: "http://localhost:3001/predictionOutput",
    // })
    //   .then((response) => {
    //     const res = response.data
    //     setCustomer(({
    //       age : data.age,
    //       job : data.job,
    //       marital : data.marital,
    //       education : data.education,
    //       default : data.default,
    //       hhInsurance : data.hhInsurance,
    //       lastDate : lastDate,
    //       carLoan : data.carLoan,
    //       communication : data.communication,
    //       prevAttempts : data.prevAttempts,
    //       daysPassed : data.daysPassed,
    //       outcome : data.outcome,
    //       startTime : new Date(data.startTime)
    //     }))
    //     console.log(customer);
    //   }).catch((error) => {
    //     if (error.response) {
    //       console.log(error.response)
    //       // console.log(error.response.status)
    //       // console.log(error.response.headers)
    //     }
    //   })

    setCustomer(({
      age: data.age,
      job: data.job,
      marital: data.marital,
      education: data.education,
      default: data.default,
      hhInsurance: data.hhInsurance,
      lastDate: lastDate,
      carLoan: data.carLoan,
      communication: data.communication,
      prevAttempts: data.prevAttempts,
      daysPassed: data.daysPassed,
      outcome: data.outcome,
      startTime: new Date(data.startTime)
    }));
    setAge(62);
    console.log(customer);
    axios
      .post("http://localhost:5000/api/predictcustomer", {
        age: data.age,
        job: data.job,
        marital: data.marital,
        education: data.education,
        default: data.default,
        hhInsurance: data.hhInsurance,
        lastDate: lastDate,
        carLoan: data.carLoan,
        communication: data.communication,
        prevAttempts: data.prevAttempts,
        daysPassed: data.daysPassed,
        outcome: data.outcome,
        startTime: new Date(data.startTime),
      })
      .then((value) => {
        console.log(value.data);
        const notify = () => {
          // eslint-disable-next-line eqeqeq
          if (value.data == "0") {
            toaster.push(message1, { placement });
          // eslint-disable-next-line eqeqeq
          } else if (value.data == "1") {
            toaster.push(message2, { placement });
          }
        };
        notify();
        console.log(notify);
      });
    // console.log(customer);
  };

  return (
    <div>
      <Header />
      <br></br>
      <div className="container-fluid row">
        {/* {message} */}

        <div className="col-md-3 container"></div>
        <div className="col-md-6 container">
          <Container>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="text-center">
                  Predict for Customer
                </Card.Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          placeholder="Age"
                          {...register("age", {
                            required: true,
                          })}
                        />
                        {errors.age && (
                          <p style={{ color: "red" }}>Age is required!</p>
                        )}
                      </Form.Group>
                    </div>
                    <div className='col-md-6'></div>
                  </div>

                  <br></br>
                  <Form.Group>
                    <Form.Label>Job</Form.Label>
                    <br></br>
                    <div className='row'>
                      <div className='col-md-6'>
                        <input type="radio" name="job" value={0}  {...register("job", { required: true })} onChange={(e) => { }} /> admin
                        <br></br>
                        <input type="radio" name="job" value={1}  {...register("job", { required: true })} onChange={(e) => { }} /> blue-collar
                        <br></br>
                        <input type="radio" name="job" value={2}  {...register("job", { required: true })} onChange={(e) => { }} /> entrepreneur
                        <br></br>
                        <input type="radio" name="job" value={3}  {...register("job", { required: true })} onChange={(e) => { }} /> housemaid
                        <br></br>
                        <input type="radio" name="job" value={4}  {...register("job", { required: true })} onChange={(e) => { }} /> management
                      </div>
                      <div className='col-md-6'>
                        <input type="radio" name="job" value={5} {...register("job", { required: true })} onChange={(e) => { }} /> retired
                        <br></br>
                        <input type="radio" name="job" value={6}  {...register("job", { required: true })} onChange={(e) => { }} /> self-employed
                        <br></br>
                        <input type="radio" name="job" value={7}  {...register("job", { required: true })} onChange={(e) => { }} /> services
                        <br></br>
                        <input type="radio" name="job" value={8}  {...register("job", { required: true })} onChange={(e) => { }} /> unemployed
                        <br></br>
                        <input type="radio" name="job" value={9}  {...register("job", { required: true })} onChange={(e) => { }} /> technician

                      </div>
                    </div>
                    {errors.age && <p style={{ color: 'red' }}>Job is required!</p>}
                  </Form.Group>

                  <br></br>

                  <div className="container-fluid row">
                    <Form.Label>Marital Status</Form.Label>
                    <br></br>
                    <div className='col-md-3'>
                      <input type="radio" name="marital" value={1}  {...register("marital", { required: true })} onChange={(e) => { }} /> Married
                    </div>
                    <div className='col-md-3'>
                      <input type="radio" name="marital" value={0} {...register("marital", { required: true })} onChange={(e) => { }} /> Divorced
                    </div>
                    <div className='col-md-3'>
                      <input type="radio" name="marital" value={2} {...register("marital", { required: true })} onChange={(e) => { }} /> Single
                    </div>
                    {errors.marital && (
                      <p style={{ color: "red" }}>
                        Marital status is required!
                      </p>
                    )}
                  </div>

                  <br></br>

                  <div className="container-fluid row">
                    <Form.Label>Educational Level</Form.Label>
                    <br></br>
                    <div className='col-md-3'>
                      <input type="radio" name="education" value={0}  {...register("education", { required: true })} onChange={(e) => { }} /> Primary
                    </div>
                    <div className='col-md-3'>
                      <input type="radio" name="education" value={1} {...register("education", { required: true })} onChange={(e) => { }} /> Secondary
                    </div>
                    <div className='col-md-3'>
                      <input type="radio" name="education" value={2} {...register("education", { required: true })} onChange={(e) => { }} /> Tertiary
                    </div>
                    {errors.education && (
                      <p style={{ color: "red" }}>
                        Educational Level is required!
                      </p>
                    )}
                  </div>

                  <br></br>

                  <div className="container-fluid row">
                    <div className="col-md-6">
                      <Form.Label>Has Default?</Form.Label>
                      <br></br>
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="radio"
                            name="default"
                            value={true}
                            {...register("default", { required: true })}
                            onChange={(e) => {}}
                          />{" "}
                          Yes
                        </div>
                        <div className="col-md-4">
                          <input
                            type="radio"
                            name="default"
                            value={false}
                            {...register("default", { required: true })}
                            onChange={(e) => {}}
                          />{" "}
                          No
                        </div>
                      </div>
                      {errors.default && (
                        <p style={{ color: "red" }}>Default is required!</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <Form.Label>Has HouseHold Insurance?</Form.Label>
                      <br></br>
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="radio"
                            name="hhInsurance"
                            value={true}
                            {...register("hhInsurance", { required: true })}
                            onChange={(e) => {}}
                          />{" "}
                          Yes
                        </div>
                        <div className="col-md-4">
                          <input
                            type="radio"
                            name="hhInsurance"
                            value={false}
                            {...register("hhInsurance", { required: true })}
                            onChange={(e) => {}}
                          />{" "}
                          No
                        </div>
                      </div>
                      {errors.hhInsurance && (
                        <p style={{ color: "red" }}>
                          Household Insurance is required!
                        </p>
                      )}
                    </div>
                  </div>

                  <br></br>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>Last Contact Date</Form.Label>
                        <DatePicker
                          selected={lastDate}
                          value={new Date()}
                          onChange={(date) => setLastDate(date)}
                        />
                        {errors.lastDate && (
                          <p style={{ color: "red" }}>
                            Last Contact Date is required!
                          </p>
                        )}
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Label>Has Car Loan?</Form.Label>
                      <br></br>
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="radio"
                            name="carLoan"
                            value={true}
                            {...register("carLoan", { required: true })}
                            onChange={(e) => {}}
                          />{" "}
                          Yes
                        </div>
                        <div className="col-md-4">
                          <input
                            type="radio"
                            name="carLoan"
                            value={false}
                            {...register("carLoan", { required: true })}
                            onChange={(e) => {}}
                          />{" "}
                          No
                        </div>
                      </div>
                      {errors.carLoan && (
                        <p style={{ color: "red" }}>Car Loan is required!</p>
                      )}
                    </div>
                  </div>

                  <br></br>

                  <div className="container-fluid row">
                    <Form.Label>Communication Mode</Form.Label>
                    <br></br>
                    <div className='col-md-3'>
                      <input type="radio" name="communication" value={2}  {...register("communication", { required: true })} onChange={(e) => { }} /> Cellular
                    </div>
                    <div className='col-md-3'>
                      <input type="radio" name="communication" value={1} {...register("communication", { required: true })} onChange={(e) => { }} /> Telephone
                    </div>
                    <div className='col-md-3'>
                      <input type="radio" name="communication" value={0} {...register("communication", { required: true })} onChange={(e) => { }} /> Other
                    </div>
                    {errors.communication && (
                      <p style={{ color: "red" }}>
                        Communication Mode is required!
                      </p>
                    )}
                  </div>

                  <br></br>

                  <MDBRange
                    min="0"
                    max="50000"
                    id="balance"
                    label="Balance"
                    value={balance}
                    onChange={(e) => {
                      setBalance(e.target.value);
                    }}
                  />

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>No. of Contacts</Form.Label>
                        <Form.Control
                          type="number"
                          name="contacts"
                          min={0}
                          placeholder="No. of contacts"
                          {...register("contacts", {
                            required: true,
                          })}
                        />
                        {errors.contacts && (
                          <p style={{ color: "red" }}>
                            No. of contacts is required!
                          </p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>No. of Previous Attempts</Form.Label>
                        <Form.Control
                          type="number"
                          name="prevAttempts"
                          min={-1}
                          placeholder="No. of prev. attempts"
                          {...register("prevAttempts", {
                            required: true,
                          })}
                        />
                        {errors.prevAttempts && (
                          <p style={{ color: "red" }}>
                            No. of Previous Attempts is required!
                          </p>
                        )}
                      </Form.Group>
                    </div>
                  </div>

                  <br></br>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>No. of days passed</Form.Label>
                        <MDBRange
                          min="-1"
                          max="365"
                          id="daysPassed"
                          value={daysPassed}
                          onChange={(e) => {
                            setDaysPassed(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>Last Call Start Time</Form.Label>
                        <br></br>
                        <TextField
                          type="time"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...register("startTime", { required: true })}
                          onChange={(e) => {}}
                        />
                      </Form.Group>
                      {errors.startTime && (
                        <p style={{ color: "red" }}>
                          Last call start time is required!
                        </p>
                      )}
                    </div>
                  </div>

                  <br></br>

                  <div className="container-fluid row">
                    <Form.Label>Outcome from previous campaign</Form.Label>
                    <br></br>
                    <div className='col-md-3'>
                      <input type="radio" name="outcome" value={1}  {...register("outcome", { required: true })} onChange={(e) => { }} /> Success
                    </div>
                    <div className='col-md-3'>
                      <input type="radio" name="outcome" value={2} {...register("outcome", { required: true })} onChange={(e) => { }} /> Failure
                    </div>
                    <div className='col-md-3'>
                      <input type="radio" name="outcome" value={-1} {...register("outcome", { required: true })} onChange={(e) => { }} /> Other
                    </div>
                    {errors.outcome && (
                      <p style={{ color: "red" }}>
                        Outcome from previous campaign is required!
                      </p>
                    )}
                  </div>

                  <br></br>

                  <div className="row"></div>

                  <br></br>
                  <div style={{ textAlign: "center" }}>
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
                <br></br>
              </Card.Body>
            </Card>
          </Container>

          <br></br>
        </div>
        <div className="col-md-3 container"></div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerPredictionPage;

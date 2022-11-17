import axios from "axios";
import React, { Fragment, useState } from "react";
import "./predictcustomersetpage.css";
import ProgressBar from "react-bootstrap/ProgressBar";

function ProgressBarFunction(props) {
  const now = props.percentage;
  return <ProgressBar now={now} label={`${now}%`} />;
}

function PredictCustomerSetPage() {
  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isError, setIsError] = useState("");
  const [isClickable, setClickable] = useState(false);
  const onInputChange = (e) => {
    setUploadPercentage(0);
    const obj = e.target.files[0];
    if (obj.type === "text/csv") {
      setFile(e.target.files[0]);
      setIsError(false);
      setClickable(true);
    } else {
      setFile(e.target.files[0]);
      setIsError(true);
      setClickable(false);
    }
    console.log(e.target.files[0]);
  };
  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    axios
      .post("http://localhost:3001/api/uploadfile/predictcustomerset", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .then(() => {});
  };

  return (
    <div
      className="containPage"
      style={{ backgroundImage: "url(/motor.jpeg)" }}
    >
      <Fragment>
        <link
          rel="stylesheet"
          href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
          id="bootstrap-css"
        />
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <strong>Upload Files</strong>{" "}
            </div>
            <div className="panel-body">
              <h4>SELECT FILE FROM YOUR DEVICE</h4>
              <div>
                <form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  id="js-upload-form"
                  onSubmit={submitForm}
                >
                  <div className="form-inline">
                    <div className="form-group">
                      <input
                        type="file"
                        multiple
                        name="files[]"
                        id="js-upload-files"
                        onChange={onInputChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary"
                      id="js-upload-submit"
                      // style={{ marginLeft: "50px" }}
                      disabled={!isClickable}
                    >
                      Upload files
                    </button>
                  </div>
                </form>
              </div>
              <hr />
              <h4>Or drag and drop files below</h4>
              <div
                className="upload-drop-zone"
                id="drop-zone"
                onDragStart={(e) => {
                  e.preventDefault();
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setUploadPercentage(0);
                  const obj = e.dataTransfer.files[0];
                  if (obj.type === "text/csv") {
                    setFile(e.dataTransfer.files[0]);
                    setIsError(false);
                    setClickable(true);
                  } else {
                    setFile(e.dataTransfer.files[0]);
                    setIsError(true);
                    setClickable(false);
                  }
                  console.log(e.dataTransfer.files[0].name);
                }}
                draggable
              >
                Just drag and drop files here
              </div>

              <ProgressBarFunction percentage={uploadPercentage} />

              <div className="js-upload-finished">
                <h3>SELECTED FILES</h3>
                <div className="list-group">
                  {isError === true ? (
                    <a
                      href="#"
                      className="list-group-item list-group-item-warning"
                    >
                      <span className="badge alert-warning pull-right">
                        File type not supported
                      </span>
                      {file !== null ? file.name : null}
                    </a>
                  ) : isError === false ? (
                    <a
                      href="#"
                      className="list-group-item list-group-item-success"
                    >
                      <span className="badge alert-success pull-right">
                        Success
                      </span>
                      {file !== null ? file.name : null}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="./uploadPage.js"></script>
      </Fragment>
    </div>
  );
}

export default PredictCustomerSetPage;

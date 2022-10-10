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
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
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
          setTimeout(() => {
            setUploadPercentage(0);
          }, 10000);
        },
      })
      .then(() => {});
  };
  return (
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
            <strong>Upload Files</strong> <small>Bootstrap files upload</small>
          </div>
          <div className="panel-body">
            <h4>Select files from your computer</h4>
            <form
              action=""
              method="post"
              encType="multipart/form-data"
              id="js-upload-form"
              onSubmit={submitForm}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                console.log(e);
              }}
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
                >
                  Upload files
                </button>
              </div>
            </form>

            <h4>Or drag and drop files below</h4>
            <div className="upload-drop-zone" id="drop-zone">
              Just drag and drop files here
            </div>

            <ProgressBarFunction percentage={uploadPercentage} />

            <div className="js-upload-finished">
              <h3>Processed files</h3>
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-success">
                  <span className="badge alert-success pull-right">
                    Success
                  </span>
                  image-01.jpg
                </a>
                <a href="#" className="list-group-item list-group-item-success">
                  <span className="badge alert-success pull-right">
                    Success
                  </span>
                  image-02.jpg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="./uploadPage.js"></script>
    </Fragment>
  );
}

export default PredictCustomerSetPage;

const axios = require("axios");
const request = require("request");

const predictcustomerset = (req, res) => {
  if (req.files === null) {
    return res.status(400).send({
      msg: "No file uploaded",
    });
  }
  const file = req.files.file;
  console.log(`${__dirname}/client/${file.name}`);
  file.mv(`${__dirname}/client/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    const options = {
      url: "http://127.0.0.1:5000/api/uploadfile/predictcustomerset",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8",
        "User-Agent": "my-reddit-client",
      },
      // body: {
      //   file: req.files.file,
      // },
      form: {
        file: req.files.file,
      },
    };
    request(options, function (error, response, body) {
      console.error("error:", error); // Print the error
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the data received
      res.send(body); //Display the response on the website
    });
    // res.json({
    //   fileName: file.name,
    //   filePath: `/uploads/${file.name}`,
    // });
  });

  // const result = axios.post(
  //   "http://localhost:5000/api/uploadfile/predictcustomerset",
  //   file,
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // );
  // console.log(req);
};

module.exports = { predictcustomerset };

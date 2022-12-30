const axios = require("axios");
const request = require("request");

const predictcustomer = (req, res) => {
    console.log(req.body);
    const options = {
      url: "http://127.0.0.1:5000/api/predictcustomer",
      headers: {
        Accept: "application/json",
        json: true,
      },
  
      data: req.body,
    };
    
    request.get(options, function (error, response, body) {
      console.error("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
      res.send(body);
    });
  };
  
  module.exports = { predictcustomer };
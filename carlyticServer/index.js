const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
const dotenv = require("dotenv");
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cookieparser());
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes");
const uploadFileRouter = require("./routes/uploadFile.routes");
const predictCustomerRouter = require("./routes/predictCustomer.routes");
app.get("/", (req, res) => {
  res.send("Hiii");
});
app.use("/api/auth", authRouter);
app.use("/api/uploadfile", uploadFileRouter);
app.use("/api", predictCustomerRouter);

dotenv.config();
const PORT = process.env.PORT || 3001;
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

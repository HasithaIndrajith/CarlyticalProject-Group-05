const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes");

const PORT = 3001;

app.use("/api/auth", authRouter);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

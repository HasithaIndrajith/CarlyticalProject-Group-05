const bcrypt = require("bcrypt");

const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const signin = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const id = userData.id;
  const password = userData.password;
  if (!id || !password) return res.sendStatus(400); //bad request

  try {
    var result;
    result = await authModel.signin(userData);
    // console.log(result);
  } catch (error) {
    console.log("ERROR WHILE GETTING USER BY MEMBERID : " + error);
    return res.status(500).json({ err: error });
  }

  if (result?.length > 0) {
    let role = 0;

    if (result[0].type === 1) {
      role = 1;
      // console.log("I am hereee");
    }

    bcrypt.compare(password, result[0].password, (err, response) => {
      if (err) {
        res.status(401).json({ auth: false });
      }

      if (response) {
        const accessToken = jwt.sign(
          {
            userInfo: {
              id: result[0].userID,
              role: role, // 1 for manager
              email: result[0].email,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "60s" }
        );

        const refreshToken = jwt.sign(
          {
            id,
            role: role, // 1 for manager
            email: result[0].email,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        // Store the refresh token in the database
        var result1 = "";
        try {
          const update = async () => {
            result1 = await authModel.updateRefreshTokenAndLoggedAt(
              refreshToken,
              id
            );
          };
          update();
        } catch (err) {
          res.status(500).json({ err: err });
        }

        res.cookie("jwt", `${refreshToken}`, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          // sameSite: "None",
          // secure: true,
        });
        res.send({ auth: true, accessToken: accessToken, result: result[0] });
      } else {
        console.log("Wrong password provided!!!");
        return res.status(401).json({
          auth: false,
          message: "Please provide the correct password!!!",
          password: false,
        });
      }
    });
  } else {
    console.log("No user found");
    return res.status(401).json({ auth: false, message: "No user found!!!" });
  }
};

const signup = async (req, res) => {
  const userData = req.body;
  if (
    !userData.id ||
    !userData.email ||
    !userData.password ||
    !userData.confirmpassword
  ) {
    return res.sendStatus(400); //bad request
  }
  await authModel
    .checkIDExists(userData.id)
    .then(async (result) => {
      console.log("===================here");
      console.log(result);
      if (result.length > 0) {
        return res.status(200).json({
          success: false,
          message: "User already registered",
          alreadyRegistered: true,
        });
      }
      await authModel
        .signup(userData)
        .then((result) => {
          console.log(result);
          console.log(!result.isMember);
          if (result == true) {
            console.log("Registered successfully!");
            return res.status(201).json({
              success: true,
              message: "User registered successfully",
            });
          }

          if (!result.isMember) {
            return res.status(404).json({
              success: false,
              message: "No member Exists",
              isMember: false,
            });
          }
        })
        .catch((err) => {
          console.log("ERROR WHEN REGISTERING: " + err);
          return res.status(500).json({
            success: false,
            err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        err,
      });
    });
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  await authModel
    .logout(cookies,req,res)
    .then((result) => {
      console.log("Logout successfully!");
      res.clearCookie("jwt").status(200).json({
        message: "Successfully logged out",
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN Logout: " + err);
      res.status(500).json({
        success: false,
        err,
      });
    });
};
const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies;
  console.log("=======");
  if (!req.cookies?.jwt) return res.sendStatus(401);
  const refreshToken = req.cookies.jwt;
  console.log(refreshToken);
  await authModel
    .checkTokenFromDatabase(refreshToken)
    .then((auth) => {
      if (auth.length > 0) {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, decode) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
              {
                userInfo: {
                  id: decode.id,
                  role: decode.role,
                  email: decode.email,
                },
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "60s",
              }
            );
            return res.status(200).json({
              message: "Refresh token successful",
              access_token: accessToken,
            });
          }
        );
      } else {
        throw new Error("No user Found");
      }
    })
    .catch((err) => {
      return res.status(403).json({ message: "Invalid token" });
    });
};
module.exports = { signin, signup, logout, refreshTokenHandler };

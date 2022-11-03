const bcrypt = require("bcrypt");

const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const signin = async (req, res) => {
  const userData = req.body;
  // console.log(userData);
  const id = userData.id;
  const password = userData.password;
  if (!id || !password) return res.sendStatus(400); //bad request

  try {
    var result;
    result = await authModel.signin(userData);
  } catch (error) {
    console.log("ERROR WHILE GETTING USER BY MEMBERID : " + error);
    return res.status(500).json({ err: error });
  }

  if (result?.length > 0) {
    let role = 0;
    console.log(result);
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
          { id ,
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
        // console.log(role);
        // res.cookie("jwt", refreshToken, {
        //   httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000,
        // });
        res.send({ auth: true, accessToken: accessToken, result: result[0] });
      }
    });
  } else {
    res.status(401).json({ auth: false });
  }
};

const signup = async (req, res) => {
  const userData = req.body;
  await authModel
    .signup(userData)
    .then((result) => {
      console.log("Registered successfully!");
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN REGISTERING: " + err);
      res.status(500).json({
        success: false,
        err,
      });
    });
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  await authModel
    .logout(cookies)
    .then((result) => {
      console.log("Logout successfully!");
      res.json({
        success: true,
        result,
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

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
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
                  email:decode.email
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
      }
      else{
        throw
      }
    })
    .catch((err) => {
      return res.status(403).json({ message: "Invalid token" });
    });
};
module.exports = { signin, signup, logout, refreshTokenHandler };

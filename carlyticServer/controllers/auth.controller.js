const bcrypt = require("bcrypt");

const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const signin = async (req, res) => {
  const userData = req.body;
  const id = userData.id;
  const password = userData.password;
  if (!id || !password) return res.sendStatus(400); //bad request

  try {
    var result;
    result = await authModel.signin(userData);
  } catch (error) {
    console.log("ERROR WHILE GETTING USER BY MEMBERID : " + error);
    return res.status(500).json({ err: err });
  }

  if (result?.length > 0) {
    let role = 0;
    if (result[0].type === 1) {
      role = 1;
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
          { id },
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
        console.log(result);
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

module.exports = { signin };

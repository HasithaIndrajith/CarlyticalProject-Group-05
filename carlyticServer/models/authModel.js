const db = require("../db/db");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const signUpSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).required(),
  confirmpassword: Joi.ref("password"),
  email: Joi.string().email().pattern(EMAIL_REGEX).required(),
});

const signin = (userData) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM member inner join user on user.userID=member.memberID where memberID=?",
      userData.id,
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const updateRefreshTokenAndLoggedAt = (refreshToken, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "Update user set refresh_token=?, logged_at=? WHERE userID=?",
      [refreshToken, new Date(), id],
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const signup = (userData) => {
  return new Promise((resolve, reject) => {
    const { error, value } = signUpSchema.validate(userData);
    if (error) {
      return reject(error);
    }

    db.query(
      "SELECT * FROM MEMBER WHERE MEMBERID=?",
      userData.id,
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          if (result.length === 1) {
            const hash = bcrypt.hashSync(userData.password, 9);
            db.query(
              "INSERT INTO USER (USERID,EMAIL,PASSWORD) VALUES ('" +
                userData.id +
                "','" +
                userData.email +
                "','" +
                hash +
                "')",
              (err, result) => {
                if (err) {
                  return reject(err);
                } else {
                  // console.log(result);
                  return resolve(true);
                }
              }
            );
          } else {
            return resolve({ isMember: false });
          }
        }
      }
    );
  });
};

const logout = async (cookies, req, res) => {
  if (!cookies?.jwt) throw "No Cookie Found"; //no content to send
  const refreshToken = cookies.jwt;
  console.log("Refresh Token Exists " + cookies.jwt);

  // chech whether refreshZToken in the database

  const auth = await checkTokenFromDatabase(refreshToken);
  if (!auth) {
    return res.status(404).json({ message: `User does not exist...` });
  }
  //if there is a record then set refreshToken to '';
  const result = await updateRefreshToken(refreshToken);

  console.log(result);

  res.clearCookie("jwt", { httpOnly: true }); // for https we need to pass secure: true
  res.status(200).json({
    message: "Successfully logged out",
  });
};

const checkTokenFromDatabase = (refreshToken) => {
  return new Promise((resolve, reject) => {
    db.query(
      "Select userID from USER where refresh_token=?",
      [refreshToken],
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const updateRefreshToken = (refreshToken, role) => {
  return new Promise((resolve, reject) => {
    console.log(refreshToken);
    db.query(
      "Update USER set refresh_token=? where refresh_token=?",
      [null, refreshToken],
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
};
const checkIDExists = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT USERID FROM USER WHERE USERID=?", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};
module.exports = {
  signin,
  updateRefreshTokenAndLoggedAt,
  signup,
  logout,
  checkTokenFromDatabase,
  checkIDExists,
};

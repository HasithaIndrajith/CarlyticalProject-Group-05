const db = require("../db/db");

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
module.exports = { signin, updateRefreshTokenAndLoggedAt };

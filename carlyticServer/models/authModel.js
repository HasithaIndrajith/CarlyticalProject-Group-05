const db = require("../db/db");

const signin = (userData) => {
  console.log(userData.memberid);
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM member inner join user on user.userID=member.memberID where memberID=?",
      userData.memberid,
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

module.exports = { signin };

const auth = require("./models/authModel");
const db = require("./db/db");
test("Testing signup", async () => {
  const userData = {
    id: "E007",
    email: "test.19@cse.mrt.ac.lk",
    password: "123@testPassword",
  };
  const name = "test";
  const role = 0;

  await new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM MEMBER WHERE MEMBERID=?",
      userData.id,
      (err, deleteResult) => {
        if (err) {
          reject(false);
        } else {
          resolve(deleteResult);
        }
      }
    );
  });

  await new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO MEMBER(memberID,name,type) VALUES ('" +
        userData.id +
        "','" +
        name +
        "','" +
        role +
        "')",
      (err, insertResult) => {
        if (err) {
          reject(false);
        } else {
          resolve(insertResult);
        }
      }
    );
  });
  await new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM USER WHERE USERID=?",
      userData.id,
      (err, deleteResult) => {
        if (err) {
          reject(false);
        } else {
          resolve(deleteResult);
        }
      }
    );
  });

  await auth.signup(userData);
  const dbResult = await new Promise((resolve, reject) => {
    db.query(
      "SELECT userID,email,password FROM USER WHERE USERID=?",
      userData.id,
      (err, dbResult) => {
        if (err) {
          reject(false);
        } else {
          resolve(dbResult);
        }
      }
    );
  });

  expect(dbResult.length).toBe(1);
  expect(userData.id).toBe(dbResult[0].userID);
  expect(userData.email).toBe(dbResult[0].email);
  db.query("DELETE FROM USER WHERE USERID=?", userData.id);
  db.query("DELETE FROM MEMBER WHERE MEMBERID=?", userData.id);
});

test("checkID Exists", async () => {
  const i = "E010";
  const name = "test";
  const role = 0;
  const userData = {
    id: i,
    email: "test.19@cse.mrt.ac.lk",
    password: "123@testPassword",
  };
  await new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM MEMBER WHERE MEMBERID=?",
      userData.id,
      (err, deleteResult) => {
        if (err) {
          reject(false);
        } else {
          resolve(deleteResult);
        }
      }
    );
  });

  await new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO MEMBER(memberID,name,type) VALUES ('" +
        i +
        "','" +
        name +
        "','" +
        role +
        "')",
      (err, insertResult) => {
        if (err) {
          reject(false);
        } else {
          resolve(insertResult);
        }
      }
    );
  });

  await auth.signup(userData);

  const id = await auth.checkIDExists(i);
  expect(id.length).toBe(1);
  expect(id[0].USERID).toBe(i);

  db.query("DELETE FROM USER WHERE USERID=?", userData.id);
  db.query("DELETE FROM MEMBER WHERE MEMBERID=?", userData.id);
});

test("check ID not In", async () => {
  const id = "E010";
  const result = await new Promise((resolve, reject) => {
    db.query("DELETE FROM USER WHERE USERID=?", id, (err, deleteResult) => {
      if (err) {
        reject(false);
      } else {
        resolve(deleteResult);
      }
    });
  });
  const checkIDResult = await auth.checkIDExists(id);
  expect(checkIDResult.length).toBe(0);
});

const auth = require("./models/authModel");
const db = require("./db/db");

test("Testing signup", async () => {
  const userData = {
    id: "E003",
    email: "kajanan.19@cse.mrt.ac.lk",
    password: "123@Kajanan",
    confirmpassword: "123@Kajanan",
  };
  const res = await auth.signup(userData);
  db.query(
    "SELECT * FROM MEMBER WHERE MEMBERID=?",
    userData.id,
    (err, result) => {
      if (err) {
      } else {
        // console.log(result);
        if (result.length === 1) {
          expect(result[0].id).toBe(userData.id);
          expect(result[0].email).toBe(userData.email);
          expect(result[0].password).toBe(userData.password);
        } else {
        }
      }
    }
  );
});

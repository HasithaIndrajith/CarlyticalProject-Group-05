const authModel = require("../models/authModel");

const signin = async (req, res) => {
  const userData = req.body;
  await authModel
    .signin(userData)
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err,
      });
    });
};

module.exports = { signin };

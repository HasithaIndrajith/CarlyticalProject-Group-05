const predictcustomerset = (req, res) => {
  if (req.files === null) {
    return res.status(400).send({
      msg: "No file uploaded",
    });
  }
  const file = req.files.file;
  console.log(`${__dirname}/client/${file.name}`);
  file.mv(`${__dirname}/client/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
    });
  });

  console.log(req);
};

module.exports = { predictcustomerset };

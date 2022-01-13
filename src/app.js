import express from "express";
const app = express();

require("dotenv").config();

const port = process.env.PORT || 1999;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
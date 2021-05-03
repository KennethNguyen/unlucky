import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.listen(8000, () => console.log("Listening on Port 8000"));

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Caching Startegy!");
});

app.use("/cache-aside", require("./cache/cache-aside").router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

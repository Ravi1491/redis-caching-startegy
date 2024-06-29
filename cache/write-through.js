const express = require("express");
const router = express.Router();
const { setDataInRedis } = require("../cache/cache-aside");

// In Write-Through, the application writes data to both the cache and the database simultaneously. Data is written to both the cache and the database at the same time. When data is updated, it is written to the cache and the database simultaneously

router.post("/data/:key", async (req, res) => {
  const key = req.params.key;
  const value = req.body.value;

  const newData = { key, value };

  // Write data to cache
  await setDataInRedis(key, JSON.stringify(newData));

  // Write data to database
  // database[key] = value;

  res.send({ message: "Data written to cache and database", data: newData });
});

module.exports = { router };

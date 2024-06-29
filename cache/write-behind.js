const express = require("express");
const router = express.Router();
const { setDataInRedis } = require("../cache/cache-aside");

// In Write-Behind (Write-Back),
// data is written to the cache first and then to the database at a later time. This allows write operations to be faster, but it can lead to data inconsistencies if the cache is not properly managed.

app.post("/data/:key", async (req, res) => {
  const key = req.params.key;
  const value = req.body.value;

  // Write to the cache
  await setDataInRedis(key, JSON.stringify({ key, value }));

  // Simulate async write to database
  // Also can use queue to manage the write operations in database
  setTimeout(() => {
    // Write to the database (mocked here as a simple operation)
    // database[key] = value;
    console.log("Data written to database asynchronously");
  }, 1000);

  res.send({
    message: "Data written to cache and scheduled for database update",
  });
});

module.exports = { router };

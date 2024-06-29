const express = require("express");
const router = express.Router();
const { getDataFromRedis, setDataInRedis } = require("../cache/cache-aside");

// In Cache-Aside, the application is responsible for managing the cache. When data is requested, the application checks the cache first. If the data is not in the cache, it is retrieved from the database and stored in the cache for future use

router.get("/data/:key", async (req, res) => {
  const key = req.params.key;

  // Check if data is present in cache
  const data = await getDataFromRedis(key);
  if (data) {
    console.log("Data from cache");
    return res.send({ data: JSON.parse(data) });
  }

  // If data is not present in cache, fetch data from database
  console.log("Data from database");
  const newData = { key, value: Math.random() };
  await setDataInRedis(key, JSON.stringify(newData));

  return res.send({ data: newData });
});

exports.router = router;

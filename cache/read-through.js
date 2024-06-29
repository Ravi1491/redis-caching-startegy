const express = require("express");
const router = express.Router();
const { getDataFromRedis, setDataInRedis } = require("../cache/cache-aside");

// In Read-Through, the application reads data from the cache. If the data is not present in the cache, it is fetched from the database and stored in the cache for future use

router.get("/data/:key", async (req, res) => {
  const key = req.params.key;

  // Read data from cache
  let data = await getDataFromRedis(key);
  if (data) {
    console.log("Cache hit");
    return res.send(JSON.parse(data));
  }

  console.log("Cache miss");
  // Simulate database fetch
  data = { key, value: `Value for ${key}` };

  // Store fetched data in cache
  await setDataInRedis(key, JSON.stringify(data));

  res.send(data);
});

module.exports = { router };

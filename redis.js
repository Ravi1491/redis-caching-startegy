const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();
const getDataFromRedis = promisify(client.get).bind(client);
const setDataInRedis = promisify(client.set).bind(client);

module.exports = { getDataFromRedis, setDataInRedis };

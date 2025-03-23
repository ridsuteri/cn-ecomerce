const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("connect", () => {
  console.log("Connected to Redis server");
});

client.on("error", (err) => {
  console.log(`Error connecting to Redis server: ${err}`);
});

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

module.exports = client;

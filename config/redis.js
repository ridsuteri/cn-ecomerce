const redis = require("redis");

// Create a Redis client
try {
  const client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  // Test the connection
  client.on("connect", () => {
    console.log("Connected to Redis server");
  });

  client.on("error", (err) => {
    console.log(`Error connecting to Redis server : ${err}`);
  });
} catch (err) {
  console.log("error with redis configuration", err);
}



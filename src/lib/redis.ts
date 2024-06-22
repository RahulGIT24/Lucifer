import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
    password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;

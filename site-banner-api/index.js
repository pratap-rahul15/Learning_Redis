import express from 'express';
import Redis from 'ioredis';


const app = express();
app.use(express.json());

// Create a Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// banner key in Redis (Setting a constant for the banner key in Redis)
const BANNER_KEY = "app:banner";

// POST endpoint to set the banner message
app.post("/banner", async (req, res) => {

    await redis.set(BANNER_KEY, req.body.message || "Welcome to our site - RPS");

    res.json({ success: true });
});


app.get("/banner", async (req, res) => {
    const bannerMessage = await redis.get(BANNER_KEY);
    res.json({ message });
});

// DELETE endpoint to remove the banner message
app.delete("/banner" ,async (req, res) => {
    await redis.del(BANNER_KEY);
    res.json({ success: true });
});

// GET endpoint to check if the banner message exists
app.get("/banner/exists", async (req, res) => {
    const exists = await redis.exists(BANNER_KEY);
    res.json({ exists: exists === 1 });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

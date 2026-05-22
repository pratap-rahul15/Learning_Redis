import express from 'express';
import Redis from 'ioredis';


const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// To generaqte a random  OTP from a users's phone number.
function otpKey(phone) {
    return `otp:${phone}`;
}

app.post('/otp', async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    await redis.set(otpKey(phone), otp, 'EX', 30); // Store OTP with a TTL of 30 seconds

    res.json({ message: 'OTP sent successfully', otp }); // In production, you would send the OTP via SMS instead of returning it in the response
});

app.post('/otp/verify', async (req, res) => {
    // First fetch the phone number from the otp.
    const { phone, otp } =  req.body;
    const savedOtp = await redis.get(otpKey(phone));

    // If there is no OTP found for the given phone number, it means that the OTP has expired or was never generated.
    if(!savedOtp) {
        return res.status(400).json({ message: 'OTP expired or not found' });
    }

    // If the OTP provided by the user does not match the one stored in Redis, it means that the OTP is invalid.
    if(savedOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });

    }

    // If the otp is valid, we can delete it from Redis to prevent reuse.
    await redis.del(otpKey(phone));
    res.json({ message: 'OTP verified successfully' });

});

// Function to check what is the TTL of the OTP for a given phone number.
app.get('/otp/:phone/ttl', async (req, res) => {
    const ttl = await redis.ttl(otpKey(req.params.phone));
    res.json({ ttl });
});

app.listen(3000, () => {
    console.log('Server running on port 3000 ');
});
import express from 'express';

const app = exrpess();

app.use(express.json());


app.post("/welcome-email", async (req, res) => {
    const job = emailQueue.add("send-welcome-email",
        {
            to: req.body.email,
            name: req.body.name || "User",
        },

        {
            attempts: 3, // Number of times to retry the job if it fails.
            backoff: {
                type: "exponential", // Type of backoff strategy (e.g., fixed, exponential).
                delay: 1000, // Delay in milliseconds before retrying the job.
        },
    }
);
    res.json({ message: "Welcome email job added to the queue.", jobId: job.id });
});
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
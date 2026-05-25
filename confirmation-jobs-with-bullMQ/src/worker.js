// Worker or Consumer processes the jobs in the queue.
import { Worker } from 'bullmq';
import { connection } from './queue.js';


const worker = new worker (
    // Pass 3 parameters to the Worker constructor.(name, iots function (BL), Connection)
    // 1. The name of the queue to listen to or froomw which the message will be picked.
    "emails",
    // 2. The function that will be executed when a job is picked from the queue.
    async (job) => {
        console.log("Processing email jon...", Job.id, Job.name, Job.data);
        (await new Promise((resolve) => setTimeout(resolve, 1500)),
        console.log("Email job processed successfully.", Job.id, Job.name, Job.data));
    },

    // 3. The connection object to connect to Redis.
    { connection }
);

worker.on('completed', (job) => {
    console.log("Job completed.", job.id, job.name, job.data);
});

worker.on('failed', (job, err) => {
    console.log("Job failed.", job.id, job.name, job.data, err);
});
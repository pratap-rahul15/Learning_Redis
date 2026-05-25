import { Queue } from 'bullmq';

const connection = {
    host: 'localhost',
    port: 6379,
};

// Create a BullMQ queue as many as you want.
// You can create as many queues as you want, and they can be used for different purposes.

const emailQueue = new Queue('email', { connection });

// Just export it.
export { emailQueue, connection };
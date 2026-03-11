const cron = require('node-cron');
const Queue = require('bull');

// Create a queue for job management
const jobQueue = new Queue('jobQueue');

// Function to process jobs from the queue
jobQueue.process(async (job) => {
  try {
    // Simulated work to be done
    console.log(`Processing job: ${job.id}`);
    // Your logic for processing the job goes here
  } catch (error) {
    console.error(`Failed to process job ${job.id}:`, error);
    throw error; // Re-throw to allow retry
  }
});

// Schedule a job to run every minute
cron.schedule('* * * * *', () => {
  console.log('Scheduled task running every minute');
  // Add a job to the queue
  jobQueue.add({ scheduledTime: new Date() });
});

// Retry logic
jobQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed, retrying...`);
  // Implement retry logic as needed
  // Example: jobQueue.add(job.data, { attempts: 3 });
});

// Publish a post at a scheduled time
const publishScheduledPost = async (post) => {
  try {
    // Logic for publishing a post
    console.log(`Publishing post: ${post.title}`);
  } catch (error) {
    console.error('Error publishing post:', error);
  }
};

// Example of scheduling a post publish
cron.schedule('0 10 * * *', () => { // Every day at 10 AM
  publishScheduledPost({ title: 'Daily Post' });
});

module.exports = { jobQueue, publishScheduledPost };


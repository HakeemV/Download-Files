import * as fs from 'fs';
import * as readline from 'readline';
// import * as AWS from 'aws-sdk';
import { Transform } from 'stream';

// // Configure AWS with your credentials and desired region
// AWS.config.update({
//   accessKeyId: 'your-access-key',
//   secretAccessKey: 'your-secret-key',
//   region: 'your-region'
// });

// // Create an S3 instance
// const s3 = new AWS.S3();

// Create a readable stream (replace with your own stream source)
// const inputStream = fs.createReadStream('your-input-stream.txt');

// Create a Transform stream to process the lines
const processLinesStream = new Transform({
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\n');
    for (const line of lines) {
      if (line.startsWith('#EXT')) {
        console.log('Line starts with #EXT:', line);
        // Do something specific with this line (e.g., call another function)
      } else {
        console.log('Line does not start with #EXT:', line);
      }
    }
    this.push(chunk);
    callback();
  }
});

// Create a pipeline to process and upload the stream
// inputStream.pipe(processLinesStream);

// // Upload the original stream to S3
// const uploadParams = {
//   Bucket: 'your-bucket-name',
//   Key: 'original-stream.txt',
//   Body: inputStream
// };

// s3.upload(uploadParams, (err, data) => {
//   if (err) {
//     console.error('Error uploading to S3:', err);
//   } else {
//     console.log('Upload successful:', data.Location);
//   }
// });

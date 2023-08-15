import { Readable, Transform } from 'stream';
import { PutObjectCommand,  } from "@aws-sdk/client-s3";
import axios from 'axios';
import {s3Client} from './s3Client';



async function uploadStreamToS3(readableStream: Readable, bucketName: string|undefined, objectKey: string) {

  // readableStream.pipe({
  //   Transform({
  //     objectMode: true, // changes data from buffer to string
  //     transform(chunk, enc, cb) {
  //       const item = JSON.parse(chunk)
  //       // console.log('chunk', JSON.parse(chunk))

  //       const myNumber = /\d+/.exec(item.name)[0]
  //       const isEven = myNumber % 2 === 0
  //       item.name = item.name.concat(isEven ? ' is even' : ' is odd')

  //       cb(null, JSON.stringify(item))
  //     }
  //   })
  // }) add a transform
  // Add the ability to edit the data with a transform call

  const uploadCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    Body: readableStream,
  });

  try {
    await s3Client.send(uploadCommand);
    console.log("Upload successful");
  } catch (err) {
    console.error("Error uploading:", err);
  }
}

export async function upload_to_S3(filePath: string, url: string, bucketName: string|undefined = process.env.BUCKET) {

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const readableStream = response.data;

      uploadStreamToS3(readableStream, bucketName, filePath);
    } else {
      console.error("Error downloading: Status Code", response.status);
    }
  } catch (error: any) {
    console.error("Error downloading:", error.message);
  }
}
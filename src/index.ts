import { Readable } from 'stream';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// Is this accepting the stream
async function uploadStreamToS3(readableStream: Readable, bucketName: string|undefined, objectKey: string) {

  // readableStream.pipe()

  const uploadCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    Body: readableStream,
  });

  try {
    await s3Client.send(uploadCommand);
    console.log('Add the ability to edit the data with a transform call');
    console.log("Upload successful");
  } catch (err) {
    console.error("Error uploading:", err);
  }
}

async function main() {
  const bucketName: string|undefined = process.env.BUCKET;
  const objectKey = 'index.m3u8';
  const url = "https://xis.fifteennet.com/_v10/737468cdc60a4530fc37b79ac3b0b8d69498c6f1d5fa8661f6ea23c0536ab100fe7d8817349b40ab4354e46046a8ca7944d21d1227f702d8ca83d748f9323f1cb9f5872826ef5d7236885d88b78c50e487ecbbb67ee291554b8459c6a7adf6ee9d5c429089f861d9d3bd2c0aaed5f7dd38643461accfd1c0b9abde56c65bc35fe08bfb9f1a9d5d81a1079333998034d6/1080/index.m3u8";
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const readableStream = response.data;

      uploadStreamToS3(readableStream, bucketName, objectKey);
    } else {
      console.error("Error downloading: Status Code", response.status);
    }
  } catch (error: any) {
    console.error("Error downloading:", error.message);
  }
}

main();

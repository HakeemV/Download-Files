// import fs from 'fs';
import https from 'https';
import { Readable } from 'stream';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function uploadStreamToS3(readableStream: any, bucketName: string, objectKey: string) {
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

async function main() {
  const bucketName: any = process.env.BUCKET;
  const objectKey = 'seg-1-v1-a1.jpg';
  const url = "https://xis.fifteennet.com/_v10/737468cdc60a4530fc37b79ac3b0b8d69498c6f1d5fa8661f6ea23c0536ab100fe7d8817349b40ab4354e46046a8ca7944d21d1227f702d8ca83d748f9323f1cb9f5872826ef5d7236885d88b78c50e487ecbbb67ee291554b8459c6a7adf6ee9d5c429089f861d9d3bd2c0aaed5f7dd38643461accfd1c0b9abde56c65bc35fe08bfb9f1a9d5d81a1079333998034d6/1080/seg-1-v1-a1.jpg"; // Replace with the desired URL

  const response = await new Promise<http.IncomingMessage>((resolve, reject) => {
    const request = https.get(url, resolve);
    request.on("error", reject);
  });

  if (response.statusCode === 200) {
    const readableStream = response.read();
    // const readableStream = response;

    uploadStreamToS3(readableStream, bucketName, objectKey);
  } else {
    console.error("Error downloading: Status Code", response.statusCode);
  }
}

main();




// URL of the image
// const url = 'https://xis.fifteennet.com/_v10/737468cdc60a4530fc37b79ac3b0b8d69498c6f1d5fa8661f6ea23c0536ab100fe7d8817349b40ab4354e46046a8ca7944d21d1227f702d8ca83d748f9323f1cb9f5872826ef5d7236885d88b78c50e487ecbbb67ee291554b8459c6a7adf6ee9d5c429089f861d9d3bd2c0aaed5f7dd38643461accfd1c0b9abde56c65bc35fe08bfb9f1a9d5d81a1079333998034d6/1080/index.m3u8';

// const path = `downloads/`;
// const fileName = 'index.m3u8';

// https.get(url,(res) => {


// 	const filePath = fs.createWriteStream(path+fileName);
// 	res.pipe(filePath);
// 	filePath.on('finish',() => {
// 		filePath.close();
// 		console.log('Download Completed');
// 	})
// });



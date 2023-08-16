import { Readable, Transform } from 'stream';
import { ChecksumAlgorithm, PutObjectCommand,  } from "@aws-sdk/client-s3";
import axios from 'axios';
import {s3Client} from './s3Client';

// I need to save the data in the correct folder and file path
// I need to loop through the m3u8 file as I am saving it to the bucket


export function checkStringType(str: string) {
  const fileOnlyRegex = /^[^/]+$/; // Only file name
  const fileWithPathRegex = /[^/]+\/[^/]+$/; // File name with path
  const webUrlRegex = /^https?:\/\/.*\.[a-z]{2,}$/i; // Web URL
  const extRegex = /^#EXT/; // Matches strings starting with #EXT

  if (extRegex.test(str)) {
    return [false, '#EXT', 'temp'];
  } else if (fileOnlyRegex.test(str)) {
    const nameObj = str.match(fileOnlyRegex);
    const fileName = nameObj[0].length > 0? nameObj[0] : 'temp';

    return [true, 'File', ];
  } else if (fileWithPathRegex.test(str)) {
    return [true, 'File with path', str.match(fileWithPathRegex)];
  } else if (webUrlRegex.test(str)) {
    return [true, 'Url', str.match(webUrlRegex)];
  } else {
    return [false, 'Unknown string type', 'temp'];
  }
}

export function removeM3U8File(url: string) {
  const regex = /(.*)\/[^/]*\.m3u8$/;
  const match = url.match(regex);
  return match ? match[1] : url;

  // removeM3U8File(url.com/video.m3u8)
  // returns url.com
}

export function hasM3U8(str: string) {
  const regex = /\.m3u8/i; // The 'i' flag makes the match case-insensitive
  return regex.test(str); // Returns true or false
}

async function uploadStreamToS3(readableStream: Readable, bucketName: string|undefined, objectKey: string) {

  if(hasM3U8(objectKey)) {
    const processLinesStream = new Transform({
      transform(chunk, encoding, callback) {
        const lines = chunk.toString().split('\n');
        for (const line of lines) {

          const lineType = checkStringType(line);
          if (lineType[0]) {
            // console.log('Line starts with #EXT:', line);
            // Do something specific with this line (e.g., call another function)
            console.log('Line says:', line);

          } else {
            // console.log('Line says:', line);
            //
          }
        }
        this.push(chunk);
        callback();
      }
    });
    console.log(processLinesStream);

    readableStream.pipe(processLinesStream);
  }

  // const uploadCommand = new PutObjectCommand({
  //   Bucket: bucketName,
  //   Key: objectKey,
  //   Body: readableStream,
  // });

  // try {
  //   await s3Client.send(uploadCommand);
  //   console.log("Upload successful");
  // } catch (err) {
  //   console.error("Error uploading:", err);
  // }
}

export async function upload_to_S3(filePath: string, url: string, endpoint_reference: string, bucketName: string|undefined = process.env.BUCKET) {

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

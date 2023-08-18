import { Readable , Transform } from 'stream';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import axios, { AxiosResponse } from 'axios';
import {s3Client} from './s3Client';
import { Upload } from '@aws-sdk/lib-storage';

export function checkStringType(str: string) {
  const fileOnlyRegex = /^[^/]+$/; // Only file name
  const fileWithPathRegex = /[^/]+\/[^/]+$/; // File name with path
  const webUrlRegex = /^https?:\/\/.*\.[a-z]{2,}$/i; // Web URL
  const extRegex = /^#EXT/; // Matches strings starting with #EXT

  if (extRegex.test(str)) {
    return ['false', '#EXT', 'temp'];

  } else if (fileOnlyRegex.test(str)) {
    const nameObj = str.match(fileOnlyRegex);
    const fileName = nameObj !== null? nameObj[0] : 'temp';
    return ['true', 'File', fileName];

  } else if (fileWithPathRegex.test(str)) {
    const nameObj = str.match(fileWithPathRegex);
    const fileName = nameObj !== null? nameObj[0] : 'temp';
    return ['true', 'File with path', fileName];

  } else if (webUrlRegex.test(str)) {
    const nameObj = str.match(webUrlRegex);
    const fileName = nameObj !== null? nameObj[0] : 'temp';
    return ['true', 'Url', fileName];
  } else {
    return ['false', 'Unknown string type', 'temp'];
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

async function uploadStreamToS3(readableStream: AxiosResponse<any, any>, bucketName: string|undefined, objectKey: string, url:string, endpoint_reference:string) {

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
          Bucket: bucketName,
          Key: objectKey,
          Body: readableStream.data,
        },

      tags: [
        /*...*/
      ], // optional tags
      // queueSize: 4, // optional concurrency configuration
      // partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      // leavePartsOnError: false, // optional manually handle dropped parts
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await parallelUploads3.done();
  } catch (error) {
    console.log(error);
  }

  if(hasM3U8(objectKey)) {

    const baseUrl = {
      url: removeM3U8File(url),
    };

    const lines = readableStream.data.split('\n');
    lines.forEach((line:string, index:number) => {
      const fileRef = checkStringType(line);

      if(fileRef[0] === 'true' && index % 223 === 0){

        upload_to_S3(fileRef[2], `${baseUrl.url}/${fileRef[2]}`, endpoint_reference);
      }
    });
  }
}

export async function upload_to_S3(filePath: string, url: string, endpoint_reference: string, bucketName: string|undefined = process.env.BUCKET) {

  try {
    const response = await axios.get(url);

    if (response.status === 200) {

      console.log('Response 200');
      uploadStreamToS3(response, bucketName, filePath, url, endpoint_reference);
    } else {
      console.error("Error downloading: Status Code", response.status);
    }
  } catch (error: any) {
    console.error("Error downloading:", error.message);
  }
}

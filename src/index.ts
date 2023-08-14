import fs from 'fs';
import https from 'https'
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const main = async () => {
  const command = new PutObjectCommand({
    Bucket: "test-bucket",
    Key: "hello-s3.txt",
    Body: "Hello S3!",
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

// URL of the image
const url = 'https://xis.fifteennet.com/_v10/737468cdc60a4530fc37b79ac3b0b8d69498c6f1d5fa8661f6ea23c0536ab100fe7d8817349b40ab4354e46046a8ca7944d21d1227f702d8ca83d748f9323f1cb9f5872826ef5d7236885d88b78c50e487ecbbb67ee291554b8459c6a7adf6ee9d5c429089f861d9d3bd2c0aaed5f7dd38643461accfd1c0b9abde56c65bc35fe08bfb9f1a9d5d81a1079333998034d6/1080/index.m3u8';

const path = `./downloads/`;
const fileName = 'index.m3u8';

// const url = 'https://xis.fifteennet.com/_v10/737468cdc60a4530fc37b79ac3b0b8d69498c6f1d5fa8661f6ea23c0536ab100fe7d8817349b40ab4354e46046a8ca7944d21d1227f702d8ca83d748f9323f1cb9f5872826ef5d7236885d88b78c50e487ecbbb67ee291554b8459c6a7adf6ee9d5c429089f861d9d3bd2c0aaed5f7dd38643461accfd1c0b9abde56c65bc35fe08bfb9f1a9d5d81a1079333998034d6/1080/seg-4-v1-a1.html'

https.get(url,(res) => {


	const filePath = fs.createWriteStream(path+fileName);
	res.pipe(filePath);
	filePath.on('finish',() => {
		filePath.close();
		console.log('Download Completed');
	})
});

// open file and get each line

// Asynchronously read the file

const filePath = path+fileName;
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split the file content into lines
  const lines = data.split('\n');
  const newUrl = url.replace(fileName, '');

  // Loop through each line and do something with it
  for (const line of lines) {
    if (line[0] !== '#'){

      https.get(newUrl+line,(res) => {

        const filePath = fs.createWriteStream(path+line);
        res.pipe(filePath);
        filePath.on('finish',() => {
          filePath.close();
          console.log('Download Completed! File name:', line);
        })
      });

    }
  }
});


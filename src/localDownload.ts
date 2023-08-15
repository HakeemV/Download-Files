import axios from 'axios';
import fs from 'fs';


export async function download_local(filePath:string, url: string) {
  try {
    const response = await axios.get(
      url,
      {
        responseType: 'stream',
      }
      );
    // const response = await axios.get(url, { headers: { Accept: 'video/mp4;charset=UTF-8' }});

    if (response.status === 200) {
      // Create a writable stream using fs.createWriteStream
      const fileStream = fs.createWriteStream('./downloads/'+filePath);

      // const readableStream = response.data;
      // Pipe the readable stream to the writable stream

      response.data.pipe(fileStream);

    } else {
      console.error("Error downloading: Status Code", response.status);
    }
  } catch (error: any) {
    console.error("Error downloading:", error.message);
  }
}

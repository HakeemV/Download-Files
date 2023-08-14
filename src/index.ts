import fs from 'fs';
import https from 'https'

// URL of the image
const url = 'https://xis.fifteennet.com/_v10/737468cdc60a4530fc37b79ac3b0b8d69498c6f1d5fa8661f6ea23c0536ab100fe7d8817349b40ab4354e46046a8ca7944d21d1227f702d8ca83d748f9323f1cb9f5872826ef5d7236885d88b78c50e487ecbbb67ee291554b8459c6a7adf6ee9d5c429089f861d9d3bd2c0aaed5f7dd38643461accfd1c0b9abde56c65bc35fe08bfb9f1a9d5d81a1079333998034d6/1080/index.m3u8';

https.get(url,(res) => {
	// Image will be stored at this path
	const path = `./downloads/`;
  const fileName = 'index.m3u8';
	const filePath = fs.createWriteStream(path+fileName);
	res.pipe(filePath);
	filePath.on('finish',() => {
		filePath.close();
		console.log('Download Completed');
	})
})

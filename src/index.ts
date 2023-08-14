// const { chromium } = require('playwright');
import { chromium } from "playwright";


const movieUrl = 'http://demo.borland.com/testsite/download_testpage.php';


(async () => {
  // Launch a new browser instance
  const browser = await chromium.launch({ headless: true });

  // Create a new page
  const page = await browser.newPage();
  await page.goto(movieUrl);


  // Find the routes on the page to download files
  // Try and use this for streaming video data.
  // await page.route('**/*', route => {
  //   route.
  //   if (route.response().url().endsWith('.pdf')) {
  //     const downloadFilePath = './download/test.pdf'; // Specify the desired file path
  //     const buffer = route.response().body();
  //     fs.writeFileSync(downloadFilePath, buffer);
  //     route.abort();
  //   } else {
  //     route.continue();
  //   }
  // });

  // Start waiting for download before clicking. Note no await.
const downloadPromise = page.waitForEvent('download');
await page.locator('#downloadButton').click();
const download = await downloadPromise;
// Wait for the download process to complete
// console.log(await download.path());
// Save downloaded file somewhere
await download.saveAs('./download/test.pdf');

  // Navigate to the URL where the file download is triggered
  // page.on('download', download => download.path().then(console.log));

  // Click on the link or button that initiates the download
  // await page.click('selector-for-download-link-or-button');

  // Wait for the download to complete (you might need to adjust the wait time)
  await page.waitForTimeout(10000); // Wait for 5 seconds (adjust as needed)

  // Close the browser
  await browser.close();
})();

import { upload_to_S3 } from "./upload";
import endpoint from "./endpoint";

const endpoint_reference = endpoint.features.endpoint_reference.name;

endpoint.features.flows.downloader.works.movie.queries.forEach(query => {
  const url = query.work.seed_m3u8;
  upload_to_S3(query.work.label, url, endpoint_reference);
});


// I want to create a function that will take a m3u8 file and grab all of the
// video files afterward.

// matrix_hindi.m3u8 is from
// https://embed.smashystream.com/playere.php?tmdb=603

// This package should be able to do multiple things
// The first is get every kind of video data
// The second is send the data to an S3 bucket or any online storage
// The third is automate downloading multiple m3u8 files
//  i.e. look through the m3u8 file and download the files it calls to
// The fourth is name every file and folder appropriately
// The fifth is log errors and success
// The sixth is to modular enough to simply be called from import and used
// The seventh is to be lightweight and fast.

// If the m3u8 file has more of them in the initail file
// loop through them.
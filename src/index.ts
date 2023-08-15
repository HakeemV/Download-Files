import { upload_to_S3 } from "./upload";

const url = 'https://xis.fifteennet.com/_v10/737468cdc60a4530fc37b79ac3b0b8d69498c6f1d5fa8661f6ea23c0536ab100fe7d8817349b40ab4354e46046a8ca7944d21d1227f702d8ca83d748f9323f1cb9f5872826ef5d7236885d88b78c50e487ecbbb67ee291554b8459c6a7adf6ee9d5c429089f861d9d3bd2c0aaed5f7dd38643461accfd1c0b9abde56c65bc35fe08bfb9f1a9d5d81a1079333998034d6/1080/index.m3u8';

// upload_to_S3('Make_up_test.m3u8', url);

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
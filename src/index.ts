import { checkStringType, removeM3U8File, upload_to_S3 } from "./upload";
import endpoint from "./endpoint";

const endpoint_reference = endpoint.features.endpoint_reference.name;

// endpoint.features.flows.downloader.works.movie.queries.forEach(query => {
//   const url = query.work.seed_m3u8;
//   upload_to_S3(query.work.label, url, endpoint_reference);
// });

// const url = 'https://eerht.artdesigncdn.net/_v10/94d260b0390bf2844191b55b87e13c5b88d2ecacbb0a1847e5c2ae6f19bc60bbed128938bbae1307b419634d5ae5a528e4f392f43cd51d553f6c6b93bb99383aee07d6b5bfe0f3fe219913557b1c186f75fd8cdcbd06be1a53b67fb53bbc9ebd7d0afb211a6d1bdc4b23242cd5a367e4809a229236ee39a7fdc4f6f129a8da4c68755761491412ffc231701d50706a41/1080/seg-4-v1-a1.html';
const url = 'https://eerht.artdesigncdn.net/_v10/94d260b0390bf2844191b55b87e13c5b88d2ecacbb0a1847e5c2ae6f19bc60bbed128938bbae1307b419634d5ae5a528e4f392f43cd51d553f6c6b93bb99383aee07d6b5bfe0f3fe219913557b1c186f75fd8cdcbd06be1a53b67fb53bbc9ebd7d0afb211a6d1bdc4b23242cd5a367e4809a229236ee39a7fdc4f6f129a8da4c68755761491412ffc231701d50706a41/1080/index.m3u8';

const filePath = checkStringType(url);
const filePathComplete = 'index.m3u8'
// const filePathComplete = filePath[0] === 'true' ? filePath[2] : 'temp';
upload_to_S3(filePathComplete, url, endpoint_reference);

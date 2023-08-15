export default {
  languages: ['en'],
  roles: ['downloader'],
  features: {
    endpoint_reference: { name: 'https://embed.smashystream.com' },
    flows: {
      downloader: {
        works: {
          movie: {
            queries: [
              {
                work: {
                  seed_m3u8: 'https://eerht.artdesigncdn.net/_v10/94d260b0390bf2844191b55b87e13c5b88d2ecacbb0a1847e5c2ae6f19bc60bbed128938bbae1307b419634d5ae5a528e4f392f43cd51d553f6c6b93bb99383aee07d6b5bfe0f3fe219913557b1c186f75fd8cdcbd06be1a53b67fb53bbc9ebd7d0afb211a6d1bdc4b23242cd5a367e4809a229236ee39a7fdc4f6f129a8da4c68755761491412ffc231701d50706a41/1080/index.m3u8',
                  label: 'Black Adam',
                  metadata: { imdb_id: 'tt6443346' }, // The work will inherit from models
                  qualities: [] // The different qualities at the link.
                },
              },
            ],
          },
          tv_show: {
            queries: [
              {
                work: {
                  seed_m3u8: 'https://xis.fifteennet.com/_v10/737468cdc60a4530fc37b79ac3b0b8d69498c6f1d5fa8661f6ea23c0536ab100fe7d8817349b40ab4354e46046a8ca7944d21d1227f702d8ca83d748f9323f1cb9f5872826ef5d7236885d88b78c50e487ecbbb67ee291554b8459c6a7adf6ee9d5c429089f861d9d3bd2c0aaed5f7dd38643461accfd1c0b9abde56c65bc35fe08bfb9f1a9d5d81a1079333998034d6/1080/index.m3u8',
                  label: 'Stranger Things',
                  metadata: { imdb_id: 'tt4574334' },
                },
                filter: {
                  seasonsNumbers: [1, 3],
                  episodesNumbers: [1, 4],
                },
              },
            ],
          },
        },
      },
    },
  },
}
export default {
  myApi: {
    input: 'url do render/api-json',
    output: {
      mode: 'tags-split',
      target: './src/api/orval',
      client: 'fetch',
      override: {
        mutator: {
          path: './src/api/fetcher.ts',
          name: 'customFetcher',
        },
      },
    },
  },
};

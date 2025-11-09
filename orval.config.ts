export default {
  myApi: {
    input: 'https://projeto-api-7h8d.onrender.com/api-json',
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

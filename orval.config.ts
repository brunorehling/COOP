export default {
  myApi: {
    input: 'url da api com api-json',
    output: {
      mode: 'tags-split',
      target: './src/api/orval',
      client: 'fetch', // <--- aqui
      override: true,
    },
  },
};

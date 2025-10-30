export default {
  myApi: {
    input: 'url aqui',
    output: {
      mode: 'tags-split',
      target: './src/api/orval',
      client: 'fetch', // <--- aqui
      override: true,
    },
  },
};

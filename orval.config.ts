export default {
  myApi: {
    input: 'api do render aqui/api-json',
    output: {
      mode: 'tags-split',
      target: './src/api/orval',
      client: 'fetch', // <--- aqui
      override: true,
    },
  },
};

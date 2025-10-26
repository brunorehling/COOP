/** @type {import('@orval/core').OrvalConfig} */
export default {
  myApi: {
    input: 'url do render',
    output: {
      mode: 'tags-split', // pode ser 'single' se preferir um único arquivo
      target: './src/api/orval', // gera uma pasta com arquivos por tag
      client: 'axios', // gera funções que usam axios
      override: true, // sobrescreve se já existir
    },
  },
};

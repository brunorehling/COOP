export default {
    coOpApi: {
      output: {
        mode: 'tags-split',
        target: './src/api/orval/',     // onde serão gerados os arquivos
        schemas: './src/api/orval/model', // onde ficam os tipos (opcional)
        client: 'react-query',           // pode ser axios, react-query etc
      },
      input: {
        target: './openapi.yaml',        // ou uma URL: https://api.seudominio.com/openapi.json
      },
    },
  };
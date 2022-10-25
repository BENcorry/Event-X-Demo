import { defineConfig } from 'umi';

export default defineConfig({
  404: true,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},

  proxy: {
    '/apis': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/apis': 'apis' },
    },
  },
});

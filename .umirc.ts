import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/Login' },
    { path: '/back', component: '@/layouts/BackLayout' },
    { path: '/test2', component: '@/pages/Test2' },
  ],
  fastRefresh: {},
  title: '固定资产系统',
  proxy: { '/asset': { target: 'http://localhost:8083', changeOrigin: true } },
  /*
  部署时打开注释
  base:页面路由前缀
  publicPath:css、js、图片等静态资源文件的前缀
 */
  // base: '/asset/',
  // publicPath: '/asset/',
});

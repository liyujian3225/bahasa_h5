import { defineConfig } from "umi";

export default defineConfig({
  npmClient: 'pnpm',
  outputPath: 'mobile',
  alias: {},
  hash: true,  //让 build 之后的产物包含 hash 后缀, 避免浏览器加载缓存
  proxy: {
    '/api': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    }
  },
  theme: {
    '@primary-color': '#1DA57A'
  },
  title: "智慧管理系统",
  routes: [
    { path: "/", component: "home" },
    { path: "/home", component: "home" },
    { path: "/percobaan", component: "percobaan" },
    { path: "/course", component: "course" },
    { path: "/contactUs", component: "contactUs" },
    { path: "/login", component: "login" },
    { path: "/person", component: "person" },
    { path: "/confidentiality", component: "confidentiality" },
  ],
});

import { defineConfig } from "umi";

//配置文件，包含 Umi 所有非运行时配置
export default defineConfig({
  title: "东东印尼语",
  npmClient: 'pnpm',
  outputPath: 'mobile',
  history: { type: 'hash' },
  hash: true,  //让 build 之后的产物包含 hash 后缀, 避免浏览器加载缓存
  mock: false, //关闭 Mock 功能
  clientLoader: {}, //路由数据预加载
  theme: {
    '@primary-color': '#1DA57A'
  },
  proxy: {
    //备用环境
    '/business': {
      'target': 'http://104.155.209.57:9000/business/',
      'changeOrigin': true,
      'pathRewrite': { '^/business' : '' },
    },
    '/file': {
      'target': 'http://104.155.209.57:9000/file/',
      'changeOrigin': true,
      'pathRewrite': { '^/file' : '' },
    }
  },
  routes: [
    { path: "/", component: "home" },
    { path: "/home", component: "home", name: "Selamat datang 欢迎" },
    { path: "/login", component: "login", name: "Selamat datang 欢迎" },
    { path: "/courseCatalog", component: "courseCatalog", name: "课程目录" },
    { path: "/confidentiality", component: "confidentiality", name: "保密协议" },
    { path: "/courseDetail", component: "courseDetail", name: "课程查看" },

    { path: "/courseTry", component: "courseTry", name: "Hubungi Kami 联系我们" },
    { path: "/courseIntroduce", component: "courseIntroduce", name: "课程介绍" },
    { path: "/contactUs", component: "contactUs", name: "Hubungi Kami 联系我们" },
  ],
  alias: {},
  links: [
    {
      rel: "stylesheet",
      type: "text/css",
      href: 'https://g.alicdn.com/apsara-media-box/imp-web-player/2.16.3/skins/default/aliplayer-min.css'
    },
  ],
  headScripts: [
    'https://g.alicdn.com/apsara-media-box/imp-web-player/2.16.3/aliplayer-h5-min.js',
    { src: '/lib/aliplayercomponents-1.0.9.min.js' },
  ],

  plugins: ['@umijs/plugins/dist/dva'],
  dva: {}
});

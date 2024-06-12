import { defineConfig } from "umi";

// 是否是生产环境
const isProductionEnvironment = true;
const baseUrl = isProductionEnvironment ? "http://www.bahasaindo.net" : "http://bahasaindo.com";

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
      'target': baseUrl + '/business/',
      'changeOrigin': true,
      'pathRewrite': { '^/business' : '' },
    },
    '/file': {
      'target': baseUrl + '/file/',
      'changeOrigin': true,
      'pathRewrite': { '^/file' : '' },
    }
  },
  routes: [
    { path: "/", component: "home" },
    { path: "/home", component: "home" },
    { path: "/login", component: "login", name: "Selamat datang 欢迎" },
    { path: "/courseCatalog", component: "courseCatalog", name: "课程分类" },
    { path: "/courseList", component: "courseList", name: "课程目录" },
    { path: "/confidentiality", component: "confidentiality", name: "保密协议" },
    { path: "/courseDetail", component: "courseDetail", name: "课程查看" },
    { path: "/setting", component: "setting", name: "设置" },
    { path: "/doExercises", component: "doExercises", name: "习题练习" },
    { path: "/aboutUs", component: "aboutUs" },
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

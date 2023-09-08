import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "home" },
    { path: "/home", component: "home" },
    { path: "/percobaan", component: "percobaan" },
    { path: "/course", component: "course" },
    { path: "/contactUs", component: "contactUs" },
    { path: "/login", component: "login" },
  ],
  npmClient: 'pnpm',
  hash: true,
  history: {
    type: 'hash'
  }
});

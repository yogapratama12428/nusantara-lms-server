import { createProxyMiddleware } from "http-proxy-middleware";

export const exampleProxy = createProxyMiddleware({
  target: "https://drab-gold-rhinoceros-hose.cyclic.app", // target host with the same base path
  headers: {
    Authorization: "Bearer " + "abcdefghjklm",
    "Content-Type": "application/json",
    pathRewrite: {
      "^/api/": "/", // rewrite path
    },
  },
  changeOrigin: true, // needed for virtual hosted sites
});

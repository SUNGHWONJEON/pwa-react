import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:2222',
//       changeOrigin: true,
//     })
//   )

    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:2222',
            changeOrigin: true
        })
    )
};
import { createProxyMiddleware } from 'http-proxy-middleware';



module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://localhost:2222', 
			changeOrigin: true,
		})
	);
};
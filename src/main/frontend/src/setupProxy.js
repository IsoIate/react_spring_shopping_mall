const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
    app.use(createProxyMiddleware('/api', {
            target: 'http://localhost:8050',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    );
}
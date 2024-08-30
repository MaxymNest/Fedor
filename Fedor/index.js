const { createProxyMiddleware } = require('http-proxy-middleware');

export default function (req, res) {
  const proxy = createProxyMiddleware({
    target: 'https://drive.ебатьтылох.com',
    changeOrigin: true,
    pathRewrite: {
      '^/proxyuuiii': '', // Убираем "/proxy" из пути запроса
    },
    onProxyRes(proxyRes) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Добавляем заголовки CORS
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,OPTIONS,PATCH,DELETE,POST,PUT';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version';
    },
  });

  return proxy(req, res);
}

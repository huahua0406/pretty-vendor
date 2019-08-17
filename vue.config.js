// vue.config.js
module.exports = {
    publicPath: '/',
    lintOnSave: false,
    devServer: {
        open: true, // 配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://118.31.77.247',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};

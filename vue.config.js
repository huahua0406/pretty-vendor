// vue.config.js
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/pretty-vendor/' : '/',
    lintOnSave: false,
    productionSourceMap: false,
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
    },
    configureWebpack: config => {
        if (isProduction) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
            )
        }
    }
};

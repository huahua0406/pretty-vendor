# 零食商贩 Pretty Vendor

> 基于vue全家桶实现的SPA商城

## 在线DEMO：

> [在线演示戳我](https://huahua0406.github.io/pretty-vendor/)（请使用chrome开发者手机演示模式预览）

## 效果截图

![](https://github.com/huahua0406/pretty-vendor/blob/master/screenshots/1.png
)

## 技术栈

- vue-cli
- vue2
- vue-router
- vuex
- vux
- axios
- less
- eslint
- easy-mock

## 目录结构

    ├── README.md
    ├── build                 // 构建服务和webpack配置
    ├── config                // 项目不同环境的配置
    ├── dist                  // 项目build目录
    ├── server                // express服务器
    ├── index.html            // 项目入口文件
    ├── package.json          // 项目依赖包配置文件
    ├── src
    │   ├── common            // 公用的js文件和css样式
    |   ├── components        // 各种通用组件
    |   ├── pages             // 主要页面
    │   ├── router            // 路由相关文件
    │   ├── store             // vuex相关文件
    │   ├── assets            // 图片资源文件
    │   ├── App.vue           // 根组件
    │   └── main.js           // webpack预编译入口
    ├── static                // 静态资源文件

## 安装与运行

``` bash
# 安装依赖
npm install

# 启动服务 (http://localhost:8080)
npm run dev

# 打包
npm run build

# 分析打包文件
npm run build --report
```

## 最后

本项目为开源项目，如有类同，纯属巧合。

喜欢的话就点个star吧！ ^_^
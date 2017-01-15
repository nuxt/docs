---
title: 全局 CSS
description: Nuxt.js 的全局 CSS 示例
github: global-css
---

## 文档

> Nuxt.js 让你可以定义全局 CSS 文件、模块、库（每个页面都会被引入）。

### 使用

在 `nuxt.config.js` 中添加 CSS 资源：

```js
const { resolve } = require('path')

module.exports = {
  css: [
    // 加载一个 node.js 模块
    'hover.css/css/hover-min.css',
    // 同样加载一个 node.js 模块，不过我们定义所需的预处理器
    { src: 'bulma', lang: 'sass' },
    // 项目中的 CSS 文件
    // 最好是能提供一个绝对路径
    resolve(__dirname, 'css/main.css')
  ]
}
```

### 生产环境

在生产环境中，所有的 CSS 都会被压缩和提取到一个叫 `styles.css` 的文件中，这个文件会在页面的 `<head>` 标签中引用。

如果以生产模式启动这个 demo 的话，你就会看到 `<head>` 标签中多了一个 `<link>` 标签：

```bash
npm run build
npm start
```

打开 [http://localhost:3000](http://localhost:3000) 然后查看源代码即可。

---
title: "API: CSS 配置"
description: Nuxt.js 让你可以配置全局的 CSS 文件、模块、库（每个页面都会被引入）。
---

# CSS 配置

> Nuxt.js 让你可以配置全局 CSS 文件、模块、库（每个页面都会被引入）。

- 类型: `Array`
 - 数组元素类型：`String | Object`

如果传入的是对象的话，其属性是：
- src: `String` (文件路径)
- lang: `String` ([所需的预处理器](/faq/pre-processors))

在 `nuxt.config.js` 中添加 CSS 资源：

```js
module.exports = {
  css: [
    // 加载一个 node.js 模块
    'hover.css/css/hover-min.css',
    // 同样加载一个 node.js 模块，不过我们定义所需的预处理器
    { src: 'bulma', lang: 'sass' },
    // 项目中的 CSS 文件
    '~assets/css/main.css',
    // 项目中的 Sass 文件
    { src: '~assets/css/main.scss', lang: 'scss' } // 指定 scss 而非 sass
  ]
}
```

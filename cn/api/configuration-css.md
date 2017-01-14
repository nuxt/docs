---
title: 配置 CSS
description: Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every pages).
---

# Css

> Nuxt.js 让你可以全局定义 CSS 文件、模块、库（每个页面都会被引入）。

- 类型: `Array`
 - `String | Object`

如果传入的是对象的话，其属性是：
- src: `String` (文件路径)
- lang: `String` ([所用到的预处理器](/guide/pages#using-pre-processors))

在 `nuxt.config.js` 中添加 CSS 资源：

```js
module.exports = {
  css: [
    // 加载一个 node.js 模块
    'hover.css/css/hover-min.css',
    // 同样加载一个 node.js 模块，不过定义其所用到的预处理器
    { src: 'bulma', lang: 'sass' },
    // 项目中的 CSS 文件
    '~assets/css/main.css'
  ]
}
```

<p class="Alert">**在生产环境中**, 所有的 CSS 都会被压缩和提取到一个叫 `styles.css` 的文件中，这个文件会在页面的 `<head>` 标签中引用。</p>

---
title: 静态文件
description: Nuxt.js 预设使用 static 的目录用于组织应用的静态文件。
---

> Nuxt.js 预设使用 static 的目录用于组织应用的静态文件。

如果你的静态资源文件需要 Webpack 做构建编译处理，可以放到 [Assets 目录](/guide/assets)，否则可以放到 `static` 目录中去。

Nuxt 服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下，像 `robots.txt` 或 `sitemap.xml` 这种类型的文件就很适合放到 `static` 目录中。

你可以在代码中使用根路径 `/` 结合资源相对路径来引用静态资源：

```html
<!-- 引用 static 目录下的图片 -->
<img src="/my-image.png"/>

<!-- 引用 assets 目录下经过 webpack 构建处理后的图片 -->
<img src="/assets/my-image-2.png"/>
```

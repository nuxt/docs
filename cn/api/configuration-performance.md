---
title: "API: performance 属性"
description: 配置 Nuxt.js 性能选项
---

# performance 属性

> 通过该属性可以配置 Nuxt.js 的性能选项

## gzip

- 类型： `Boolean` 或 `Object`
- 默认值：

```js
{
  threshold: 0
}
```

在生产模式下, Nuxt.js 会使用 [compression](https://github.com/expressjs/compression) 模块来 gzip 应用的所有资源文件。

如果你使用类似 [CloudFare](https://www.cloudflare.com/) 这种服务，鉴于它已经 gzip 每个请求的响应数据，你可以在 `nuxt.config.js` 中禁用该特性：
```js
module.exports = {
  performance: {
    gzip: false
  }
}
```

## prefetch

- 类型： `Boolean`
- 默认值: `true`

In production, nuxt.js uses the [prefetch](https://www.w3.org/TR/resource-hints/#dfn-prefetch) strategy to pre-fetch the pages bundle that will be required when navigating to the next page. When the user will click on a link, nuxt.js will already have pre-fetched the page and the navigation will feel instant while keeping the code splitted.

在生产模式下，Nuxt.js 使用浏览器的[预加载]((https://www.w3.org/TR/resource-hints/#dfn-prefetch))策略来预加载目标页面的脚本资源。所以当用户点击某个链接时，会有一种秒开的感觉。预加载策略使得 Nuxt.js 既可以保持代码分离又能保证页面访问体验。

`prefetch` 特性示例 (请查看当前打开页面的 `<head>` 标签)：
```html
<link rel="prefetch" href="/_nuxt/0.nuxt.bundle.61ba3fe4687aed56a098.js">
<link rel="prefetch" href="/_nuxt/1.nuxt.bundle.0e300058ecb654f36fb7.js">
<link rel="prefetch" href="/_nuxt/2.nuxt.bundle.2617656a084bb6760331.js">
```

当然，你也可以在 `nuxt.config.js` 里禁用该特性：

```js
module.exports = {
  performance: {
    prefetch: false
  }
}
```

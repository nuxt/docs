---
title: "API: performance 属性配置"
description: 配置 nuxt.js 性能设定
---

# performance 属性配置

> 配置 nuxt.js 性能设定

## gzip

- 类型: `Boolean` 或 `Object`
- 默认值:

```js
{
  threshold: 0
}
```

在生产环境(production)，nuxt.js 将会把你所有的资产目录下的档案使用 [compression](https://github.com/expressjs/compression) 做 gzip 压缩

如果你使用类似 [CloudFare](https://www.cloudflare.com/) 的服务，此类服务已经包含 gzip 加速回应，你可以在`nuxt.config.js`中关闭这个选项:

```js
module.exports = {
  performance: {
    gzip: false
  }
}
```

## prefetch

- 类型: `Boolean`
- 默认值: `true`

在生产环境(production)，nuxt.js 使用[prefetch](https://www.w3.org/TR/resource-hints/#dfn-prefetch) 预先载入下一个页面的bundle(.js) 档案，因此当使用者点击了连结，nuxt 已经预先载入那些已经分割过的档案，感觉就像是瞬间完成。

`prefetch` 范例展示 (档案将会在画面渲染后加载在 `<head>` ):
```html
<link rel="prefetch" href="/_nuxt/0.nuxt.bundle.61ba3fe4687aed56a098.js">
<link rel="prefetch" href="/_nuxt/1.nuxt.bundle.0e300058ecb654f36fb7.js">
<link rel="prefetch" href="/_nuxt/2.nuxt.bundle.2617656a084bb6760331.js">
```

如要关闭这项设置，添加下列代码于 `nuxt.config.js`:

```js
module.exports = {
  performance: {
    prefetch: false
  }
}
```
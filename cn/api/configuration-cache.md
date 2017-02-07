---
title: 配置缓存
description: Nuxt.js 使用 lru-cache 提供组件缓存功能以获得更好的渲染性能
---

# 缓存

> Nuxt.js 使用 [lru-cache](https://github.com/isaacs/node-lru-cache) 提供组件缓存功能以获得更好的渲染性能。

## 使用方法

在 `nuxt.config.js` 文件中配置 `cache` 键：
```js
module.exports = {
  cache: true
}
```

`cache` 值的类型可以是 `Boolean` 或 `Object`， 如果是一个对象类型， 它可以使用下面的属性：

| 属性名  | 是否可选? | 类型 | 默认值 | 描述 |
|------|------------|-----|---------|------------|
| `max` | 是 | 整型 | 1000 | 缓存组件的最大数目，当第 1001 个组件被添加至缓存中时， 第一个被缓存的组件会从缓存中移除。 |
| `maxAge` | 是 | 整型 | 900000 | 缓存时间，单位毫秒, 默认是 15 分钟。 |

关于 `cache` 对象的可用配置项，请查看 [lru-cache 配置项](https://github.com/isaacs/node-lru-cache#options) 文档。

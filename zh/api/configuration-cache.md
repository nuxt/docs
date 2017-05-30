---
title: 'API: 缓存配置'
description: Nuxt.js 使用 lru-cache 提供组件缓存功能以获得更好的渲染性能
---

# 缓存配置

> Nuxt.js 使用 [lru-cache](https://github.com/isaacs/node-lru-cache) 提供组件缓存功能以获得更好的渲染性能。

## 使用方法

- 类型： `Boolean` 或 `Object` (默认值：`false`)

如果是一个对象类型，其配置属性可以参考 [lru-cache 配置项](https://github.com/isaacs/node-lru-cache#options)。

例如 (`nuxt.config.js`)：

```js
module.exports = {
  cache: true
  // or
  cache: {
    max: 1000,
    maxAge: 900000
  }
}
```

如 `cache` 设定的值为  `true`，那么相当于应用了下面的默认配置：

属性名 | 是否可选? | 类型 | 默认值 | 描述
--- | --- | --- | --- | ---
`max` | 是 | 整型 | 1000 | 缓存组件的最大数目，当第 1001 个组件被添加至缓存中时， 第一个被缓存的组件会从缓存中移除。
`maxAge` | 是 | 整型 | 900000 | 缓存时间，单位毫秒, 默认是 15 分钟。

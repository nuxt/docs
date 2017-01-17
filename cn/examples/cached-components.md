---
title: 缓存组件
description: Nuxt.js 的组件缓存示例
github: cached-components
---

## 文档

> Nuxt.js 用 [lru-cache](https://github.com/isaacs/node-lru-cache) 来缓存组件，以获取更好的渲染性能

### 使用方法

在 `nuxt.config.js` 中 配置 `cache` 字段：
```js
module.exports = {
  cache: true
}
```

`cache` 可以是布尔值或者对象。如果传对象的话，你可以用以下这些字段：

| 属性字段  | 可选？ | 类型 | 默认值 | 定义 |
|------|------------|-----|---------|------------|
| `max` | 可选 | Integer | 1000 | 组件缓存的最大数量。当第 1001 个组件被缓存时，最旧的那个就会从缓存里被移除。 |
| `maxAge` | 可选 | Integer | 900000 | 最大缓存时间值（单位毫秒 ms），默认是 15 分钟。 |

其它可选项：https://github.com/isaacs/node-lru-cache#options

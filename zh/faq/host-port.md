---
title: 如何更改应用的主机和端口配置？
description: 如何更改 Nuxt.js 应用的主机和端口配置？
---

# 如何更改应用的主机和端口配置？

可以通过两种方式配置主机和端口：

- 通过环境变量
```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```
- 通过在 `package.json` 中进行配置：
```js
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```

---
title: "API: <nuxt-link> 组件"
description: nuxt-link 组件用于在页面中添加链接至别的页面。
---

# &lt;nuxt-link&gt; 组件

> nuxt-link 组件用于在页面中添加链接至别的页面。

目前 `<nuxt-link>` 的作用和 [`<router-link>`](https://router.vuejs.org/zh-cn/api/router-link.html) 一致，推荐阅读 [Vue路由文档](https://router.vuejs.org/zh-cn/api/router-link.html) 来了解它的使用方法。

例如 (`pages/index.vue`)：

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about">关于</nuxt-link>
  </div>
</template>
```

将来我们会为 `nuxt-link` 组件增加更多的功能特性，例如资源预加载，用于提升 nuxt.js 应用的响应速度。

---
title: 浏览器热加载垫片
description: 如何添加支持浏览器热加载的垫片？
---

# 如何添加支持浏览器热加载的垫片？

开发环境中，部分浏览器控制台会提示：
```
You are running Vue in development mode.
webpack-hot-middleware's client requires EventSource to work. You should include a polyfill if you want to support this browser: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools
```

## 解决方法：

```
yarn add --dev eventsource-polyfill
```
在 `nuxt.config.js` 中添加：

```
 build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if(ctx.idDev) {
        config.entry.push('eventsource-polyfill')
      }
    }
  }
```

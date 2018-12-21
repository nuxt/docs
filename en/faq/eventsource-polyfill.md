---
title: A polyfill to support browser
description: How to include a polyfill to support browser?
---

# How to include a polyfill to support browser?

```
You are running Vue in development mode.
webpack-hot-middleware's client requires EventSource to work. You should include a polyfill if you want to support this browser: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools
```

```
yarn add --dev eventsource-polyfill
```
In `nuxt.config.js`：

```
 build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if(ctx.isDev) {
        config.entry.push('eventsource-polyfill')
      }
    }
  }
```

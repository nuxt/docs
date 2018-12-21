---
title: Cross origin resource sharing
description: How to share cross origin resource?
---

# How to share cross-origin resource?

[The solution of cross origin resource sharing in Nuxt.js ](https://github.com/nuxt-community/proxy-module#readme)

```
npm i @nuxtjs/proxy -D
```

In nuxt.config.js 

```
 modules: [
      '@nuxtjs/axios',
      '@nuxtjs/proxy'
  ],
proxy: {
  '/api': {
    target: 'http://example.com',
    pathRewrite: {
      '^/api' : '/'
      }
    }
}
```

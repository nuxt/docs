---
title: Cross origin resource sharing (EN)
description: How to share cross origin resource?
---

# How to share cross-origin resource? (EN)

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

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>

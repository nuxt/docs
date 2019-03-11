---
title: クロスオリジンリソース共有
description: クロスオリジンリソースを共有するには？
---

# クロスオリジンリソースを共有するには？

[Nuxt.js においてのクロスオリジンリソース共有の解決策](https://github.com/nuxt-community/proxy-module#readme)

```
npm i @nuxtjs/proxy -D
```

nuxt.config.js は以下のように記述します。

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

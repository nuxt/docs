---
title: クロスオリジンリソース共有
description: クロスオリジンリソースを共有するには？
---

# クロスオリジンリソースを共有するには？

[Nuxt.js においてのクロスオリジンリソース共有の解決策](https://github.com/nuxt-community/proxy-module#readme)

```
npm i @nuxtjs/proxy -D
```

nuxt.config.js で以下のように記述。

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

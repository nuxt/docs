---
title: Webpack 설정의 확장
description: Webpack 설정을 확장하려면?
---

<!-- title: Extend Webpack -->
<!-- description: How to extend webpack config? -->

<!-- # How to extend webpack config? -->

# Webpack 설정을 확장하려면?

<!-- You can extend the webpack configuration via the `extend` option in your `nuxt.config.js`: -->

`nuxt.config.js` 의 `extend` 옵션에 Webpack 설정을 확장할 수 있습니다:

```js
module.exports = {
  build: {
     extend (config, { isDev, isClient }) {
       // ...
     }
  }
}
```

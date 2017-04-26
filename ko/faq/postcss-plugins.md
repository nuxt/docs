---
title: PostCSS 플러그인
description: PostCSS 플러그인을 추가하려면?
---

# PostCSS 플러그인을 추가하려면?

<!-- In your `nuxt.config.js` file: -->

`nuxt.config.js` 파일에 다음처럼 작성합니다:

```js
module.exports = {
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
    ]
  }
}
```

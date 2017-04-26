---
title: PostCSS 플러그인
description: PostCSS 플러그인을 추가하려면?
---

# PostCSS 플러그인을 추가하려면?

`nuxt.config.js` 파일에 다음과 같이 작성합니다:

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

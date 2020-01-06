---
title: Плагины Postcss
description: Как добавить плагины Postcss?
---

# Как добавить плагины Postcss?

В вашем файле конфигурации nuxt.config.js укажите:

```js
module.exports = {
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')()
    ]
  }
}
```

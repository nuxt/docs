---
title: Расширение конфигурации Webpack
description: Как расширить конфигурацию Webpack в моём Nuxt.js приложении?
---

# Как расширить конфигурацию Webpack?

Вы можете расширить конфигурацию Webpack с помощью опции `extend` в вашем `nuxt.config.js`:

```js
module.exports = {
  build: {
     extend (config, { dev, isClient }) {
       // ...
     }
  }
}
```

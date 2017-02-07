---
title: Postcss 插件
description: 如何添加 postcss 插件?
---

# 如何添加 postcss 插件?

可在 `nuxt.config.js` 文件增加以下配置来添加 postcss 插件：

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

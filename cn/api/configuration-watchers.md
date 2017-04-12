---
title: "API: watchers 属性配置"
description: watchers 属性放你複寫 watchers 配置.
---

# watchers 属性配置

- 类型： `Object`
- 默认值： `{}`

> watchers 属性放你複寫 watchers 配置.

## chokidar

- 类型： `Object`
- 默认值： `{}`

了解更多 chokidar 配置 [chokidar API](https://github.com/paulmillr/chokidar#api).

## webpack


- 类型： `Object`
- 默认值：

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

了解更多 webpack watchoptions 配置 [webpack documentation](https://webpack.js.org/configuration/watch/#watchoptions).
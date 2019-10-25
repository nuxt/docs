---
title: "API: The Nuxt Class"
description: Nuxt Core 类
---

# Nuxt Class

- 来源: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

这是核心容器，允许所有模块和类相互通信。所有模块都可以使用`this.nuxt`访问Nuxt实例。

## Hooks

我们可以在某些生命周期事件中注册hooks。

```js
nuxt.hook('ready', async (nuxt) => {
  // Your custom code here
})
```

Plugin   | Arguments              | When
---------|------------------------|------------------------------------------------------------------------------
`ready`  | (nuxt)                 | Nuxt实例初始化 (`ModuleContainer` 和 `Renderer` 已经准备好).
`error`  | (error)                | 调用hooks时出现未处理的错误。
`close`  | (nuxt)                 | Nuxt实例优雅地关闭。
`listen` | (server, {host, port}) | Nuxt**内部**服务器开始监听。 (使用 `nuxt start` 或 `nuxt dev`).

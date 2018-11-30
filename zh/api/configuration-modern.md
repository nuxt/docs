---
title: "API: modern 属性"
description: Build and server a modern bundle
---

# The modern Property

> 此功能的想法来自 [vue-cli modern mode](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode) 

- 类型: `String` 或 `Boolean`
  - 默认: false
  - 可能的值:
    - `'client'`: 同时提供现代捆绑打包`<script type ="module">`和旧捆绑打包`<script nomodule>脚本，同时为现代捆绑打包提供`<link rel ="modulepreload">`。每个了解模块类型的浏览器都会加载现代软件包，而旧版浏览器则会回归到旧版浏览器（已编译）。
    - `'server'` or `true`: Node.js服务器将根据用户代理检查浏览器版本，并提供相应的现代或旧版捆绑。
    - `false`: 关闭 modern 打包

捆绑打包的两个版本是:

1. Modern bundle: 定位支持ES模块的现代浏览器
1. Legacy bundle: 基于babel配置定位旧浏览器（默认情况下兼容IE9）。

**Info:** 你可以使用命令`nuxt build/start --modern=[type]`或`nuxt build/start -m=[type]`来构建/启动现代捆绑包，这样你就可以在`package.json`脚本中指定现代命令：

```json
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

> 请参阅 [Phillip Walton's excellent post](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) 来了解更多关于modern builds信息.

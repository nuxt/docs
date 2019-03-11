---
title: "API: ignore 属性"
description: 为Nuxt.js应用程序自定义忽略文件
---

# ignorePrefix 属性

- 类型: `String`
- 默认: `'-'`

> 如果文件名以`ignorePrefix`指定的前缀开头，则在构建打包期间将忽略pages / layout / middleware /或store /中的任何文件

默认情况下，所有以 `-` 开头的文件都将被忽略，例如`store / -foo.js`和`pages / -bar.vue`。

# ignore 属性

- 类型: `Array`
- 默认: `['**/*.test.*', '**/*.spec.*']`

> 比`ignorePrefix`更简单：在构建中将忽略匹配在`ignore`内指定的`ignore`模式的所有文件。

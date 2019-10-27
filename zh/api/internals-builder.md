---
title: "API: The Builder Class"
description: Nuxt `Builder` Class
---

# Builder Class

- 来源: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## Hooks

我们可以在某些生命周期事件中注册钩子。

```js
// Add hook for build
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

Hook                 | Arguments                                  | When
---------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------
`build:before`       | (nuxt, buildOptions)                       | 在Nuxt构建开始之前
`build:templates`    | ({ templateFiles, templateVars, resolve }) | 生成`.nuxt`模板文件
`build:extendRoutes` | (routes, resolve)                          | 生成 路由
`build:compile`      | ({ name, compiler })                       | 在webpack编译之前（编译器是webpack`编译器`实例），如果是通用模式，则调用两次名称为`'client'`和`'server'`
`build:compiled`     | ({ name, compiler, stats })                | webpack构建完成
`build:done`         | (nuxt)                                     | Nuxt构建完成

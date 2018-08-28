---
title: 目录结构
description: Nuxt.js 的应用目录架构提供了良好的代码分层结构，适用于开发或大或小的应用。
---

> Nuxt.js 的应用目录架构提供了良好的代码分层结构，适用于开发或大或小的应用。 当然，你也可以根据自己的偏好组织应用代码。

## 目录

### 资源目录

资源目录 `assets` 用于组织未编译的静态资源如 `LESS`、`SASS` 或 `JavaScript`。

[关于 assets 目录的更多信息](/guide/assets)

### 组件目录

组件目录 `components` 用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 `asyncData` 方法的特性。

### 布局目录

布局目录 `layouts` 用于组织应用的布局组件。

_该目录名为Nuxt.js保留的，不可更改。_

[关于布局的更多信息](/guide/views#布局)

### 中间件目录

`middleware` 目录用于存放应用的中间件。

[关于中间件的更多信息](/guide/routing#中间件)

### 页面目录

页面目录 `pages` 用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 `.vue` 文件并自动生成对应的路由配置。

_该目录名为Nuxt.js保留的，不可更改。_

[关于页面的更多信息](/guide/views)

### 插件目录

插件目录 `plugins` 用于组织那些需要在 `根vue.js应用` 实例化之前需要运行的 Javascript 插件。

[关于插件的更多信息](/guide/plugins)

### 静态文件目录

静态文件目录 `static` 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。
服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下。

**举个例子:** /static/robots.txt 映射至 /robots.txt

_该目录名为Nuxt.js保留的，不可更改。_

[关于静态文件的更多信息](/guide/assets#静态文件)

### Store 目录

`store` 目录用于组织应用的 [Vuex 状态树](http://vuex.vuejs.org) 文件。
Nuxt.js 框架集成了 [Vuex 状态树](http://vuex.vuejs.org) 的相关功能配置，在 `store` 目录下创建一个 `index.js` 文件可激活这些配置。

_该目录名为Nuxt.js保留的，不可更改。_

[关于 store 的更多信息](/guide/vuex-store)

### nuxt.config.js 文件

`nuxt.config.js` 文件用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。

_该文件名为Nuxt.js保留的，不可更改。_

[关于 nuxt.config.js 的更多信息](/guide/configuration)

### package.json 文件

`package.json` 文件用于描述应用的依赖关系和对外暴露的脚本接口。

_该文件名为Nuxt.js保留的，不可更改。_

## 别名

| 别名 | 目录 |
|-----|------|
| ~ | / |
| ~assets | /assets |
| ~components | /components |
| ~middleware | /middleware |
| ~pages | /pages |
| ~plugins | /plugins |
| ~static | /static |
| ~store | /store |

文件别名：

| 别名 | 使用方法 | 描述 |
|-------|------|--------------|
| ~store | `const store = require('~store')` | 导入 `vuex` 状态树实例。 |
| ~router | `const router = require('~router')`| 导入 `vue-router` 实例。 |

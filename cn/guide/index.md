---
title: 关于 Nuxt.js
description: "2016年10月25日, zeit.co背后的团队对外发布了Next.js, 一个React的服务端渲染应用框架。几小时后, 和Next.js异曲同工的想法，一个基于Vue.js的服务端渲染应用框架应运而生且接踵而来，我们称之为： Nuxt.js。"
---

> 2016年10月25日, [zeit.co](https://zeit.co/)背后的团队对外发布了[Next.js](https://zeit.co/blog/next), 一个React的服务端渲染应用框架。几小时后, 和Next.js异曲同工的想法，一个基于[Vue.js](https://vuejs.org)的服务端渲染应用框架应运而生且接踵而来，我们称之为： **Nuxt.js**。

## Nuxt.js 是什么？

Nuxt.js 是一个基于 Vue.js 的通用应用框架。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 **UI渲染**。

我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有Node.js项目中使用 Nuxt.js。

Nuxt.js 预设了利用Vue.js开发**服务端渲染**的应用所需要的各种配置。

除此之外，我们还提供了一种开发选项命令叫：*nuxt generate*。为基于Vue.js的应用提供生成对应的静态站点的功能。

我们相信这个开发选项所提供的功能，为开发集成各种微服务（miscroservices）的Web应用迈开了新的脚步。

既然是框架，Nuxt.js 为 `客户端/服务端` 这种典型的应用架构模式提供了许多有用的特性，例如异步数据、中间件、布局，等等。

## Nuxt.js 应用是如何构建的？

![基于Vue、Webpack和Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js 集成了以下组件/框架，用于开发完整而强大的Web应用：
- [Vue 2](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex) (included only when using the [store option](/guide/vuex-store))
- [Vue-Meta](https://github.com/declandewet/vue-meta)

压缩并gzip后，总代码大小为: **28kb** （如果使用了vuex特性的话为31kb）。

另外，Nuxt.js 使用[Webpack](https://github.com/webpack/webpack) 和 [vue-Loader](https://github.com/vuejs/vue-loader) 、 [babel-loader](https://github.com/babel/babel-loader) 来处理代码的自动化构建工作（如打包、代码分层、压缩等等）。

## 特性

- 基于 Vue.js
- 自动代码分层
- 服务端渲染
- 强大的路由功能，支持异步数据
- 静态文件服务
- ES6/ES7 语法支持
- 打包和压缩 JS 和 CSS
- HTML头部标签管理
- 本地开发支持热加载
- 集成ESLint
- 支持各种样式预处理器： SASS、LESS、 Stylus等等

## 服务端渲染

你可以使用 Nuxt.js 作为你项目的UI渲染框架。

当运行 `nuxt` 命令时，会启动一个支持 `热加载` 和 `服务端渲染`（基于Vue.js的 `vue-server-renderer` 模块）的开发服务器。

可以瞅瞅 Nuext.js 提供的各种 [命令](/guide/commands) 以了解更多的信息。

如果你的项目有自己的Web服务器（例如用express.js启动的Web服务），你仍然可以将 Nuxt.js 当作是中间件来使用，负责UI渲染部分的功能。在开发通用的Web应用过程中，Nuxt.js 是可插拔的，没有太多的限制，可通过 [开发编码中使用Nuxt.js](/api) 了解更多的信息。

## 静态化

支持 Vue.js 应用的静态化算是 Nuxt.js 的一个创新点，通过 `nuxt generate` 命令实现。

该命令依据应用的路由配置将每一个路由静态化成为对应的HTML文件。

举个栗子：

```bash
-| pages/
----| about.vue
----| index.vue
```

静态化后变成：
```
-| dist/
----| about/
------| index.html
----| index.html
```

静态化可以让你在任何一个静态站点服务商托管你的Web应用。

Nuxt.js的官网[nuxtjs.org]就是一个绝佳的例子, 它静态化后托管于Github Pages：
- [源码](https://github.com/nuxt/nuxtjs.org)
- [静态化后的文件](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

在每次更新[文档代码](https://github.com/nuxt/docs)的时候，为了避免手工执行 `nuxt generate` 命令生成静态文件，我们可以在每次提交代码的时候调用一个AWS Lambda函数来做以下的事情：
1. 拷贝 [nuxtjs.org 源码](https://github.com/nuxt/nuxtjs.org)
2. 使用 `npm install` 命令安装依赖
3. 运行 `nuxt generate`
4. 将生成的 `dist` 目录提交至 `gh-pages` 分支

嘿嘿，这样是不是相当于拥有一个 **无服务端的自动静态化的Web应用** 了呢 :)

我们还可以YY下电商应用的场景，利用 `nuxt generate`，是不是可以将应用静态化后部署在CDN服务器，每当一个商品的库存发生变化时，就重新静态化下，更新下商品的库存。这样使得用户在应用中能访问到最新的商品信息而不需要做额外的接口调用。相对于传统的电商应用来说，这种静态化的方案节省了服务器的资源，甚至连缓存服务都不需要了。

> 译者注：上面这段不怎么好译，不知道是否表达清楚了作者的愿意。另外这种YY的方案感觉不大靠谱，实际的电商应用复杂太多了~

---
title: 视图
description: 视图章节的内容阐述了如何在 Nuxt.js 应用中为指定的路由配置数据和视图，包括页面、布局和HTML头部等内容。
---

> 本章节的内容阐述了如何在 Nuxt.js 应用中为指定的路由配置数据和视图，包括应用模板、页面、布局和HTML头部等内容。

## 模板

> 你可以定制化 Nuxt.js 默认的应用模板。

定制化默认的 html 模板，只需要在应用根目录下创建一个 `app.html` 的文件。

默认模板为：

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

举个例子，你可以修改模板添加 IE 的条件表达式：

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## 布局

Nuxt.js 允许你扩展默认的布局，或在 `layout` 目录下创建自定义的布局。

### 默认布局

可通过添加 `layouts/default.vue` 文件来扩展应用的默认布局。

*别忘了在布局文件中添加 `<nuxt/>` 组件用于显示页面的主体内容。*

默认布局的源码如下：
```html
<template>
  <nuxt/>
</template>
```

### 错误页面

> 你可以通过编辑 `layouts/error.vue` 文件来定制化错误页面.

这个布局文件不需要包含 `<nuxt/>` 标签。你可以把这个布局文件当成是显示应用错误（404，500等）的组件。

默认的错误页面源码在 [这里](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue).

举一个个性化错误页面的例子 `layouts/error.vue`:
```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // 你可以为错误页面指定自定义的布局
}
</script>
```

### 个性化布局

> `layouts` *根*目录下的所有文件都属于个性化布局文件，可以在页面组件中利用 `layout` 属性来引用。

*请确保在布局文件里面增加 `<nuxt/>` 组件用于显示页面非布局内容。*

举个例子 `layouts/blog.vue`:
```html
<template>
  <div>
    <div>这里是博客导航</div>
    <nuxt/>
  </div>
</template>
```

在 `pages/posts.vue` 里， 可以指定页面组件使用 blog 布局。
```html
<script>
export default {
  layout: 'blog'
}
</script>
```

更多关于页面布局配置项的信息，请参考[页面布局配置API](/api/pages-layout)。

看下 [示例视频](https://www.youtube.com/watch?v=YOKnSTp7d38) 立刻体验下。

## 页面

页面组件实际上是 Vue 组件，只不过 Nuxt.js 为这些组件添加了一些特殊的配置项（对应 Nuxt.js 提供的功能特性）以便你能快速开发通用应用。

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    // called every time before loading the component
    return { name: 'World' }
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```

Nuxt.js 为页面提供的特殊配置项：

| 属性名 | 描述 |
|-----------|-------------|
| asyncData | 最重要的一个键, 支持 [异步数据处理](/guide/async-data)，另外该方法的第一个参数为当前页面组件的 [上下文对象](/api#上下文对象)。|
| fetch | 与 `asyncData` 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 `fetch` 方法不会设置组件的数据。详情请参考 [关于fetch方法的文档](/api/pages-fetch)。 |
| head | 配置当前页面的 Meta 标签, 详情参考 [页面头部配置API](/api/pages-head)。 |
| layout | 指定当前页面使用的布局（`layouts` 根目录下的布局文件）。详情请参考 [关于 布局 的文档](/api/pages-layout)。 |
| transition | 指定页面切换的过渡动效, 详情请参考 [页面过渡动效](/api/pages-transition)。 |
| scrollToTop | 布尔值，默认: `false`。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于 [嵌套路由](/guide/routing#嵌套路由)的应用场景。 |
| validate | 校验方法用于校验 [动态路由](/guide/routing#动态路由)的参数。 |
| middleware | 指定页面的中间件，中间件会在页面渲染之前被调用， 请参考 [路由中间件](/guide/routing#中间件)。|

关于页面配置项的详细信息，请参考 [页面 API](/api)。

## HTML 头部

Nuxt.js 使用了 [`vue-meta`](https://github.com/declandewet/vue-meta) 更新应用的 `头部标签(Head)` and `html 属性`。

Nuxt.js 使用以下参数配置 `vue-meta`:
```js
{
  keyName: 'head', // 设置 meta 信息的组件对象的字段，vue-meta 会根据这 key 值获取 meta 信息
  attribute: 'n-head', // vue-meta 在监听标签时所添加的属性名
  ssrAttribute: 'n-head-ssr', // 让 vue-meta 获知 meta 信息已完成服务端渲染的属性名
  tagIDKeyName: 'hid' // 让 vue-meta 用来决定是否覆盖还是追加 tag 的属性名
}
```

### 默认 Meta 标签

Nuxt.js 允许你在 `nuxt.config.js` 里定义应用所需的所有默认 meta 标签，在 `head` 字段里配置就可以了：

一个使用自定义 `viewport` 和 `谷歌字体` 的配置示例：
```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

想了解 `head` 变量的所有可选项的话，请查阅 [`vue-meta` 使用文档](https://github.com/declandewet/vue-meta#recognized-metainfo-properties)。

关于 Nuxt.js 应用 HTML 头部配置的更多信息，请参考 [HTML 头部配置 API](/api/configuration-head)。

### 个性化特定页面的 Meta 标签

关于个性化特定页面的 Meta 标签，请参考 [页面头部配置API](/api/pages-head)。

<p class="Alert">注意：为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 `hid` 键为meta标签配一个唯一的标识编号。请阅读[关于 `vue-meta` 的更多信息](https://github.com/declandewet/vue-meta#lists-of-tags)。</p>

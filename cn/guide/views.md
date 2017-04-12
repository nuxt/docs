---
title: 视图
description: 视图章节的内容阐述了如何在 Nuxt.js 应用中为指定的路由配置数据和视图，包括 Document、页面、布局和HTML头部等内容。
---

> 本章节的内容阐述了如何在 Nuxt.js 应用中为指定的路由配置数据和视图，包括 Document、页面、布局和HTML头部等内容。

![nuxt-views-schema](/nuxt-views-schema.png)

## Document

你可以自定义你的 HTML 文件范本

如果想使用你的自订 HTML 文件范本, 建立一个 `app.html` 档案在你的专案跟目录。
 
预设的 HTML 范本应该包含这些
 
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

下面是一个 HTML 判断是否为 IE 的 HTML 范本例子

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

举一个个性化错误页面的栗子 `layouts/error.vue`:
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
  layout: 'blog' // 你可以给予错误页面设置范本
}
</script>
```

### 个性化布局

> `layouts` *根*目录下的所有文件都属于个性化布局文件，可以在页面组件中利用 `layout` 属性来引用。

*请确保在布局文件里面增加 `<nuxt/>` 组件用于显示页面非布局内容。*

举个栗子 `layouts/blog.vue`:
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

看下 [示例视频](https://www.youtube.com/watch?v=YOKnSTp7d38) 立刻体验下。


## Pages

所有的页面组件都是一个Vue组件，但是Nuxt.js加入了一个特别的键值，让你开发起来更为容易。

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    // 每次载入组件时都会执行
    return { name: 'World' }
  },
  fetch () {
    // fetch用于填入商店资料，在渲染页面之前。
  },
  head () {
    // 对于这个页面设定头参数
  },
  // 和更多的功能...
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```


| Attribute | Description |
|-----------|-------------|
| asyncData | 重要的参数，它可以做异步操作，并且接收上下文作为参数，请参阅 [async data documentation](/guide/async-data) 学习它如何运作 |
| fetch | 在渲染页面之前，用于填入 store 数据，它就像组件的 data 方法，只是它不回传组件数据。 [API Pages fetch documentation](/api/pages-fetch). |
| head | 设定当页的 head 资料 , 请参阅 [API Pages head documentation](/api/pages-head). |
| layout | 设置放置于`layouts`资料夹内的布局档案，请参阅 [API Pages layouts documentation](/api/pages-layout). |
| transition | 设定当页的转换动效 , 请参阅 [API Pages transition](/api/pages-transition). |
| scrollToTop | Boolean, by default: `false`. 
如果你想要在渲染页面之前回到页首，请设置它，它作用于巢状路由 [nested routes](/guide/routing#nested-routes). |
| validate | 
用于验证路由数据 [dynamic route](/guide/routing#dynamic-routes). |
| middleware | 设置当页的中间层，中间层将会在渲染页面前执行 [routes middleware](/guide/routing#middleware). |

更多关于页面属性使用方式请参阅: [API Pages](/api)


## HTML 头部

Nuxt.js 使用了 [`vue-meta`](https://github.com/declandewet/vue-meta) 更新应用的 `头部标签(Head)` and `html 属性`。

Nuxt.js 使用以下参数配置 `vue-meta`:
```js
{
  keyName: 'head', // 设置 meta 信息的组件对象的字段，vue-meta 会根据这 key 值获取 meta 信息
  attribute: 'data-n-head', // vue-meta 在监听标签时所添加的属性名
  ssrAttribute: 'data-n-head-ssr', // 让 vue-meta 获知 meta 信息已完成服务端渲染的属性名
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

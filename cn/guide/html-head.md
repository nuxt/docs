---
title: HTML 头部
description: Nuxt.js 使用 vue-meta 来更新维护页面HTML头部的内容。
---

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

## 页面标题

想要更新页面的标题，在你的页面组件中增加 `head.title` 变量即可。

`pages/index.vue`
```html
<template>
  <h1>主页 🚀</h1>
</template>

<script>
export default {
  head: {
    title: '主页 🚀'
  }
}
</script>
```

## meta 标签

想了解 `head` 变量的所有可选项的话，请查阅 [`vue-meta` 使用文档](https://github.com/declandewet/vue-meta#recognized-metainfo-properties)。

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

## 绑定数据

如果你希望某些头部标签能显示组件的页面组件数据 `data` 的值，比如某一篇文章的标题。你只需给 `head` 字段传一个返回对象的函数，然后在函数里使用 `this` 变量访问你的数据。

显示文章标题的示例：
```html
<script>
export default {
  data ({ params }) {
    // 从 API 接口获取文章数据
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
```

## 默认 meta 标签

Nuxt.js 允许你在 `nuxt.config.js` 里定义应用所需的所有默认 meta 标签，在 `head` 字段里配置就可以了：
```js
module.exports = {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

<p class="Alert">注意：为了避免meta标签的重复定义发生不必要的覆盖现象，建议利用 `hid` 键为meta标签配一个唯一的标识编号。请阅读[关于 `vue-meta` 的更多信息](https://github.com/declandewet/vue-meta#lists-of-tags)。</p>

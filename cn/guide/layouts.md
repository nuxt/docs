---
title: 布局
description: 你可以扩展 Nuxt.js 的主布局，或者在 layouts 目录下新增个性化布局。 
---

> 你可以扩展 Nuxt.js 的主布局，或者在 `layouts` 目录下新增个性化布局。 

## 默认布局

> 扩展主布局只需要增加 `layouts/default.vue` 文件。

*请确保在布局文件里面增加 `<nuxt/>` 组件用于显示页面非布局内容。*

默认的布局源码为：
```html
<template>
  <nuxt/>
</template>
```

## 错误页面

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
  props: ['error']
}
</script>
```

## 个性化布局

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

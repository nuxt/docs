---
title: 路由过渡动效
description: Nuxt.js 的路由过渡动效示例
github: routes-transitions
youtube: https://www.youtube.com/embed/RIXOzJWFfc8
---

## 文档

> Nuxt.js 用  [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) 组件，让你能创建一些酷炫的路由过渡动效。

### 使用

Nuxt.js 默认使用的过渡名称 (transition name) 就是 `page`。

如果想让每一个页面的切换都有淡出 (fade) 效果，我们需要创建一个所有路由共用的 CSS 文件。所以我们可以在 `assets/` 目录下创建这个文件：

`assets/main.css`:

```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s
}
.page-enter, .page-leave-active {
  opacity: 0
}
```

然后添加到 `nuxt.config.js` 文件中：

```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

大功告成！现在每个路由切换，都会有一个漂亮的淡出 (fade) 动画了。

### `transition` 字段

你可以在 `nuxt.config.js` 文件中添加 `transition` 字段，来修改默认的过渡设定。

```js
module.exports = {
  transition: 'test'
  // 或
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js 会这样使用上面配的设定：
```html
<transition name="test" mode="out-in">
```

想了解更多关于 `<transition>` 组件的内容请看：http://vuejs.org/v2/guide/transitions.html

`transition` 允许配置的字段介绍：

| 属性字段 | 默认值 | 定义 |
|------|------------|-----------|
| `name` | `page` | 所有路由过渡都会用到的过渡名称 |
| `mode` | `out-in` | 所有路由都用到的过渡模式，见 [Vue.js 使用文档](http://vuejs.org/v2/guide/transitions.html#Transition-Modes)。 |

*注意：如果 `transition` 字段是字符串的话，它就等同于 `transition.name`。*

### 给某个特定路由自定义过渡特效

如果想给某个路由自定义过渡特效的话，只要在该页面组件中配置 `transition` 字段即可：

`pages/about.vue`:
```html
<template>
  <div class="container">
    <h1>关于页</h1>
    <router-link to="/">首页</router-link>
  </div>
</template>

<script>
export default {
  transition: 'bounce'
}
</script>
```

然后我们给这个自定义过渡加上 CSS 动画：

```css
/* assets/main.css */
.bounce-enter-active {
  animation: bounce-in .8s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% { transform: scale(0) }
  50% { transform: scale(1.5) }
  100% { transform: scale(1) }
}
@keyframes bounce-out {
  0% { transform: scale(1) }
  50% { transform: scale(1.5) }
  100% { transform: scale(0) }
}
```

*注意：在页面组件中，你也同样给 `transition` 字段传对象*

---
title: 路由过渡动效
description: Nuxt.js 使用 Vue.js 的 transition 组件来实现路由切换时的过渡动效。
youtube: https://www.youtube.com/embed/RIXOzJWFfc8
---

> Nuxt.js 使用 Vue.js 的[&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components)组件来实现路由切换时的过渡动效。

## 使用方法

**Nuxt.js 默认使用的过渡名称 (transition name) 就是 `page`**。

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

## `transition` 字段

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

| 属性字段  | 类型 | 默认值 | 描述 |
|------|------|---------|-----------|
| `name` | String | `"page"` | 所有路由过渡都会用到的过渡名称。 |
| `mode` | String | `"out-in"` | 所有路由都用到的过渡模式，见 [Vue.js transition 使用文档](http://vuejs.org/v2/guide/transitions.html#Transition-Modes)。 |
| `css` | Boolean | `true` | 是否给页面组件根元素添加 CSS 过渡类名。如果值为 `false`，路由过渡时将触发页面组件事件注册的 Javascript 钩子方法。|
| `type` | String | `n/a` | 指定过滤动效事件的类型，用于判断过渡结束的时间点。值可以是 "transition" 或 "animation"。 默认情况下, Nuxt.js 会自动侦测动效事件的类型。|
| `enterClass` | String | `n/a` | 目标路由动效开始时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。|
| `enterToClass` | String | `n/a` | 目标路由动效结束时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |
| `enterActiveClass` | String | `n/a` | 目标路由过渡过程中的类名。详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |
| `leaveClass` | String | `n/a` | 当前路由动效开始时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |
| `leaveToClass` | String | `n/a` | 当前路由动效结束时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |
| `leaveActiveClass` | String | `n/a` | 当前路由动效过程中的类名。详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。|

*注意：如果 `transition` 字段是字符串的话，它就等同于 `transition.name`。*

你也可以在页面组件事件里面使用 Javascript 来控制过渡动效，可以称之为 [JavaScript 钩子方法](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks)：

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

*注意：如果使用纯 Javascript 控制路由过渡动效，建议将 `transition` 组件的 `css` 属性的值设置为 `false`。这样可以避免 Vue 做 CSS 动效相关的侦测逻辑，同时防止 CSS 影响到过渡的动效。*

## 给某个特定页面自定义过渡特效

如果想给某个页面自定义过渡特效的话，只要在该页面组件中配置 `transition` 字段即可：

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

## 动态过渡动效

如果想根据路由的参数来动态设置两个路由的过渡动效，需要将页面的 `transition` 字段配置成函数。

以 `pages/posts.vue` 页面举个动态过渡动效的例子：
```html
<script>
export default {
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
</script>
```

这时页面导航的动效如下：
- 从 `/` 导航至 `/posts` ，动效为 `slide-left`
- 从 `/posts` 导航至 `/posts?page=3`，动效为 `slide-left`
- 从 `/posts?page=3` 导航至 `/posts?page=2`，动效为 `slide-right`

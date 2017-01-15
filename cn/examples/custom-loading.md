---
title: 自定义组件加载
description: Nuxt.js 的自定义组件加载示例
github: custom-loading
---

## 文档

> Nuxt.js 使用自带组件，以进度条的形式表示路由间的切换。你可以自由定制，自己写一个组件，或者禁用这个效果。

### 禁用 Nuxt.js 自带的进度条

如果你不想显示路由切换时出现的进度条的话，可以在 `nuxt.config.js` 中 配置 `loading: false` 参数：
```js
// nuxt.config.js
module.exports = {
  loading: false
}
```

### 定制 Nuxt.js 进度条

这些是 Nuxt.js 进度条可以配置的参数。

| 属性字段 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| `color` | String | `'black'` | 进度条的 CSS 颜色值 |
| `failedColor` | String | `'red'` | 当路由渲染出现错误时，进度条的 CSS 颜色值 (例如 `data` 或者 `fetch` 返回了错误) |
| `height` | String | `'2px'` | 进度条高度值 (进度条的 `style` 属性会用到) |
| `duration` | Number | `5000` | 进度条最大持续时间（单位毫秒 ms）。Nuxt.js 预计路由渲染不会超过 5 秒钟。 |

示例：
```js
// nuxt.config.js
module.exports = {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

### 创建一个自定义的加载组件

如果不喜欢 Nuxt.js 自带的进度条的话，你也可以创建一个属于自己的加载组件。做法很简单，只需给 `loading` 字段传入你的组件文件路径即可。

因为 Nuxt.js 会自动调用你自定义的组件，所以请确保你的组件提供以下几个方法：

| 方法 | 可选？ | 描述 |
|--------|-------------|
| `start()` | 必填项 | 当路由改变时会被调用，此时你应该显示你的组件。 |
| `finish()` | 必填项 | 当路由加载完毕（和数据获取完毕）时被调用，此时你应该隐藏你的组件。 |
| `fail()` | *可选* | 当路由加载失败（例如数据获取出错）时被调用。 |
| `increase(num)` | *可选* | 路由加载期间被调用，`num` 是 Integer，小于 100。 |


示例：
```js
// nuxt.config.js
module.exports = {
  loading: 'components/loading.vue'
}
```

然后在 `components/loading.vue` 中：
```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>加载中...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
```

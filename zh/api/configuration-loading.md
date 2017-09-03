---
title: "API: loading 属性配置"
description: 在页面切换的时候，Nuxt.js 使用内置的加载组件显示加载进度条。你可以定制它的样式，禁用或者创建自己的加载组件。
---

# loading 属性配置

- 类型： `Boolean` 或 `Object` 或 `String`

> 在页面切换的时候，Nuxt.js 使用内置的加载组件显示加载进度条。你可以定制它的样式，禁用或者创建自己的加载组件。

## 禁用加载进度条

- 类型： `Boolean`

页面切换的时候如果不想显示加载进度条，可以在 `nuxt.config.js` 里面增加 `loading: false` 的配置：

```js
module.exports = {
  loading: false
}
```

## 个性化加载进度条

- 类型： `Object`

以下表格为进度条定制化时可用到的配置项及其说明。

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| `color` | String | `'black'` | 进度条的颜色 |
| `failedColor` | String | `'red'` | 页面加载失败时的颜色 （当 `data` 或 `fetch` 方法返回错误时）。 |
| `height` | String | `'2px'` | 进度条的高度 (在进度条元素的 `style` 属性上体现)。 |
| `duration` | Number | `5000` | 进度条的最大显示时长，单位毫秒。Nuxt.js 假设页面在该时长内加载完毕。 |

举个例子，一个5像素高的蓝色进度条，可以在 `nuxt.config.js` 中配置如下：

```js
module.exports = {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

## 自定义加载组件

- 类型： `String`

你可以新建一个加载组件替代 Nuxt.js 默认的。
使用自己的加载组件，需要在 `loading` 配置项里指定组件的路径，Nuxt.js 会自动调用该组件。

**自定义组件需要实现以下接口方法：**

| 方法 | 是否必须 | 描述 |
|--------|----------|-------------|
| `start()` | 是 | 路由更新（即浏览器地址变化）时调用, 请在该方法内显示组件。 |
| `finish()` | 是 | 路由更新完毕（即`asyncData`方法调用完成且页面加载完）时调用，请在该方法内隐藏组件。 |
| `fail()` | *否* | 路由更新失败时调用（如`asyncData`方法返回异常）。 |
| `increase(num)` | *否* | 页面加载过程中调用, `num` 是小于 100 的整数。 |

我们可以在 `components` 目录下创建自定义的加载组件，如 `components/loading.vue`：
```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
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

然后, 更新 `nuxt.config.js` 告诉 Nuxt.js 使用自定义加载组件：

```js
module.exports = {
  loading: '~components/loading.vue'
}
```

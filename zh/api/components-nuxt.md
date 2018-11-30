---
title: "API: <nuxt> 组件"
description: 该组件用于在布局中显示页面组件（即非布局内容）。
---

# &lt;nuxt&gt; 组件

> 该组件只适用于在[布局](/guide/views#布局)中显示页面组件（即非布局内容）。

**Props**:
- nuxtChildKey: `string`
  - 此prop将设置为`<router-view />`，可用于在动态页面和不同路径内进行转换。
  - 默认: `$route.fullPath`

例如 (`layouts/default.vue`)：

```html
<template>
  <div>
    <div>页头</div>
    <nuxt/>
    <div>页脚</div>
  </div>
</template>
```

可以看下这个实际的[布局示例](/examples/layouts)。

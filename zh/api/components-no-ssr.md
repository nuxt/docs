---
title: "API: The <no-ssr> Component"
description: Skip component rendering on server side(rendering), and display placeholder text.
---

# The &lt;no-ssr&gt; 组件

> 该组件用于设置组件不在服务器渲染中呈现。

**Props**:
- placeholder: `string`
  - 使用文本作为占位符，`<no-ssr />`组件在客户端中呈现。

```html
<template>
  <div>
    <sidebar />
    <no-ssr placeholder="Loading...">
      <!-- 此组件仅在客户端呈现 -->
      <comments />
    </no-ssr>
  </div>
</template>
```

**Slots**:

- placeholder:
  - 使用`slot`作为占位符，`<no-ssr />`组件在客户端中呈现。

 ```html
<template>
  <div>
    <sidebar />
    <no-ssr>
      <!-- 此组件仅在客户端呈现 -->
      <comments />

      <!-- loading indicator -->
      <comments-placeholder slot="placeholder" />
    </no-ssr>
  </div>
</template>
```

这个组件是克隆至 [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr). 感谢 [@egoist](https://github.com/egoist)!

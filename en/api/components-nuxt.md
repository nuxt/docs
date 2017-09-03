---
title: "API: The <nuxt> Component"
description: Display the page components inside a layout.
---

# The &lt;nuxt&gt; Component

> This component is used only in [layouts](/guide/views#layouts) to display the page components.

**Props**:
- nuxtChildKey: `string`
  - This prop will be set to `<router-view/>`, useful to make transitions inside a dynamic page and different route.
  - Default: `$route.fullPath`

Example (`layouts/default.vue`):

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt/>
    <div>My footer</div>
  </div>
</template>
```

To see an example, take a look at the [layouts example](/examples/layouts).

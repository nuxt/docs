---
title: "API: The <nuxt> Component"
description: Display the page components inside a layout.
---

# The &lt;nuxt&gt; Component (En)

> This component is used only in [layouts](/guide/views#layouts) to display the page components.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>**Props**:</p>
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

---
title: "API: The layout Property"
description: Every file (first level) in the layouts directory will create a custom layout accessible with the layout property in the page component.
---

# The layout Property (En)

> Every file (first level) in the layouts directory will create a custom layout accessible with the layout property in the page component.

- **Type:** `String` or `Function` (default: `'default'`)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Use the `layout` key in your pages components to define which layout to use:</p>

```js
export default {
  layout: 'blog',
  // OR
  layout (context) {
    return 'blog'
  }
}
```

In this example, Nuxt.js will include the `layouts/blog.vue` file as a layout for this page component.

Check the [demonstration video](https://www.youtube.com/watch?v=YOKnSTp7d38) to see it in action.

To understand how the layouts work with nuxt.js, take a look at the [layout documentation](/guide/views#layouts).

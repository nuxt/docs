---
title: Layouts
description: Nuxt.js lets you extend the main layout or create custom layouts by adding them in the layouts directory.
---

> Nuxt.js lets you extend the main layout or create custom layouts by adding them in the `layouts` directory.

## Default Layout

> You can extend the main layout by adding a `layouts/default.vue` file.

*Make sure to add the `<nuxt>` component when creating a layout to display the page component.*

The default layout source code is:
```html
<template>
  <nuxt/>
</template>
```

## Error Page

> You can customize the error page by adding a `layouts/error.vue` file.

This layout is special since you should not include `<nuxt/>` inside its template. You must see this layout as a component displayed when an error occurs (404, 500, etc).

The default error page source code is [available on Github](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue).

Example of a custom error page in `layouts/error.vue`:
```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
```

## Custom Layout

> Every file (*first level*) in the `layouts` directory will create a custom layout accessible with the `layout` property in the page component.

*Make sure to add the `<nuxt/>` component when creating a layout to display the page component.*

Example of `layouts/blog.vue`:
```html
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt/>
  </div>
</template>
```

And then in `pages/posts.vue`, you can tell Nuxt.js to use your custom layout:
```html
<script>
export default {
  layout: 'blog'
}
</script>
```

Check the [demonstration video](https://www.youtube.com/watch?v=YOKnSTp7d38) to see it in action.

---
title: Layouts
description: Layouts example with Nuxt.js
github: extend-app
youtube: https://www.youtube.com/embed/wBhia7uBxDA
---

## Documentation

> Nuxt.js allows you to extend the main application by adding a `pages/_app.vue` file and a `pages/_error.vue`

### The default app

The default source code of the main app is:
```html
<template>
  <nuxt-container>
    <nuxt/>
  </nuxt-container>
</template>
```

### The `pages/_app.vue` file

You have to make sure to add the `<nuxt-container>` and `<nuxt>` components when extending the app.

It is important that the code you add stays inside `<nuxt-container>`.

Example:
```html
<template>
  <nuxt-container>
    <div>My navigation bar here</div>
    <nuxt/>
  </nuxt-container>
</template>
```

### The `pages/_error.vue` file

> Documentation is coming soon

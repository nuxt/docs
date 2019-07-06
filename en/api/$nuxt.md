---
title: "$nuxt: The NuxtJS helper"
description: $nuxt is an helper focused to improve the user experience of your users.
---

`$nuxt`is an helper focused to improve the user experience of your users.

- `isOffline`
  - Type: `Boolean`
  - Description: `true` when the user internet connection becomes offline
- `isOnline`
  - Type: `Boolean`
  - Description: Opposite of `isOffline`

Example:

`layouts/default.vue`:

```html
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <nuxt/>
  </div>
</template>
```

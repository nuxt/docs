---
title: "$nuxt: The NuxtJS helper (EN)"
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
<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>

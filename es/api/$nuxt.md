---
title: "$nuxt: La variable NuxtJS"
description: $nuxt es una variable enfocado a mejorar la experiencia de usuario para tus usuarios.
---

`$nuxt` es un variable enfocado en mejorar la experiencia de usuario para tus usuarios.

- `isOffline`
  - Tipo: `Boolean`
  - Descripcion: `true` cuando el internet del usuario esta desconectado
- `isOnline`
  - Tipo: `Boolean`
  - Descripcion: Opuesto de `isOffline`

Ejemplo:

`layouts/default.vue`:

```html
<template>
  <div>
    <div v-if="$nuxt.isOffline">Usted esta desconectado</div>
    <nuxt/>
  </div>
</template>
```

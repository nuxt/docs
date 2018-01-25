---
title: 'API: '
description: Melewati render komponen pada server side (rendering), dan menampilkan
  "placeholder text".
---

# Komponen <no-ssr>

> Komponen ini digunakan untuk menghapus komponen dari subjek server side rendering.

**Props**:

- placeholder: `String`
    - This prop will be used as a content of inner `div` and displayed as text only on server side rendering.

```html
<template>
  <div>
    <ssrfrendly-component />
    <no-ssr>
      <not-ssrfrendly />
    </no-ssr>
  </div>
</template>
```

This component is a clone of [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr).
Thanks [@egoist](https://github.com/egoist)!

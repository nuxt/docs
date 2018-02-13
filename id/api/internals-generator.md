---
title: 'API: Kelas Generator'
description: Kelas Generator Nuxt
---

# Kelas Generator

- Sumber: **[builder/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/generator.js)**

## Plugin yang dapat ditukar (Tapable plugins)

Kita bisa mendaftarkan kait (hooks) pada peristiwa siklus hidup (life cycle) tertentu.

```js
nuxt.plugin('generator', generator => {
    generator.plugin('generate', ({routes}) => {
        // ...
    }))
})
```

Plugin | Argumen | Keterangan
--- | --- | ---
`generateRoutes` | {generator, generateRoutes} | Setelah menyelesaikan rute untuk menghasilkan (generate), maka kita memiliki perubahan untuk menyesuaikannya
`generate` | {generator, routes} | Tepat sebelum mulai menghasilkan rute. Rute didekorasi dengan payload

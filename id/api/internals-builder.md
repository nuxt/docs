---
title: 'API: Kelas Builder'
description: Nuxt `Builder` Class
---

# Kelas Builder

- Source: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/builder.js)**

## Tapable plugins

Kita bisa mendaftarkan kait pada acara siklus hidup tertentu.

```js
nuxt.plugin('build', builder => {
    builder.plugin('extendRoutes', async ({routes}) =>  {
        // ...
    })
})
```

Plugin | Argumen | Keterangan
--- | --- | ---
`build` | builder | Pertama membangun dimulai
`built` | builder | Pertama membangun selesai
`extendRoutes` | {routes, templateVars, r} | Membangkitkan rute
`generate` | {builder, templatesFiles, templateVars} | Generating `.nuxt` template files
`done` | {builder, stats} | pembuatan webpack sudah selesai
`compile` | {builder, compiler} | Sebelum kompilasi webpack (compiler adalah contoh `MultiCompiler`)
`compiled` | builder | pembuatan webpack selesai

---
title: 'API: Konteks (Context)'
description: The `context` provides additional objects/params from Nuxt not traditionally
  available to Vue components. The `context` is available in special nuxt lifecycle
  areas like `asyncData`, `plugins`, 'middlewares', 'modules', and 'store/nuxtServerInit`.
---

## Konteks (Context)

Daftar semua kunci yang tersedia di dalam konteks `context`:

Kunci | Tipe | Tersedia | Deskripsi
--- | --- | --- | ---
`app` | Root Vue Instance | Klien & Server | The root Vue instance that includes all your plugins. For example, when using `axios`, you can get access to `$axios` through `context.app.$axios`.
`isClient` | `Boolean` | Klien & Server | Boolean to let you know if you're actually renderer from the client-side.
`isServer` | `Boolean` | Klien & Server | Boolean to let you know if you're actually renderer from the server-side.
`isStatic` | `Boolean` | Klien & Server | Boolean to let you know if you're actually inside a generated app (via `nuxt generate`).
`isDev` | `Boolean` | Klien & Server | Boolean to let you know if you're in dev mode, can be useful for caching some data in production.
`isHMR` | `Boolean` | Klien & Server | Boolean to let you know if the method/middleware is called from webpack hot module replacement (*only on client-side in dev mode*).
`route` | [Rute Vue Router](https://router.vuejs.org/en/api/route-object.html) | Klien & Server | Vue Router route instance.
`store` | [Vuex Store](https://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | Klien & Server | Vuex Store instance. **Available only if the [vuex store](/guide/vuex-store) is set**.
`env` | `Object` | Klien & Server | Environment variables yang diatur di `nuxt.config.js`, lihat [env api](/api/configuration-env).
`params` | `Object` | Klien & Server | Alias dari `route.params`.
`query` | `Object` | Klien & Server | Alias dari `route.query`.
`req` | [`http.Request`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | Server | Request from the Node.js server. If Nuxt is used as a middleware, the req object might be different depending of the framework you're using.<br>**Not available via `nuxt generate`**.
`res` | [`http.Response`](https://nodejs.org/api/http.html#http_class_http_serverresponse) | Server | Response from the Node.js server. If Nuxt is used as a middleware, the res object might be different depending of the framework you're using.<br>**Not available via `nuxt generate`**.
`redirect` | `Function` | Klien & Server | Use this method to redirect the user to another route, the status code is used on the server-side, default to `302`. `redirect([status,] path [, query])`.
`error` | `Function` | Klien & Server | Gunakan metode ini untuk menampilkan halaman error: `error(parameter)`. `Parameter`-nya harus memiliki properti `statusCode` dan `message`.
`nuxtState` | `Object` | Klien | Status Nuxt, berguna untuk plugin yang menggunakan `beforeNuxtRender` untuk mendapatkan status nuxt pada sisi klien sebelum hidrasi. **Hanya tersedia dalam mode `universal`**.
`beforeNuxtRender(fn)` | `Function` | Server | Use this method to update `__NUXT__` variable rendered on client-side, the `fn` (can be asynchronous) is called with `{ Components, nuxtState }`, see [example](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue).

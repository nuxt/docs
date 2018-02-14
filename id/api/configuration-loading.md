---
title: 'API: The loading Property'
description: Nuxt.js menggunakan komponennya sendiri untuk menunjukkan progress bar
  di antara rute. Anda dapat menyesuaikannya (kostumisasi), menonaktifkannya atau
  membuat komponen Anda sendiri.
---

# The loading Property

- Type: `Boolean` or `Object` or `String`

> Nuxt.js menggunakan komponennya sendiri untuk menunjukkan progress bar di antara rute. Anda dapat menyesuaikannya (kostumisasi), menonaktifkannya atau membuat komponen Anda sendiri.

## Disable the Progress Bar

- Type: `Boolean`

Jika Anda tidak ingin menampilkan progress bar, cukup tambahkan `loading: false` di dalam file `nuxt.config.js`:

```js
module.exports = {
  loading: false
}
```

## Customize the Progress Bar

- Type: `Object`

List of properties to customize the progress bar.

Key | Type | Default | Description
--- | --- | --- | ---
`color` | String | `'black'` | CSS color of the progress bar
`failedColor` | String | `'red'` | Warna CSS dari progress bar saat terjadi error ketika me-render rute (misalnya jika `data` atau `fetch` mengembalikan error).
`height` | String | `'2px'` | Height of the progress bar (used in the `style` property of the progress bar)
`duration` | Number | `5000` | Dalam ms (miliseconds), durasi maksimum progress bar, Nuxt.js mengasumsikan bahwa rute akan di-render sebelum 5 detik.
`rtl` | Boolean | `false` | Set the direction of the progress bar from right to left.

For a blue progress bar with 5px of height, we update the `nuxt.config.js` to the following:

```js
module.exports = {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

## Use a Custom Loading Component

- Type: `String`

You can create your own component that Nuxt.js will call instead of its default component. To do so, you need to give a path to your component in the `loading` option. Then, your component will be called directly by Nuxt.js.

**Your component has to expose some of these methods:**

Method | Required | Description
--- | --- | ---
`start()` | Required | Dipanggil ketika sebuah route berpindah, di sini di mana Anda menampilkan komponen Anda.
`finish()` | Required | Dipanggil ketika rute dimuat (dan data diambil (fetch)), di sini tempat Anda menyembunyikan komponen Anda.
`fail()` | *Optional* | Called when a route couldn't be loaded (failed to fetch data for example).
`increase(num)` | *Optional* | Called during loading the route component, `num` is an Integer < 100.

Kita dapat membuat komponen kustom pada `components/loading.vue` :

```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
```

Then, we update our `nuxt.config.js` to tell Nuxt.js to use our component:

```js
module.exports = {
  loading: '~/components/loading.vue'
}
```

---
title: 'API: The build Property'
description: Nuxt.js lets you customize the webpack configuration for building your
  web application as you want.
---

# The build Property

> Nuxt.js lets you customize the webpack configuration for building your web application as you want.

## analyze

> Nuxt.js use [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) to let you visualize your bundles and how to optimize them.

- Type: `Boolean` or `Object`
- Default: `false`

Jika itu merupakan Object, lihat properti yang tersedia [di sini](https://github.com/th0r/webpack-bundle-analyzer#as-plugin).

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    analyze: true,
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<p class="Alert Alert--teal">**Info:** you can use the command `nuxt build --analyze` or `nuxt build -a` to build your application and launch the bundle analyzer on [http://localhost:8888](http://localhost:8888).</p>

## babel

> Customize Babel configuration for JavaScript and Vue files.

- Type: `Object`

- Default:

    ```js
    {
      presets: ['vue-app']
    }
    ```

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## cssSourceMap

- Type: `boolean`
- Default: `true` for dev and `false` for production.

> Enables CSS Source Map support

## devMiddleware

- Type: `Object`

See [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) for available options.

## extend

> Extend konfigurasi webpack secara manual untuk bundel client & server.

- Type: `Function`

Extend dipanggil (call) dua kali, satu kali untuk bundel server, dan satu kali untuk bundel klien. Uraian dari metode ini adalah:

1. webpack config object,
2. object with the following keys (all boolean): `isDev`, `isClient`, `isServer`.

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    extend (config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

Jika anda ingin melihat lebih lanjut mengenai konfigurasi default webpack, lihat [direktori webpack](https://github.com/nuxt/nuxt.js/tree/master/lib/builder/webpack) kami.

## extractCSS

> Mengaktifkan Common CSS Extraction menggunakan Vue Server Renderer. [Baca panduan](https://ssr.vuejs.org/en/css.html).

- Type: `Boolean`
- Default: `false`

Menggunakan `extract-text-webpack-plugin` untuk mengekstrak CSS menjadi beberapa bagian file-file CSS (otomatis terinjeksi dengan template), yang memungkinkan file ter-cache secara terpisah. Ini disarankan bila ada banyak CSS bersama (shared CSS). CSS di dalam komponen async akan tetap digabung sebagai string JavaScript dan ditangani oleh vue-style-loader.

## filenames

> Customize bundle filenames.

- Type: `Object`

- Default:

    ```js
    {
      css: 'common.[contenthash].css',
      manifest: 'manifest.[hash].js',
      vendor: 'common.[chunkhash].js',
      app: 'app.[chunkhash].js',
      chunk: '[name].[chunkhash].js'
    }
    ```

This example changes fancy chunk names to numerical ids (`nuxt.config.js`):

```js
module.exports = {
  build: {
    filenames: {
      chunk: '[id].[chunkhash].js'
    }
  }
}
```

To understand a bit more about the use of manifest and vendor, take a look at this [webpack documentation](https://webpack.js.org/guides/code-splitting-libraries/).

## hotMiddleware

- Type: `Object`

See [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) for available options.

## plugins

> Add webpack plugins

- Type: `Array`
- Default: `[]`

Example (`nuxt.config.js`):

```js
const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': require('./package.json').version
      })
    ]
  }
}
```

## postcss

> Customize [PostCSS Loader](https://github.com/postcss/postcss-loader#usage) plugins.

- Type: `Array`, `Object` (recommended), `Function` ou `Boolean`

    **Catatan:** Ketika preset standarnya adalah OK dan cukup fleksibel untuk kasus penggunaan normal, penggunaan yang direkomendasikan oleh [`vue-loader`](https://vue-loader.vuejs.org/en/options.html#postcss) adalah menggunakan file `postcss.config.js` pada proyek Anda. Dengan membuat file tersebut maka akan otomatis terdeteksi dan pilihan ini terabaikan.

- Default:

    ```js
    {
      plugins: {
      'postcss-import' : {},
      'postcss-url': {},
      'postcss-cssnext': {}
      }
    }
    ```

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    postcss: {
      plugins: {
        // Disable `postcss-url`
      'postcss-url': false

      // Customize `postcss-cssnext` default options
      'postcss-cssnext': {
        features: {
          customProperties: false
        }
      }

      // Add some plugins
      'postcss-nested': {},
      'postcss-responsive-type': {}
      'postcss-hexrgba': {}
      }
    }
  }
}
```

## publicPath

> Nuxt.js memungkinkan Anda mengunggah file dist Anda ke CDN Anda untuk performa yang maksimal, cukup dengan atur `publicPath` ke CDN Anda.

- Type: `String`
- Default: `'/_nuxt/'`

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Kemudian, saat meluncurkan (launcing) `nuxt build` , unggah konten dari direktori `.nuxt/dist/` ke CDN dan lihat hasilnya!

## ssr

> Creates special webpack bundle for SSR renderer.

- Type: `Boolean`
- Default: `true` for universal mode and `false` for spa mode

Pengaturan ini dipilih secara otomatis berdasarkan nilai `mode` jika tidak disediakan.

## templates

> Nuxt.js memungkinkan Anda menyediakan template Anda sendiri yang akan dirender berdasarkan konfigurasi Nuxt. Fitur ini sangat berguna untuk digunakan dengan [modul](/guide/modules) .

- Type: `Array`

Example (`nuxt.config.js`):

```js
module.exports = {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` can be absolute or relative
        dst: 'support.js', // `dst` is relative to project `.nuxt` dir
        options: { // Options are provided to template as `options` key
          live_chat: false
        }
      }
    ]
  }
}
```

Templates are rendered using [`lodash.template`](https://lodash.com/docs/#template) you can learn more about using them [here](https://github.com/learn-co-students/javascript-lodash-templates-v-000).

## vendor

> Nuxt.js lets you add modules inside the `vendor.bundle.js` file to reduce the size of the application bundle. This is especially helpful when using external modules (like `axios` for example).

- Type: `Array`

Untuk menambahkan modul/file di dalam bundel vendor, tambahkan key `build.vendor` di dalam `nuxt.config.js` :

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

You can also give a path to a file, like a custom lib you created:

```js
module.exports = {
  build: {
    vendor: [
      'axios',
      '~/plugins/my-lib.js'
    ]
  }
}
```

## watch

> Anda dapat menyediakan file kostum untuk dapat memantau dan memperbaruinya setelah melakukan perubahan pada file tersebut. Fitur ini sangat berguna untuk digunakan bersama [modul](/guide/modules) .

- Type: `Array<String>`

```js
module.exports = {
  build: {
    watch: [
      '~/.nuxt/support.js'
    ]
  }
}
```

---
title: 'API: Pengenalan Modul Nuxt '
description: Mengenal lebih baik mengenai bagian dalam (internal) Nuxt
---

# Bagian Dalam Nuxt

Nuxt.js memiliki arsitektur modular sepenuhnya yang memungkinkan developer memperluas bagian Inti Nuxt (Core) menggunakan API yang fleksibel.

Please see [Modules Guide](/guide/modules) for more detailed information if interested developing your own module.

This section helps getting familiar to Nuxt internals and can be used as a reference to understand it better while writing your own modules.

### Core

Kelas-kelas ini adalah jantung dari Nuxt dan harus ada baik ketika runtime maupun build time.

#### Nuxt

- [`Nuxt` Class](/api/internals-nuxt)
- Sumber: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js)

#### Renderer

- [`Renderer` Class](/api/internals-renderer)
- Sumber: [core/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/renderer.js)

#### ModuleContainer

- [`ModuleContainer` Class](/api/internals-module-container)
- Sumber: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/module.js)

### Build

Kelas-kelas ini hanya dibutuhkan ketika mode build atau dev.

### Builder

- [`Builder` Class](/api/internals-builder)
- Sumber: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/builder.js)

#### Generator

- [`Generator` Class](/api/internals-generator)
- Sumber: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/generator.js)

### Common

#### Utils

- Sumber: [common/utils.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/common/utils.js)

#### Options

- Sumber: [common/options.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/common/options.js)

## Packaging & Usage

Nuxt mengekspor semua kelas secara default. Cara untuk require:

```js
const { Nuxt, Builder, Utils } = require('nuxt')
```

## Bentuk Umum (Common patterns)

All Nuxt classes have a reference to `nuxt` instance and options. Every class extends [`tappable`](https://github.com/nuxt/tappable), this way we always have a consistent API across classes to access `options` and `nuxt`.

```js
const Tapable = require('tappable')

class SomeClass extends Tapable {
  constructor (nuxt, builder) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // Kita memiliki akses ke `this.nuxt` dan `this.options`
  }
}
```

Kelas-kelas tersebut *plugable* sehingga mereka harus mendaftarkan (register) plugin pada wadah (container) utama `nuxt` untuk mendaftarkan (register) pengait (hooks) lainnya.

```js
class FooClass extends Tapable {
  constructor (nuxt, builder) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options

    this.nuxt.applyPluginsAsync('foo', this)
  }
}
```

Jadi kita dapat mengaitkan (hook) modul `foo` seperti ini:

```js
nuxt.plugin('foo', foo => {
    // ...
})
```

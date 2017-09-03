---
title: "API: Nuxt Modules Intro"
description: Better understand Nuxt internals
---

# Nuxt Internals

Nuxt.js has a fully modular architecture which allows developers extending any part of Nuxt Core using a flexible API.
Please see [Modules Guide](/guide/modules) for more detailed information if interested developing your own module. 
This section helps getting familiar to Nuxt internals and can be used as a reference to understand it better while writing your own modules.

### Core

These classes are the hearth of Nuxt and should exist on both runtime and build time.

#### Nuxt

- [Nuxt Class](/api/internals-nuxt)
- Source: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js)

#### Renderer

- [Renderer Class](/api/internals-renderer)
- Source: [core/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/renderer.js)

#### Module Container

- [ModuleContainer Class](/api/internals-module-container)
- Source: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/module.js)

### Build

These classes are only needed for build or dev mode.

### Builder

- [Builder Class](/api/internals-builder)
- Source: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/builder.js)

#### Generator

- [Generator Class](/api/internals-generator)
- Source: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/generator.js)

### Common

#### Utils

- Source: [common/utils.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/common/utils.js)

#### Options

- Source: [common/options.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/common/options.js)


## Packaging & Usage

Nuxt exports all classes by default. To require them:

```js
const { Nuxt, Builder, Utils } = require('nuxt')
```

## Common patterns

All Nuxt classes have a reference to nuxt instance and options. Every class extends [`tappable`](https://github.com/nuxt/tappable), this way we always have a consistent API across classes to access options and nuxt.

```js
const Tapable = require('tappable')

class SomeClass extends Tapable {
  constructor (nuxt, builder) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // We have access to this.nuxt and this.options
  }
}
```

Classes are *plugable* so they should register a plugin on main nuxt container to register more hooks.

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

So we can hook into foo module like this:

```js
nuxt.plugin('foo', foo => {
    // ...
})
```
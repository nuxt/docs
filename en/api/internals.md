---
title: "API: Nuxt Modules Intro"
description: Better understand Nuxt internals
---

# Nuxt Internals

Nuxt.js has a fully modular architecture which allows developers extending any part of Nuxt Core using a flexible API.

Please see [Modules Guide](/guide/modules) for more detailed information if interested developing your own module.

This section helps getting familiar to Nuxt internals and can be used as a reference to understand it better while writing your own modules.

### Core

These classes are the heart of Nuxt and should exist on both runtime and build time.

#### Nuxt

- [`Nuxt` Class](/api/internals-nuxt)
- Source: [core/nuxt.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/core/src/nuxt.js)

#### Renderer

- [`Renderer` Class](/api/internals-renderer)
- Source: [core/renderer.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/core/src/renderer.js)

#### ModuleContainer

- [`ModuleContainer` Class](/api/internals-module-container)
- Source: [core/module.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/core/src/module.js)

### Build

These classes are only needed for build or dev mode.

#### Builder

- [`Builder` Class](/api/internals-builder)
- Source: [builder/builder.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/builder/src/builder.js)

#### Generator

- [`Generator` Class](/api/internals-generator)
- Source: [generator/generator.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/builder/src/generator.js)

### Common

#### Utils

- Source: [common/utils.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/common/src/utils.js)

#### Options

- Source: [common/options.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/common/src/options.js)

## Packaging & Usage

Nuxt exports all classes by default. To import them:

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## Common patterns

All Nuxt classes have a reference to `nuxt` instance and options, this way we always have a consistent API across classes to access `options` and `nuxt`.

```js
class SomeClass {
  constructor (nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // We have access to `this.nuxt` and `this.options`
  }
}
```

Classes are *plugable* so they should register a plugin on main `nuxt` container to register more hooks.

```js
class FooClass {
  constructor (nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options

    this.nuxt.callHook('foo', this)
  }
}
```

So we can hook into `foo` module like this:

```js
nuxt.hook('foo', foo => {
    // ...
})
```

---
title: "API: Nuxt Modules Intro"
description: 更好地了解Nuxt内部
---

# Nuxt 内部

Nuxt.js具有完全模块化的架构，允许开发人员使用灵活的API扩展Nuxt Core的任何部分。

如果有兴趣开发自己的模块，请查看 [Modules 教程](/guide/modules) 获取更多详细信息。

本节有助于熟悉Nuxt内部，并可以作为参考，在编写自己的模块时更好地理解它。

### Core

这些类是Nuxt的核心，应该在运行时和构建时都存在。

#### Nuxt

- [`Nuxt` Class](/api/internals-nuxt)
- 来源: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [`Renderer` Class](/api/internals-renderer)
- 来源: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [`ModuleContainer` Class](/api/internals-module-container)
- 来源: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Build

这些类仅用于构建或开发模式。

#### Builder

- [`Builder` Class](/api/internals-builder)
- 来源: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [`Generator` Class](/api/internals-generator)
- 来源: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### Common

#### Utils

- 来源: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- 来源: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## Packaging & Usage

Nuxt默认导出所有类。要导入它们：

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## Common patterns

所有Nuxt类都引用了`nuxt`实例和选项，这样我们总是在类之间有一致的API来访问`options`和`nuxt`。

```js
class SomeClass {
  constructor (nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction () {
    // We have access to `this.nuxt` and `this.options`
  }
}
```

类是可*插入*的，因此他们应该在main `nuxt`容器上注册一个插件来注册更多的hooks。

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

所以我们可以像这样挂载hook `foo`模块：

```js
nuxt.hook('foo', (foo) => {
  // ...
})
```

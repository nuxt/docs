---
title: 模块
description: 模块是Nuxt.js扩展，可以扩展其核心功能并添加无限的集成。
---

> 模块是Nuxt.js扩展，可以扩展其核心功能并添加无限的集成。

## 介绍

在使用Nuxt开发应用程序时，您很快就会发现框架的核心功能还不够。 Nuxt可以使用配置选项和插件进行扩展，但是在多个项目中维护这些自定义是繁琐、重复和耗时的。 另一方面，开箱即用支持每个项目的需求将使Nuxt非常复杂且难以使用。

这就是Nuxt提供更高阶**模块系统**的原因，可以轻松扩展核心。 模块只是在引导Nuxt时按顺序调用的**函数**。 框架在加载之前等待每个模块完成。 如此，模块几乎可以自定义Nuxt的任何地方。 感谢Nuxt的模块化设计 (基于 webpack [Tapable](https://github.com/webpack/tapable)), 模块可以轻松地为某些入口点注册钩子，例如构建器初始化。模块还可以覆盖模板，配置`webpack`加载器，添加`CS`S库以及执行许多其他有用的任务。

最重要的是, Nuxt模块可以合并到npm包中。 这使得它们易于跨项目开发重用并与Nuxt社区共享, 我们可以创建一个高质量的Nuxt附加组件生态系统。

如果你：

- 是**优秀团队**的成员，需要快速引导新项目。
- 厌倦了为集成Google Analytics等常见任务重新造轮子。
- 是一个优秀的**开源**爱好者，希望轻松与社区分享您的工作。
- 是一家重视**质量**和**可重用性**的**企业**公司的成员。
- 通常是在短期限内完成，没有时间深入了解每个新库或集成的细节。
- 厌倦了处理对低级接口的重大改变，并且需要能够正常工作的东西。

## 基本模块

如上所述，模块只是简单的功能。它们可以打包为`npm`模块或直接包含在项目源代码中。

**modules/simple.js**

```js
export default function SimpleModule (moduleOptions) {
  // Write your code here
}

// REQUIRED if publishing as an npm package
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

这是用户使用`modules`数组传递对象，我们可以使用它来定制它的行为。

**`this.options`**

您可以使用此属性直接访问Nuxt选项。这是`nuxt.config.js`，其中包含所有默认选项，可用于模块之间的共享选项。

**`this.nuxt`**

这是对当前Nuxt实例的引用。 请参考 [Nuxt class docs for available methods](/api/internals-nuxt).

**`this`**

modules中的context, 请参考 [ModuleContainer](/api/internals-module-container) 来查看可用的方法。

**`module.exports.meta`**

如果要将模块发布为npm包，则**需要**配置此选项。Nuxt内部使用`meta`来更好地处理您的包。

**nuxt.config.js**

```js
export default {
  modules: [
    // Simple usage
    '~/modules/simple'

    // Passing options
    ['~/modules/simple', { token: '123' }]
  ]
}
```

然后，我们告诉Nuxt为项目加载一些特定模块，并将可选参数作为选项。 请参考 [莫模块配置](/api/configuration-modules) 文档来查看更多!

## 异步模块

并非所有模块都会同步完成所有操作，例如：您可能希望开发一个需要获取某些API或执行异步IO的模块。为此，Nuxt支持在异步模块中返回Promise或调用回调。

### 使用 async/await

<p class="Alert Alert--orange">

请注意，仅在Node.js > 7.2中支持使用`async` / `await`。 因此，如果您是模块开发人员，至少要警告用户使用它们时Node.js版本不能低于7.2。 对于大量异步模块或更好的传统支持，您可以使用bundler将其转换为兼容较旧的Node.js版本或Promise方法。

</p>

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // You can do async works here using `async`/`await`
  let pages = await fse.readJson('./pages.json')
}
```

### 返回 Promise

```js
import axios from 'axios'

export default function asyncModule() {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Do something by extending Nuxt routes
    })
}
```

### 使用回调

```js
import axios from 'axios'

export default function asyncModule(callback) {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      callback()
    })
}
```


## 常见模块

### 优先级最高选项

有时在`nuxt.config.js`中注册模块时可以使用顶级选项更方便，这允许我们组合多个选项源。

**nuxt.config.js**

```js
export default {
  modules: [
    '@nuxtjs/axios'
  ],

  // axios module is aware of this by using `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
export default function (moduleOptions) {
  const options = Object.assign({}, this.options.axios, moduleOptions)
  // ...
}
```

### 提供插件

通常，模块在添加时需提供一个或多个插件。 例如：[bootstrap-vue](https://bootstrap-vue.js.org) 模块需要将自己注册到`Vue`中。 为此我们可以使用 `this.addPlugin` 方法。

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### 模板插件

已注册的模板和插件可以利用[lodash templates](https://lodash.com/docs/4.17.4#template)模板有条件地更改已注册插件的输出。

**plugin.js**

```js
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Dev only code
<% } %>
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt will replace `options.ua` with `123` when copying plugin to project
      ua: 123,

      // conditional parts with dev will be stripped from plugin code on production builds
      debug: this.options.dev
    }
  })
}
```

### 添加CSS库

考虑是否存在CSS库以避免重复，并添加**一个选项**来禁用模块中的CSS库。请参见下面的示例。

**module.js**

```js
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Add Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Emit assets

我们可以注册webpack插件用来在构建期间发出资源。

**module.js**

```js
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {

        // This will generate `.nuxt/dist/info.txt' with contents of info variable.
        // Source can be buffer too
        compilation.assets['info.txt'] = { source: () => info, size: () => info.length }

        cb()
      })
    }
  })
}
```

### 注册自定义 loaders

我们可以使用`this.extendBuild`在`nuxt.config.js`中执行与`build.extend`相同的操作。

**module.js**

```js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Customize existing loaders
      // Refer to source code for Nuxt internals:
      // https://github.com/nuxt/nuxt.js/tree/dev/packages/builder/src/webpack/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## 在指定钩子上运行任务

您的模块可能只需要在特定条件下执行操作，而不仅仅是在Nuxt初始化期间。我们可以使用强大的[Tapable](https://github.com/webpack/tapable)插件来执行特定事件的任务。Nuxt将等待钩子返回`Promise`或被定义为`async`(异步)。

```js
export default function () {
  // Add hook for modules
  this.nuxt.hook('module', moduleContainer => {
    // This will be called when all modules finished loading
  })

  // Add hook for renderer
  this.nuxt.hook('renderer', renderer => {
    // This will be called when renderer was created
  })

  // Add hook for build
  this.nuxt.hook('build', async builder => {
    // This will be called once when builder created

    // We can even register internal hooks here
    builder.hook('compile', ({compiler}) => {
        // This will be run just before webpack compiler starts
    })
  })

  // Add hook for generate
  this.nuxt.hook('generate', async generator => {
    // This will be called when a Nuxt generate starts
  })
}
```

<p class="Alert">

modules有许多钩子和可能性。请参考 [Nuxt Internals](/api/internals) 了解有关Nuxt内部API的更多信息。

</p>

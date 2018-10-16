---
title: Modules
description: Modules are Nuxt.js extensions which can extend its core functionality and add endless integrations.
---

> Modules are Nuxt.js extensions which can extend its core functionality and add endless integrations.

## Introduction

While developing production-grade applications with Nuxt, you soon discover that the framework's core functionality is not enough. Nuxt can be extended with configuration options and plugins, but maintaining these customizations across multiple projects is tedious, repetitive and time-consuming. On the other hand, supporting every project's needs out of the box would make Nuxt very complex and hard to use.

This is why Nuxt provides a higher-order module system that makes it easy to extend the core. Modules are simply **functions** that are called sequentially when booting Nuxt. The framework waits for each module to finish before continuing. In this way, modules can customize almost any aspect of Nuxt. Thanks to Nuxt's modular design (based on webpack's [Tapable](https://github.com/webpack/tapable)), modules can easily register hooks for certain entry points like builder initialization. Modules can also override templates, configure webpack loaders, add CSS libraries, and perform any of a number of other useful tasks. 

Best of all, Nuxt modules can be incorporated into npm packages. This makes them easy to reuse across projects and to share with the Nuxt community, helping create an ecosystem of high-quality Nuxt add-ons.

Modules are great if you:

- Are a member of an **agile team** that needs to quickly bootstrap new projects.
- Are tired of **re-inventing** the wheel for common tasks like integrating Google Analytics.
- Are a lovely **Open Source** enthusiast who would like to easily **share** your work with the community.
- Are a member of an **enterprise** company that values **quality** and **reusability**.
- Are often up against short deadlines and don't have time to dig into the details of every new library or integration.
- Are tired of dealing with breaking changes to low-level interfaces, and need things that **just work™**.

## Write a basic Module

As already mentioned modules are just simple functions. They can be packaged as npm modules or directly included in project source code.

**modules/simple.js**

```js
module.exports = function SimpleModule (moduleOptions) {
  // Write your code here
}

// REQUIRED if publishing as an npm package
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

This is the object passed using `modules` array by user we can use it to customize it's behavior.

**`this.options`**

You can directly access to Nuxt options using this reference. This is `nuxt.config.js` with all default options assigned to and can be used for shared options between modules.

**`this.nuxt`**

This is a reference to current Nuxt instance. Refer to [Nuxt class docs for available methods](/api/internals-nuxt).

**`this`**

Context of modules. Refer to [ModuleContainer](/api/internals-module-container) class docs for available methods.

**`module.exports.meta`**

This line is **required** if you are publishing module as an npm package. Nuxt internally uses meta to work better with your package.

**nuxt.config.js**

```js
module.exports = {
  modules: [
    // Simple usage
    '~/modules/simple'

    // Passing options
    ['~/modules/simple', { token: '123' }]
  ]
}
```

We then tell Nuxt to load some specific modules for a project with optional parameters as options. Please refer to [modules configuration](/api/configuration-modules) docs for more info!

## Async Modules

Not all modules will do everything synchronous. For example you may want to develop a module which needs fetching some API or doing async IO. For this, Nuxt supports async modules which can return a Promise or call a callback.

### Use async/await

<p class="Alert Alert--orange">Be aware that `async`/`await` is only supported in Node.js > 7.2. So if you are a module developer at least warn users about that if using them. For heavily async modules or better legacy support you can use either a bundler to transform it for older Node.js compatibility or a promise method.</p>

```js
const fse = require('fs-extra')

module.exports = async function asyncModule() {
  // You can do async works here using `async`/`await`
  let pages = await fse.readJson('./pages.json')
}
```

### Return a Promise

```js
const axios = require('axios')

module.exports = function asyncModule() {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Do something by extending Nuxt routes
    })
}
```

### Use callbacks

```js
const axios = require('axios')

module.exports = function asyncModule(callback) {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      callback()
    })
}
```


## Common Snippets

### Top level options

Sometimes it is more convenient if we can use top level options while registering modules in `nuxt.config.js`. This allows us to combine multiple option sources.

**nuxt.config.js**

```js
module.exports = {
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
module.exports = function (moduleOptions) {
  const options = Object.assign({}, this.options.axios, moduleOptions)
  // ...
}
```

### Provide plugins

It is common that modules provide one or more plugins when added. For example [bootstrap-vue](https://bootstrap-vue.js.org) module would require to register itself into Vue. For this we can use `this.addPlugin` helper.

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
const path = require('path')

module.exports = function nuxtBootstrapVue (moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Template plugins

Registered templates and plugins can leverage [lodash templates](https://lodash.com/docs/4.17.4#template) to conditionally change registered plugins output.

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
const path = require('path')

module.exports = function nuxtBootstrapVue (moduleOptions) {
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

### Add a CSS library

Consider doing a check if a CSS library exists to avoid duplicates and add **an option to disable** the CSS libray in the module. See the example shown below.

**module.js**

```js
module.exports = function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Add Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Emit assets

We can register webpack plugins to emit assets during build.

**module.js**

```js
module.exports = function (moduleOptions) {
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

### Register custom loaders

We can do the same as `build.extend` in `nuxt.config.js` using `this.extendBuild`.

**module.js**

```js
module.exports = function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Customize existing loaders
      // Refer to source code for Nuxt internals:
      // https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/webpack/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Run Tasks on Specific hooks

Your module may need to do things only on specific conditions not just during Nuxt initialization. We can use powerful [Tapable](https://github.com/webpack/tapable) plugin system to do tasks on specific events. Nuxt will await for us if hooks return a Promise or are defined as `async`.

```js
module.exports = function () {
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

<p class="Alert">There are many many more hooks and possibilities for modules. Please refer to [Nuxt Internals](/api/internals) to learn more about Nuxt internal API.</p>

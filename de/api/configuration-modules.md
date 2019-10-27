---
title: "API: The modules Property"
description: Modules are Nuxt.js extensions which can extend it's core functionality and add endless integrations.
---

# The modules Property

- Type: `Array`

> Modules are Nuxt.js extensions which can extend it's core functionality and add endless integrations.  [Learn More](/guide/modules)

Example (`nuxt.config.js`):

```js
module.exports = {
  modules: [
    // Using package name
    '@nuxtjs/axios',

    // Relative to your project srcDir
    '~/modules/awesome.js',

    // Providing options
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Inline definition
    function () { }
  ]
}
```
Module developers usually provide additional needed steps and details for usage.

Nuxt.js tries to resolve each item in the modules array using node require path (in the `node_modules`) and then
Will be resolved from project `srcDir` if `~` alias is used. Modules are executed sequential so the order is important.

Modules should export a function to enhance nuxt build/runtime and optionally return a promise until their job is finished.
Note that they are required at runtime so should be already transpiled if depending on modern ES6 features.


Please see [Modules Guide](/guide/modules) for more detailed information on how they work or if interested developing your own module.
Also we have provided an official [Modules](https://github.com/nuxt-community/awesome-nuxt#modules) Section listing dozens of production ready modules made by Nuxt Community.

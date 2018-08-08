---
title: "API: The modules Property"
description: Modules are Nuxt.js extensions which can extend it's core functionality and add endless integrations.
---

# The modules Property (En)

- Type: `Array`

> Modules are Nuxt.js extensions which can extend it's core functionality and add endless integrations.  [Learn More](/guide/modules)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Example (`nuxt.config.js`):</p>

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

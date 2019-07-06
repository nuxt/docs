---
title: "API: The globalName Property (EN)"
description: Nuxt.js lets you customize the global ID used in the main HTML template as well as the main Vue instance name and other options.
---

# The globalName Property (EN)

> Nuxt.js lets you customize the global ID used in the main HTML template as well as the main Vue instance name and other options.

- Type: `String`
- Default: `nuxt`

Example:

`nuxt.config.js`

```js
{
  globalName: 'myCustomName'
}
```

It needs to be a valid JavaScript identifier.

## The globals property

> Customizes specific global names which are based on `globalName` by default.

- Type: `Object`
- Default:

```js
{
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>

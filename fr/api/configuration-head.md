---
title: "API: The head Property"
description: Nuxt.js let you define all default meta for your application inside nuxt.config.js.
---

# The head Property (En)

> Nuxt.js let you define all default meta for your application inside `nuxt.config.js`, use the same `head` property:

- Type: `Object`

```js
module.exports = {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>To know the list of options you can give to `head`, take a look at [vue-meta documentation](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).</p>

<p class="Alert Alert--teal"><b>INFO:</b> You can also use `head` in the page components and access to the component data through `this`, see [component head property](/api/pages-head).</p>

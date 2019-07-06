---
title: "API: The head Property (EN)"
description: Nuxt.js let you define all default meta for your application inside nuxt.config.js.
---

# The head Property (EN)

> Nuxt.js let you define all default meta for your application inside `nuxt.config.js`, use the same `head` property

- Type: `Object`

An example `nuxt.config.js`:
```js
export default {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

To know the list of options you can give to `head`, take a look at [vue-meta documentation](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

You can also use `head` in your components and access to the component data through `this` ([read more](/api/pages-head)).

<div class="Alert Alert--teal">

<b>Info:</b> To avoid duplicated meta tags when used in child component, set up an unique identifier with the `hid` key for your meta elements ([read more](https://vue-meta.nuxtjs.org/api/#tagidkeyname)).

</div>

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>

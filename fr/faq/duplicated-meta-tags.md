---
title: Duplicated Meta tags
description: Duplicated Meta tags with Nuxt.js?
---

# Duplicated Meta tags? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>This is a "feature" of [vue-meta](https://github.com/declandewet/vue-meta), please take a look at the [documentation of head elements](/guide/views#html-head).</p>

> To avoid any duplication when used in child component, please give an unique identifier with the `hid` key, please [read more](https://github.com/declandewet/vue-meta#lists-of-tags) about it.

For the meta description, you need to add the unique identifier `hid` so vue-meta will know that it has to overwrite the default tag.

Your `nuxt.config.js`:
```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'This is the generic description.'}
    ],
  },
...
```

An then in your individual page:
```js
export default {
  head () {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        { hid: 'description', name: 'description', content: 'Page 1 description' }
      ]
    }
  }
}
```

To learn how to use the `head` property in your pages, please see the [HTML head documentation](/guide/views#html-head).

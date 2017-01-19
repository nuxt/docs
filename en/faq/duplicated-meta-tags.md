---
title: Duplicated Meta tags
description: Duplicated Meta tags with Nuxt.js?
---

# Duplicated Meta tags?

This is a "feature" of [vue-meta](https://github.com/declandewet/vue-meta), please take a look at the [documentation of head elements](https://nuxtjs.org/guide/html-head#defaults-meta).

> To avoid any duplication when used in child component, please give a unique identifier with the hid key, please [read more](https://github.com/declandewet/vue-meta#lists-of-tags) about it.

So for the meta description, you should add the unique identifier `hid` so vue-meta will not that it has to erase the default tag.

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
        { hid: 'description', name: 'description', content: "Page 1 description" }
      ],
    }
  }
}
```

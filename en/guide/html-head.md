---
title: HTML Head
description: Nuxt.js uses vue-meta to update the headers and html attributes of your applications.
---

Nuxt.js uses [vue-meta](https://github.com/declandewet/vue-meta) to update the `headers` and `html attributes` of your application.

Nuxt.js configures `vue-meta` with these options:
```js
{
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
}
```

## Title

To update the title of the page, just add `head.title` in your page component.

To set the page title of `pages/index.vue`:

```html
<template>
  <h1>Home page</h1>
</template>

<script>
export default {
  head: {
    title: 'Home page'
  }
}
</script>
```

## Meta Tags

To know the list of options you can give to `head`, take a look at [vue-meta documentation](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).

Example of a custom viewport with a custom Google font:
```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

## Using Page Data

You might want to use the component data to display different headers, like a post title for example. Just use `head` as a function and you can use `this` inside to access your component data.

Example of displaying the post title:
```html
<script>
export default {
  async data ({ params }) {
    // fetch the post from the API
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
```

## Defaults Meta

Nuxt.js let you define all default meta for your application inside `nuxt.config.js`, use the same `head` property:

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

<p class="Alert">To avoid any duplication when used in child component, please give a unique identifier with the `hid` key, please [read more about it](https://github.com/declandewet/vue-meta#lists-of-tags).</p>

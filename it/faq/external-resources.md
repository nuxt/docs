---
title: External resources
description: How to use external resources with Nuxt.js?
---

# How to use external resources?

## Global Settings

Include your resources in the `nuxt.config.js` file:

```js
module.exports = {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
```

## Local Settings

Include your resources in your .vue file inside the pages directory:

```html
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
export default {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
</script>
```

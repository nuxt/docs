---
title: How to use external resources?
description: How to use external resources with Nuxt.js?
---

## Global Settings

You can include your external resources in the head object or function.
The following example is with an object, but the head function should be preferred as in the second one.
Include your resources in `nuxt.config.js`:

```js
export default {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
    ]
  }
}
```

## Local Settings

Include your resources in your `.vue` file inside the `pages/` directory:

```html
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
export default {
  head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
      ]
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: Roboto, sans-serif;
}
</style>
```

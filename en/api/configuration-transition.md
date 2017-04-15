---
title: "API: The transition Property"
description: Set the default properties of the page transitions.
---

# The transition Property

- Type: `String` or `Object`

> Used to set the default properties of the page transitions.

Default:
```js
{
  name: 'page',
  mode: 'out-in'
}
```

Example (`nuxt.config.js`):

```js
module.exports = {
  transition: 'page'
  // or
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

The transition key in `nuxt.config.js` is used to set the default properties for the page transitions. To learn more about the available keys when the `transition` key is an object, see the [pages transition property](/api/pages-transition#object).

---
title: "API: The pageTransition and layoutTransition Properties"
description: Set the default properties of the page and layout transitions.
---

> Nuxt v2.7.0 introduces key "pageTransition" in favor of the "transition" key to consolidate the naming with layout transition keys.

# The pageTransition Property

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
export default {
  pageTransition: 'page'
  // or
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

The transition key in `nuxt.config.js` is used to set the default properties for the page transitions. To learn more about the available keys when the `transition` key is an object, see the [pages transition property](/api/pages-transition#object).

# The layoutTransition Property

- Type: `String` or `Object`

> Used to set the default properties of the layout transitions. Configurations are same as `layout`

Default:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

Example (`nuxt.config.js`):

```js
export default {
  layoutTransition: 'layout'
  // or
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

Example global `css`:

```css
.layout-enter-active, .layout-leave-active {
  transition: opacity .5s
}
.layout-enter, .layout-leave-active {
  opacity: 0
}
```

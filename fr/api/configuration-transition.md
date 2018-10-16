---
title: "API: The transition Property"
description: Set the default properties of the page transitions.
---

# The transition Property (En)

- Type: `String` or `Object`

> Used to set the default properties of the page transitions.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Default:</p>
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
module.exports = {
  layoutTransition: 'layout'
  // or
  transition: {
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

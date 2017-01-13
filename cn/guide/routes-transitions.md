---
title: Routes Transitions
description: Nuxt.js uses the transition component to let you create amazing transitions/animations between your routes.
youtube: https://www.youtube.com/embed/RIXOzJWFfc8
---

> Nuxt.js uses the  [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) component to let you create amazing transitions/animations between your routes.

## Usage

**Nuxt.js default transition name is `"page"`.**

To add a fade transition to every page of your application, we need a CSS file that is shared across all our routes, so we start by creating a file in the `assets` folder.

Our global css in `assets/main.css`:
```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```

We add its path in our `nuxt.config.js` file:
```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

And voilà! A nice fade animation will be shown between every routes.

## The transition Key

You can update the defaults transition settings by adding the `transition` key in you `nuxt.config.js` file.

```js
module.exports = {
  transition: 'test'
  // or
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js will use these settings to set the component as follows:
```html
<transition name="test" mode="out-in">
```

To learn more about the Vue.js `<transition>` component: http://vuejs.org/v2/guide/transitions.html

The following properties that the `transition` key can have:

| key  | Type | Default | definition |
|------|------|---------|-----------|
| `name` | String | `"page"` | The transition name applied on all the routes transitions. |
| `mode` | String | `"out-in"` | The transition mode applied on all routes, see [Vue.js documentation](http://vuejs.org/v2/guide/transitions.html#Transition-Modes). |
| `css` | Boolean | `true` | Whether to apply CSS transition classes. Defaults to true. If set to false, will only trigger JavaScript hooks registered via component events. |
| `type` | String | `n/a` | Specify the type of transition events to wait for to determine transition end timing. Available values are "transition" and "animation". By default, it will automatically detect the type that has a longer duration. |
| `enterClass` | String | `n/a` | The starting state of the transition class. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `enterToClass` | String | `n/a` | The ending state for the transition. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `enterActiveClass` | String | `n/a` | The class applied across the entire transition duration. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `leaveClass` | String | `n/a` | The starting state of the transition class. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `leaveToClass` | String | `n/a` | The ending state for the transition. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |
| `leaveActiveClass` | String | `n/a` | The class applied across the entire transition duration. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) |

*Note: if the `transition` key is set as a string, it will be used as the `transition.name`.*

You can also define methods in the `transition`, these are for the [JavaScript hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks):

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

*Note: it’s also a good idea to explicitly add `css: false` for JavaScript-only transitions so that Vue can skip the CSS detection. This also prevents CSS rules from accidentally interfering with the transition.*

## Transition for a Specific Page

To define a custom transition for a specific route, simply add the `transition` key to the page component.

Set the `bounce` transition for the `pages/about.vue` page:
```html
<template>
  <div class="container">
    <h1>About page</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  transition: 'bounce'
}
</script>
```

And then we add the CSS animation for this custom transition in `assets/main.css`:
```css
.bounce-enter-active {
  animation: bounce-in .8s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% { transform: scale(0) }
  50% { transform: scale(1.5) }
  100% { transform: scale(1) }
}
@keyframes bounce-out {
  0% { transform: scale(1) }
  50% { transform: scale(1.5) }
  100% { transform: scale(0) }
}
```

*Note: you can also the set `transition` key as an object in page components*

## Dynamic Transition

To create a dynamic transition between two routes depending on the route parameters, set the `transition` key as a `function`.

Example of a dynamic transition for the `pages/posts.vue` page:
```html
<script>
export default {
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
</script>
```

Transitions applied on navigation:
- `/` to `/posts` => `slide-left`
- `/posts` to `/posts?page=3` => `slide-left`
- `/posts?page=3` to `/posts?page=2` => `slide-right`

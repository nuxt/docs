---
title: "API: The pageTransition Property"
description: Nuxt.js uses the `<transition>` component to let you create amazing transitions/animations between your pages.
---

# The transition Property

> Nuxt.js uses the [`<transition>`](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) component to let you create amazing transitions/animations between your pages.

> Nuxt v2.7.0 introduces key "pageTransition" in favor of the "transition" key to consolidate the naming with layout transition keys. From the Nuxt v3.0.0 will be the "transition" key deprecated.

- **Type:** `String` or `Object` or `Function`

To define a custom transition for a specific route, simply add the `pageTransition` key to the page component.

```js
export default {
  // Can be a String
  pageTransition: ''
  // Or an Object
  pageTransition: {}
  // or a Function
  pageTransition (to, from) {}
}
```

## String

If the `pageTransition` key is set as a string, it will be used as the `transition.name`.

```js
export default {
  pageTransition: 'test'
}
```

Nuxt.js will use these settings to set the component as follows:

```html
<transition name="test">
```

## Object

If the `pageTransition` key is set as an object:

```js
export default {
  pageTransition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js will use these settings to set the component as follows:

```html
<transition name="test" mode="out-in">
```

The `pageTransition` object can have the following properties:

| key                | Type      | Default    | definition                                                                                                                                                                                                                 |
|--------------------|-----------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`             | `String`  | `"page"`   | The transition name applied on all the route transitions.                                                                                                                                                                  |
| `mode`             | `String`  | `"out-in"` | The transition mode applied on all routes, see [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).                                                                                       |
| `css`              | `Boolean` | `true`     | Whether to apply CSS transition classes. Defaults to `true`. If set to `false`, will only trigger JavaScript hooks registered via component events.                                                                        |
| `duration`         | `Integer` | n/a        | The duration (in milliseconds) applied on the transition, see [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations).                                                           |
| `type`             | `String`  | n/a        | Specify the type of transition events to wait for to determine transition end timing. Available values are `"transition"` and `"animation"`. By default, it will automatically detect the type that has a longer duration. |
| `enterClass`       | `String`  | n/a        | The starting state of the transition class. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                             |
| `enterToClass`     | `String`  | n/a        | The ending state for the transition. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                    |
| `enterActiveClass` | `String`  | n/a        | The class applied across the entire transition duration. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                |
| `leaveClass`       | `String`  | n/a        | The starting state of the transition class. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                             |
| `leaveToClass`     | `String`  | n/a        | The ending state for the transition. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                    |
| `leaveActiveClass` | `String`  | n/a        | The class applied across the entire transition duration. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                |

You can also define methods in the `pageTransition`, these are for the [JavaScript hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks):

- `beforeEnter(el)`
- `enter(el, done)`
- `afterEnter(el)`
- `enterCancelled(el)`
- `beforeLeave(el)`
- `leave(el, done)`
- `afterLeave(el)`
- `leaveCancelled(el)`

*Note: it’s also a good idea to explicitly add `css: false` for JavaScript-only transitions so that Vue can skip the CSS detection. This also prevents CSS rules from accidentally interfering with the transition.*

### Transition Mode

**Default transition mode for pages differs from the default mode in VueJS**. The `pageTransition` mode is by default set to `out-in`. If you want to run leaving and entering transitions simultaneously, you have to set the mode to empty string `mode:""`. 

```js
export default {
  pageTransition: {
    name: 'test',
    mode: ''
  }
}
```

## Function

If the `pageTransition` key is set as a function:

```js
export default {
  pageTransition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Transitions applied on navigation:

- `/` to `/posts` => `slide-left`,
- `/posts` to `/posts?page=3` => `slide-left`,
- `/posts?page=3` to `/posts?page=2` => `slide-right`.

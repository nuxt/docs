---
title: "API: The key Property (EN)"
description: Set the `key` property of internal `<router-view>` component
---

# The key Property (EN)

> Set the `key` property of internal `<router-view>` component
- **Type:** `String` or `Function`

The `key` property is propagated into `<router-view>`, which is useful to make transitions inside a dynamic page and different route. Different keys result in rerendering of page components.

There are several ways to set the key. For more details, please refer to the `nuxtChildKey` prop in [the nuxt component](/api/components-nuxt).

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>

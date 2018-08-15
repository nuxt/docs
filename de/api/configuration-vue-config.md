---
title: "API: The vue.config Property"
description: A config object for Vue.config
---


# The vue.config Property

- Type: `Object`
- Default: `{ silent: !isDev, performance: isDev }`

> The vue.config property provides a direct configuration bridge for the `Vue.config`


**Example**

```js
export default {
  vue: {
    config: {
     productTip: true,
     devtools: false
    }
  }
}
```

This configuration will lead to the following Vue.config:

``` js
Vue.config.productTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [default value]
Vue.config.performance // isDev [default value]
```


To learn more about the `Vue.config` API, check out the [official Vue documentation](https://vuejs.org/v2/api/#Global-Config)

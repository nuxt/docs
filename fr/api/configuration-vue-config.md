---
title: "API: The vue.config Property"
description: A config object for Vue.config
---


# The vue.config Property (En)

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

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>This configuration will lead to the following Vue.config:</p>

``` js
Vue.config.productTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [default value]
Vue.config.performance // isDev [default value]
```


To learn more about the `Vue.config` API, check out the [official Vue documentation](https://vuejs.org/v2/api/#Global-Config)

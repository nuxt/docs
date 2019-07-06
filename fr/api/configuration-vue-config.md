---
title: "API: The vue.config Property (EN)"
description: A config object for Vue.config
---


# The vue.config Property (EN)

- Type: `Object`
- Default: `{ silent: !isDev, performance: isDev }`

> The vue.config property provides a direct configuration bridge for the `Vue.config`


**Example**

```js
export default {
  vue: {
    config: {
     productionTip: true,
     devtools: false
    }
  }
}
```

This configuration will lead to the following Vue.config:

``` js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [default value]
Vue.config.performance // isDev [default value]
```


To learn more about the `Vue.config` API, check out the [official Vue documentation](https://vuejs.org/v2/api/#Global-Config)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>

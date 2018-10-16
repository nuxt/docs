---
title: "API: The watchers Property"
description: The watchers property lets you overwrite watchers configuration.
---

# The watchers Property (En)

- Type: `Object`
- Default: `{}`

> The watchers property lets you overwrite watchers configuration in your nuxt.config.js.

## chokidar

- Type: `Object`
- Default: `{}`

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>To learn more about chokidar options, see the [chokidar API](https://github.com/paulmillr/chokidar#api).</p>

## webpack

- Type: `Object`
- Default:

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

To learn more about webpack watchoptions, see the [webpack documentation](https://webpack.js.org/configuration/watch/#watchoptions).

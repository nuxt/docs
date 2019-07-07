---
title: "API: The srcDir Property (EN)"
description: Define the source directory of your Nuxt.js application
---

# The srcDir Property (EN)

- Type: `String`
- Default: [rootDir value](/api/configuration-rootdir)

> Define the source directory of your Nuxt.js application

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Example (`nuxt.config.js`):</p>

```js
export default {
  srcDir: 'client/'
}
```

Then, your application structure can be:
```bash
-| app/
---| node_modules/
---| client/
------| pages/
------| components/
---| nuxt.config.js
---| package.json
```

This option is useful to have a custom server and using Nuxt.js, so all npm dependencies can be regrouped in one `package.json`.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
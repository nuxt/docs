---
title: "API: The srcDir Property"
description: Define the source directory of your nuxt.js application
---

# The srcDir Property (En)

- Type: `String`
- Default: [rootDir value](/api/configuration-rootdir)

> Define the source directory of your nuxt.js application

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Example (`nuxt.config.js`):</p>

```js
module.exports = {
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

This option is useful to have a custom server and using nuxt.js, so all npm dependencies can be regrouped in one `package.json`.

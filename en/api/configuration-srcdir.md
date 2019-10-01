---
title: "API: The srcDir Property"
description: Define the source directory of your Nuxt.js application
---

- Type: `String`
- Default: [rootDir value](/api/configuration-rootdir)

> Define the source directory of your Nuxt.js application

Example (`nuxt.config.js`):

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
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
---| nuxt.config.js
---| package.json
```

This option is useful to have a custom server and using Nuxt.js, so all npm dependencies can be regrouped in one `package.json`.

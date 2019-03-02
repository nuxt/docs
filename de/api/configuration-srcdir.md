---
title: "API: The srcDir Property"
description: Define the source directory of your nuxt.js application
---

# The srcDir Property

- Type: `String`
- Default: [rootDir value](/api/configuration-rootdir)

> Define the source directory of your nuxt.js application

Example (`nuxt.config.js`):

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

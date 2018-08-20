---
title: "API: The hooks Property"
description: Hooks are listeners to Nuxt events that are typically used in Nuxt modules, but are also available in `nuxt.config.js`.
---

# The hooks Property

- Type: `Object`

> Hooks are [listeners to Nuxt events](/api/internals) that are typically used in Nuxt modules, but are also available in `nuxt.config.js`. [Learn More](/api/internals)

Example (`nuxt.config.js`):

```js
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(builder.nuxt.options.buildDir, 'extra-file')
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
```

Internally, hooks follow a naming pattern using colons (e.g., `build:done`). For ease of configuration, you can structure them as an hierarchical object when using `nuxt.config.js` (as exemplifed above) to set your own hooks. See [Nuxt Internals](/api/internals) for more detailed information on how they work.

## List of hooks

- [Nuxt hooks](https://nuxtjs.org/api/internals-nuxt#hooks)
- [Renderer hooks](https://nuxtjs.org/api/internals-renderer#hooks)
- [ModulesContainer hooks](https://nuxtjs.org/api/internals-module-container#hooks)
- [Builder hooks](https://nuxtjs.org/api/internals-builder#hooks)
- [Generator hooks](https://nuxtjs.org/api/internals-generator#hooks)

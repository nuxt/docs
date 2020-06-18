---
title: "API: The mode Property"
description: Change default nuxt mode
---

For Nuxt <= v2.12:

- Type: `string`
  - Default: `universal`
  - Possible values:
    - `'spa'`: No server-side rendering (only client-side navigation)
    - `'universal'`: Isomorphic application (server-side rendering + client-side navigation)

> You can use this option to change default nuxt mode for your project using `nuxt.config.js`

Use [target](/en/api/configuration-target.md) for Nuxt >= v2.13

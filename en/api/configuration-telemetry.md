---
title: "API: telemetry Property"
description: 'Nuxt.js collects anonymous telemetry data about general usage. This helps us to accurately gauge Nuxt feature usage and customization across all our users.'
---

## The telemetry Property

> Nuxt v2.13.0 introduces Nuxt Telemetry to collect anonymous telemetry data about general usage. This helps us to accurately gauge Nuxt feature usage and customization across all our users.

- Type: `Boolean`
- Default: `true`

You can disable [Nuxt Telemetry](https://github.com/nuxt/telemetry) for your project by setting `telemetry: false` in your `nuxt.config.js`:

```js
export default {
  telemetry: false
}
```

You can also use an environement variable:

```bash
NUXT_TELEMETRY_DISABLED=1
```

You can learn more about Nuxt Telemetry and the events sent on https://github.com/nuxt/telemetry

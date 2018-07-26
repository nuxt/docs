---
title: "API: The render Property"
description: Nuxt.js lets you customize runtime options for rendering pages
---

# The render Property

> Nuxt.js lets you customize runtime options for rendering pages

## bundleRenderer
- Type: `Object`

> Use this option to customize vue SSR bundle renderer. This option is skipped for spa mode.

```js
module.exports = {
  render: {
    bundleRenderer: {
      directives: {
        custom1: function (el, dir) {
          // something ...
        }
      }
    }
  }
}
```

Learn more about available options on [Vue SSR API Reference](https://ssr.vuejs.org/en/api.html#renderer-options).
It is recommended to not use this option as Nuxt.js is already providing best SSR defaults and misconfiguration might lead to SSR problems.

## etag
- Type: `Object`
  - Default: `{ weak: true }`

To disable etag for pages set `etag: false`

See [etag](https://www.npmjs.com/package/etag) docs for possible options.

### gzip
- Type `Object`
  - Default: `{ threshold: 0 }`

See [compression](https://www.npmjs.com/package/compression) docs for possible options.

### http2
- Type `Object`
  - Default: `{ push: false }`

Activate HTTP2 push headers.

## resourceHints
- Type: `boolean`
  - Default: `true`

> Adds `prefetch` and `preload` links for faster initial page load time.

You may want to only disable this option if have many pages and routes. 

## ssr
- Type: `boolean`
  - Default: `true` on universal mode and `false` on spa mode

> Enable SSR rendering

This option is automatically set based on `mode` value if not provided. 
This can be useful to dynamically enable/disable SSR on runtime after image builds. (With docker for example)

## static
- Type: `Object`
  - Default: `{}`

See [serve-static](https://www.npmjs.com/package/serve-static) docs for possible options.

## csp

> Use this to configure to load external resources of Content-Security-Policy

- Type: `Boolean` or `Object`
  - Default: `false`

Example (`nuxt.config.js`)

```js
export default {
  render: {
    csp: true
  }
}

// OR

export default {
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      allowedSources: undefined,
      policies: undefined
    }
  }
}

```

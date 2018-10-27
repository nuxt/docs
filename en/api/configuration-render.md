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
export default {
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

## compressor
- Type `Object`
  - Default: `{ threshold: 0 }`

When providing an object (or a falsy value), the [compression](https://www.npmjs.com/package/compression) middleware
will be used (with respective options).

If you want to use your own compression middleware, you can reference it
directly (f.ex. `otherComp({ myOptions: 'example' })`).

## http2
- Type `Object`
  - Default: `{ push: false, pushAssets: null }`

Activate HTTP2 push headers.

You can control what links to push using `pushAssets` function. Eg.:
```js
pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
  .filter(f => f.asType === 'script' && f.file === 'runtime.js')
  .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

You can add your own assets to the array as well.
Using `req` and `res` you can decide what links to push based on the request headers, for example using the cookie with application version.

The assets will be joined together with `, ` and passed as a single `Link` header.

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

## dist
- Type: `Object`
  - Default: `{ maxAge: '1y', index: false }`

The options used for serving distribution files. Only applicable in production.

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

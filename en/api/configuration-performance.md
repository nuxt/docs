---
title: "API: The performance Property"
description: Configure nuxt.js performance options
---

# The performance Property

> Nuxt.js lets you configure nuxt.js performance options.

## gzip

- Type: `Boolean` or `Object`
- Default:

```js
{
  threshold: 0
}
```

In production, nuxt.js will gzip all your assets by using the [compression](https://github.com/expressjs/compression) module.

If you are using a service like [CloudFare](https://www.cloudflare.com/) which already gzip every response, you can disable this feature in your `nuxt.config.js`:
```js
module.exports = {
  performance: {
    gzip: false
  }
}
```

## prefetch

- Type: `Boolean`
- Default: `true`

In production, nuxt.js uses the [prefetch](https://www.w3.org/TR/resource-hints/#dfn-prefetch) strategy to pre-fetch the pages bundle that will be required when navigating to the next page. When the user will click on a link, nuxt.js will already have pre-fetched the page and the navigation will feel instant while keeping the code splitted.

Example of the `prefetch` feature (in the `<head>` of the page rendered):
```html
<link rel="prefetch" href="/_nuxt/0.nuxt.bundle.61ba3fe4687aed56a098.js">
<link rel="prefetch" href="/_nuxt/1.nuxt.bundle.0e300058ecb654f36fb7.js">
<link rel="prefetch" href="/_nuxt/2.nuxt.bundle.2617656a084bb6760331.js">
```

To disable this feature, add this to your `nuxt.config.js`:

```js
module.exports = {
  performance: {
    prefetch: false
  }
}
```

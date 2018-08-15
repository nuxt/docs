---
title: "API: The Renderer Class"
description: Nuxt Renderer Class
---

# Renderer Class

- Source: **[core/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/renderer.js)**

This class is exporting a connect middleware which handles and serves all SSR and asset requests.

## Hooks

We can register hooks on certain life cycle events.

Hook                      | Arguments              | When
--------------------------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------
 `render:before`          |                        | *description missing*
 `render:setupMiddleware` | connect instance (app) | Before Nuxt adds it's middleware stack. We can use it to register custom server side middleware
 `render:resourcesLoaded` |                        | *description missing*
 `render:errorMiddleware` | connect instance (app) | Call your own middleware before using Nuxt's. See the [Sentry module](https://github.com/nuxt-community/sentry-module/blob/master/lib/sentry.js) for more info.
 `render:route`           |                        | *description missing*
 `render:done`            |  renderer              | SSR Middleware and all resources are ready

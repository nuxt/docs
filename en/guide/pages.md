---
title: Pages
description: Documentation is coming soon
---

Expliquer que le dossier pages est special et que chaque component est surchargé par Nuxt.js pour supprimer la diff client/server.

Clés spéciales des pages components:
- layout -> route vers layouts
- transition -> lien vers route transitions
- data
- fetch
- middleware -> route vers middleware
- validate -> route vers dynamic routes
- scrollToTop 

Expliquer la liste des options

## The Context

List of all the available keys in `context`:

| Key | Type | Available | Description |
|-----|------|--------------|-------------|
| `isClient` | Boolean | Client & Server | Boolean to let you know if you're actually renderer from the client-side |
| `isServer` | Boolean | Client & Server | Boolean to let you know if you're actually renderer from the server-side |
| `isDev` | Boolean | Client & Server | Boolean to let you know if you're in dev mode, can be useful for caching some data in production |
| `route` | [vue-router route](https://router.vuejs.org/en/api/route-object.html) | Client & Server | `vue-router` route instance [see documentation](https://router.vuejs.org/en/api/route-object.html) |
| `store` | [vuex store](http://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | Client & Server | `Vuex.Store` instance. **Available only if `store: true` is set in `nuxt.config.js`** |
| `env` | Object | Client & Server | Environment variables set in `nuxt.config.js`, see [env api](/api/configuration-env)  |
| `params` | Object | Client & Server | Alias of route.params |
| `query` | Object | Client & Server | Alias of route.query |
| `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | Server | Request from the node.js server. If nuxt is used as a middleware, the req object might be different depending of the framework you're using. |
| `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | Server | Response from the node.js server. If nuxt is used as a middleware, the res object might be different depending of the framework you're using. |
| `redirect` | Function | Client & Server | Use this method to redirect the user to another route, the status code is used on the server-side, default to 302. `redirect([status,] path [, query])` |
| `error` | Function | Client & Server | Use this method to show the error page: `error(params)`. The `params` should have the fields `statusCode` and `message`. |

---
title: "API: The data Method"
description: Nuxt.js supercharges the data method from vue.js to let you handle async operation before setting the component data.
---

# The data Method

> Nuxt.js *supercharges* the `data` method from vue.js to let you handle async operation before setting the component data.

- **Type:** `Function`

`data` is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route. This method receives the **context** as the first argument, you can use it to fetch some data and return the component data.

```js
export default {
  data (context) {
    return { foo: 'bar' }
  }
}
```

<div class="Alert Alert--orange">You do **NOT** have access of the component instance through `this` inside `data` because it is called **before initiating** the component.</div>

## Context

List of all the available keys in `context`:

| Key | Type | Available | Description |
|-----|------|--------------|-------------|
| `isClient` | Boolean | Client & Server | Boolean to let you know if you're actually renderer from the client-side |
| `isServer` | Boolean | Client & Server | Boolean to let you know if you're actually renderer from the server-side |
| `isDev` | Boolean | Client & Server | Boolean to let you know if you're in dev mode, can be useful for caching some data in production |
| `route` | [vue-router route](https://router.vuejs.org/en/api/route-object.html) | Client & Server | `vue-router` route instance. |
| `store` | [vuex store](http://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | Client & Server | `Vuex.Store` instance. **Available only if the [vuex store](/guide/vuex-store) is set.** |
| `env` | Object | Client & Server | Environment variables set in `nuxt.config.js`, see [env api](/api/configuration-env)  |
| `params` | Object | Client & Server | Alias of route.params |
| `query` | Object | Client & Server | Alias of route.query |
| `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | Server | Request from the node.js server. If nuxt is used as a middleware, the req object might be different depending of the framework you're using. *Not available via `nuxt generate`*. |
| `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | Server | Response from the node.js server. If nuxt is used as a middleware, the res object might be different depending of the framework you're using. *Not available via `nuxt generate`*. |
| `redirect` | Function | Client & Server | Use this method to redirect the user to another route, the status code is used on the server-side, default to 302. `redirect([status,] path [, query])` |
| `error` | Function | Client & Server | Use this method to show the error page: `error(params)`. The `params` should have the fields `statusCode` and `message`. |

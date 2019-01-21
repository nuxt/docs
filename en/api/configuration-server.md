---
title: "API: The server Property"
description: Nuxt.js let you define the server connection variables for your application inside `nuxt.config.js`.
---

# The server Property

- Type: `Object`

> Nuxt.js let you define the server connection variables for your application inside `nuxt.config.js`.

## Basic example (`nuxt.config.js`):

```js
export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  }
}
```

This lets you specify the [host and port](/faq/host-port) for your Nuxt.js server instance.

## Example using HTTPS configuration

```js
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

## Example using sockets configuration

```js
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- Type: `Object` or `Boolean`
- Default: `false`

Enabled `server.timing` option (disabled by default) adds a middleware to measure SSR generate time and add it to headers ('Server-Timing')

### Example using timing configuration

`server.timing` can be an object for providing options. Currently supported one is total.

```js
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### Using timing api

`timing` api is also injected into `response` in server side when `server.time` is enabled.

#### Syntax

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### Example using timing in servermiddleware

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Middleware timing description')
  // server side operation..
  // ...
  res.timing.end('midd')
  next()
}
```

Then `server-timing` head will be included in response herder like:

```bash
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

Please refer [Server-Timing MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) for more details.

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

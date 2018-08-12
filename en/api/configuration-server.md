---
title: "API: The server Property"
description: Nuxt.js let you define the server connection variables for your application inside `nuxt.config.js`.
---

# The server Property

- Type: `Object`

> Nuxt.js let you define the server connection variables for your application inside `nuxt.config.js`.

Example (`nuxt.config.js`):

```js
module.exports = {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost
  }
}
```

This lets you specify the host and port for your Nuxt.js server instance.

Learn more about how to configure the connection variables in different ways, see also [How to edit host and port?](/faq/host-port).
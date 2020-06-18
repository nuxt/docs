---
title: "API: RuntimeConfig properties"
description: RuntimeConfig allows passing dynamic config and environment variables to the nuxt context
---

Runtime config allows passing dynamic config and environment variables to the nuxt context.
For more information of usage, please see [runtime config guide](/guide/runtime-config)

## `publicRuntimeConfig`

- Type: `Object`

Value of this object is accessible from both client and server using `$config`.

## `privateRuntimeConfig`

- Type: `Object`

Value of this object is accessible only from client using `$config`. Overrides `publicRuntimeConfig` for server.

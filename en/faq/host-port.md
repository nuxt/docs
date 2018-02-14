---
title: HOST and PORT
description: How to edit HOST and PORT with Nuxt.js?
---

# How to edit HOST and PORT?

You can configure the PORT with 3 different ways:

1. With env variables

  ```js
  "scripts": {
    "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
  }
  ```

2. Add better cross platform development support.

  **Note**: for better cross platform development support you can use [cross-env](https://www.npmjs.com/package/cross-env) package.

  Installation:

  ```bash
  npm install --save-dev cross-env
  ```

  ```js
  "scripts": {
    "dev": "cross-env HOST=0.0.0.0 PORT=3333 nuxt"
  }
  ```

3. Via a `nuxt` config in the `package.json`:

  Inside your `package.json`:

  ```js
  "config": {
    "nuxt": {
      "host": "0.0.0.0",
      "port": "3333"
    }
  },
  "scripts": {
    "dev": "nuxt"
  }
  ```

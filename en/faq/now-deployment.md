---
title: Now Deployment
description: How to deploy Nuxt.js app with Now?
---

# How to deploy with Now?

To deploy with [ZEIT Now](https://zeit.co/now) you need to customize `package.json` add create a `now.json` config.

* Add `now-build` script command to `package.json`:
  * For SPA (without SSR):
    ```js
    "scripts": {
       ...
       "now-build": "nuxt build --spa"
    }
    ```
  * For Static Generated (Pre Rendering):
    ```js
    "scripts": {
       ...
       "now-build": "nuxt generate"
    }
    ```
* Create `now.json` and define `builds`
  ```json
  {
    "version": 2,
    "builds": [
      { "src": "package.json", "use": "@now/static-build" }
    ]
  }
  ```
* Run `now` and enjoy!

Note: we recommend putting `.nuxt` in `.npmignore` or `.gitignore`.

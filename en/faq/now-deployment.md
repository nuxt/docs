---
title: Now Deployment
description: How to deploy Nuxt.js app with Now?
---

# How to deploy with Now?

## Now V2

**Note:** You cannot deploy a server-side-rendered Nuxt app with Now V2 right now. Please use Now V1 for such apps.

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

## Now V1 (legacy)

To deploy with [now.sh](https://zeit.co/now) a `package.json` like follows is recommended:

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

Then run `now` and enjoy!

Note: we recommend putting `.nuxt` in `.npmignore` or `.gitignore`.

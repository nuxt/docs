---
title: Now Deployment
description: How to deploy Nuxt.js app with Now?
---

# How to deploy with Now?

![nuxt-now-builder](https://user-images.githubusercontent.com/904724/61308402-7a752d00-a7f0-11e9-9502-23731ccd00fd.png)

## Now V2

To deploy with [Now V2](https://zeit.co/now), the Nuxt.js team and contributors worked on an official [@nuxtjs/now-builder](https://github.com/nuxt/now-builder) package.

All you have to do is to setup a `now.json` file:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/now-builder",
      "config": {}
    }
  ]
}
```

You can learn more and see examples on https://github.com/nuxt/now-builder


## Now V1 (legacy)

To deploy with [Now V1](https://zeit.co/now) a `package.json` like follows is recommended:

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

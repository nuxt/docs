---
title: Github Pages Deployment
description: How to deploy Nuxt.js on Github Pages?
---

# How to deploy on Github Pages?

Nuxt.js gives you the possibility to host your web application on any static hosting like [Github Pages](https://pages.github.com/) for example.

To deploy on Github Pages, you need to generate your static web application:

```bash
npm run generate
```

It will create a `dist` folder with everything inside ready to be deployed on Github Pages hosting.
Branch `gh-pages` for project repository OR branch `master` for user or organization site

## Command line deployment

You can also use [push-dir package](https://github.com/L33T-KR3W/push-dir):

First install it via npm:
```bash
npm install push-dir --save-dev
```

Add a `deploy` command to your package.json with the branch as `gh-pages` for project repository OR `master` for user or organization site.

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

Then generate and deploy your static application:
```bash
npm run generate
npm run deploy
```

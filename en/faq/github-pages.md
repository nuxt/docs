---
title: GitHub Pages Deployment
description: How to deploy Nuxt.js on GitHub Pages?
---

# How to deploy on GitHub Pages? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Nuxt.js gives you the possibility to host your web application on any static hosting like [GitHub Pages](https://pages.github.com/) for example.</p>

To deploy on GitHub Pages, you need to generate your static web application:

```bash
npm run generate
```

It will create a `dist` folder with everything inside ready to be deployed on GitHub Pages hosting.
Branch `gh-pages` for project repository OR branch `master` for user or organization site

<p class="Alert Alert--nuxt-green"><b>INFO:</b> If you use a custom domain for your GitHub Pages and put `CNAME` file, it is recommended that CNAME file is put in the `static` directory. [More documentation](/guide/assets#static) about it.</p>

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

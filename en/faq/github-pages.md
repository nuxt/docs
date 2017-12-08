---
title: GitHub Pages Deployment
description: How to deploy Nuxt.js app on GitHub Pages?
---

# How to deploy on GitHub Pages?

Nuxt.js gives you the possibility to host your web application on any static hosting like [GitHub Pages](https://pages.github.com/) for example.

To deploy on GitHub Pages, you need to generate your static web application:

```bash
npm run generate
```

It will create a `dist` folder with everything inside ready to be deployed on GitHub Pages hosting. Branch `gh-pages` for project repository OR branch `master` for user or organization site

<p class="Alert Alert--nuxt-green"><b>Info:</b> If you use a custom domain for your GitHub Pages and put `CNAME` file, it is recommended that CNAME file is put in the `static` directory. [More documentation](/guide/assets#static) about it.</p>

## Deploying to GitHub Pages for repository

If you are creating GitHub Pages for one specific repository, and you don't have any custom domain, the URL of the page will be in this format: `http://<username>.github.io/<repository-name>`.

If you deployed `dist` folder without adding [router base](https://nuxtjs.org/api/configuration-router/#base), when you visit the deployed site you will find that the site is not working due to missing assets. This is because we assume that the website root will be `/`, but in this case it is `/<repository-name>`.

To fix the issue we need to add [router base](https://nuxtjs.org/api/configuration-router/#base) configuration in `nuxt.config.js`:

```js
module.exports = {
  router: {
    base: '/<repository-name>/'
  }
}
```

This way, all generated path asset will be prefixed with `/<repository-name>/`, and the next time you deploy the code to repository GitHub Pages, the site should be working properly.

There is a downside adding `router.base` as the default setting in `nuxt.config.js` though, when you are running `npm run dev`, it won't be working properly since the base path changes. To fix this issue, we want to create a conditional for `router.base` whether to include `<repository-name>`:

```js
/* nuxt.config.js */
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/<repository-name>/'
  }
} : {}

module.exports = {
  ...routerBase
}
```

and now we just need to set `DEPLOY_ENV='GH_PAGES'` to build the site for GitHub Pages:

```js
/* package.json */
"scripts": {
  "build:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt generate"
},
```

For Windows user, you might want to install [cross-env](https://github.com/kentcdodds/cross-env) if you are not using `bash`

```sh
npm install cross-env --save-dev
```

then use it this way:

```js
  "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate"
```

## Command line deployment

You can also use [push-dir package](https://github.com/L33T-KR3W/push-dir):

First install it via npm:

```bash
npm install push-dir --save-dev
```

Add a `deploy` command to your `package.json` with the branch as `gh-pages` for project repository OR `master` for user or organization site.

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

---
title: "API: The css Property"
description: Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every page).
---

# The css Property (En)

> Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every page).

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>In case you want to use ```sass``` make sure that you have installed ```node-sass``` and ```sass-loader``` packages. If you didn't  just</p>

```sh
npm install --save-dev node-sass sass-loader
```

- Type: `Array`
 - Items: `String`

In `nuxt.config.js`, add the CSS resources:

```js
module.exports = {
  css: [
    // Load a node module directly (here it's a SASS file)
    'bulma',
    // CSS file in the project
    '@/assets/css/main.css',
    // SCSS file in the project
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js will automatically guess the file type by it's extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.
---
title: Surge Deployment
description: How to deploy Nuxt.js with Surge.sh?
---

# How to deploy with Surge.sh? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Nuxt.js gives you the possibility to host your web application on any static hosting like [surge.sh](https://surge.sh/) for example.</p>

To deploy on surge.sh, first install it on your computer:
```bash
npm install -g surge
```

Then, we tell nuxt.js to generate our web application:

```bash
npm run generate
```

It will create a `dist` folder with everything inside ready to be deployed on a static hosting.

We can then deploy it to surge.sh:

```bash
surge dist/
```

Done :)

If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell nuxt.js how to generate these dynamic routes.

<div class="Alert">When generating your web application with `nuxt generate`, [the context](/api) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div>

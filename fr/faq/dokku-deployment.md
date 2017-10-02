---
title: Dokku Deployment
description: How to deploy a Nuxt.js application on Dokku?
---

# How to deploy on Dokku? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>We recommend to read [Dokku documentation for the setup](http://dokku.viewdocs.io/dokku/getting-started/installation/) and [Deploying a Node.js Application on Digital Ocean using dokku](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/)</p>

For the example, we will call our nuxt.js application `my-nuxt-app`

We need to tell Dokku to install the `devDependencies` of the project (to be able to launch `npm run build`):

```bash
// on Dokku Server
dokku config:set my-nuxt-app NPM_CONFIG_PRODUCTION=false
```

Also, we want our application to listen on the port `0.0.0.0` and run in production mode:

```bash
// on Dokku Server
dokku config:set my-nuxt-app HOST=0.0.0.0 NODE_ENV=production
```

You should see these 3 line when you type `dokku config my-nuxt-app`

![nuxt config vars Dokku](https://i.imgur.com/9FNsaoQ.png)

Then, we tell Dokku to launch `npm run build` via the `scripts.dokku.predeploy` script in our project `app.json`:
`create a file name app.json in our project root folder`

```js
{
  "scripts": {
    "dokku": {
      "predeploy": "npm run build"
    }
  }
}
```

Finally, we can push our app on Dokku with:

```bash
// commit your change before push.
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

Voilà! Our nuxt.js application is now hosted on Dokku!

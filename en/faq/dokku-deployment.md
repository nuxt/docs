---
title: Dokku Deployment
description: How to deploy Nuxt.js on Dokku?
---

# How to deploy on Dokku?

Dokku is smallest PaaS implementation.

We recommend you to read the [Dokku documentation for setup](http://dokku.viewdocs.io/dokku/getting-started/installation/), and [Deploying a Node.js Application on Digital Ocean Using dokku](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/)

Suppose you already understand how to depoly to Dokku and created your app as my-nuxt-app .

First, we need to tell Dokku to install the `devDependencies` of the project (to be able to launch `npm run build`):
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

Finally, we can push the app on Dokku with:
```bash
// commit your change before push.
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

Voilà! Your nuxt.js application is now hosted on Dokku!

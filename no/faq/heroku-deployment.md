---
title: Heroku Deployment
description: How to deploy Nuxt.js on Heroku?
---

# How to deploy on Heroku?

We recommend you read the [Heroku documentation for Node.js](https://devcenter.heroku.com/articles/nodejs-support).

First, we need to tell Heroku to install the `devDependencies` of the project (to be able to launch `npm run build`):

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Also, we want our application to listen on the host `0.0.0.0` and run in production mode:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

You should see this in your Heroku dashboard (Settings section):

![nuxt config vars Heroku](https://i.imgur.com/EEKl6aS.png)

Then, we tell Heroku to launch `npm run build` via the `heroku-postbuild` script in our `package.json`:

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "heroku-postbuild": "npm run build"
}
```

Finally, we can push the app on Heroku with:

```bash
git push heroku master
```

Voilà! Your Nuxt.js application is now hosted on Heroku!

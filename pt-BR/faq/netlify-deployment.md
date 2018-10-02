---
title: Netlify Deployment
description: How to deploy Nuxt.js on Netlify?
---

# How to deploy on Netlify?

Deploying to [Netlify](https://www.netlify.com) is a low friction option for getting a __statically generated__ Nuxt.js site online quickly.

The core of the process leverages the `nuxt generate` command during deployment to build a static version of your Nuxt.js app into a `dist` directory. The contents of this directory are then deployed to a production URL.

### Getting Started

Press the _"New site from Git"_ button on the Netlify dashboard. Authenticate with your repository host, select a repository to deploy, and continue. You should land on step 3: _"Build options, and deploy!"_

### Configure:

1. __Branch to deploy:__ `master`, or which-ever branch you prefer
1. __Build command:__ `npm run generate`
1. __Publish directory:__ `dist`

> Optionally, you can add additional ENV variables via the _"Advanced"_ button. These can be helpful for swapping in alternative API credentials and so on. Netlify also provides a [default ENV variables](https://www.netlify.com/docs/build-settings/#build-environment-variables) which can be read by your Nuxt.js application at build time.

Click _"Deploy site"_ to immediately trigger a deploy. Your Netlify site will be assigned a random URL and deployed using the `nuxt generate` command.

Voilà! Your Nuxt.js application is now hosted on Netlify!
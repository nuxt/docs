---
title: Netlify Deployment
description: How to deploy Nuxt.js on Netlify?
---

# How to deploy on Netlify?

Deploying to [Netlify](https://www.netlify.com) is a low friction option for getting a __statically generated__ Nuxt.js site online quickly.

The core of the process leverages the `nuxt generate` command during deployment to build a static version of your Nuxt.js app into a `dist` directory. The contents of this directory are then deployed to a production URL.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Watch a free lesson on <strong>How to deploy Nuxt.js to Netlify</strong> on Vue School 
    </p>
  </a>
</div>

## Getting Started

Press the _"New site from Git"_ button on the Netlify dashboard. Authenticate with your repository host, select a repository to deploy, and continue. You should land on step 3: _"Build options, and deploy!"_

## Configure:

### For a statically generated site

1. __Branch to deploy:__ `master`, or which-ever branch you prefer
1. __Build command:__ `npm run generate`
1. __Publish directory:__ `dist`

### For site generated in SPA mode

1. __Branch to deploy:__ `master`, or which-ever branch you prefer
1. __Build command:__ `npm run build`
1. __Publish directory:__ `dist`

For a single page app there is a problem with refresh as by default on netlify the site redirects to *"404 not found"*. For any pages that are not generated they will fallback to SPA mode and then if you refresh or share that link you will get Netlify's 404 page.

The easiest way to fix this is by adding a [generate property](https://nuxtjs.org/api/configuration-generate#fallback) in your `nuxt.config` and setting `fallback: true`. Then it will fallback to the 200.html when in SPA mode.

```js
export default {
  generate: {
    fallback: false
  }
}
```

If however you want to automatically apply headers and redirects of the SPA then there is a module for that, this is especially useful for when you have custom headers/redirects (in a _headers or_redirects file):

[netlify-files-module](https://github.com/nuxt-community/netlify-files-module)

> For more information on Netlify redirects see the [Netlify docs](https://www.netlify.com/docs/redirects/#rewrites-and-proxying). 

> For simple reference on netlify redirects read blog [post](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site) by Divya Sasidharan


> Optionally, you can add additional ENV variables via the _"Advanced"_ button. These can be helpful for swapping in alternative API credentials and so on. Netlify also provides a [default ENV variables](https://www.netlify.com/docs/build-settings/#build-environment-variables) which can be read by your Nuxt.js application at build time.

Click _"Deploy site"_ to immediately trigger a deploy. Your Netlify site will be assigned a random URL and deployed using the `nuxt generate` command.

Voilà! Your Nuxt.js application is now hosted on Netlify!

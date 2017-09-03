---
title: Google Analytics Integration
description: How to use Google Analytics?
---

# How to use Google Analytics?

First, please check the [official Google Analytics module](https://github.com/nuxt-community/modules/tree/master/modules/google-analytics) for nuxt.js*

Ortherwise, to use [Google Analytics](https://analytics.google.com/analytics/web/) with your nuxt.js application, we recommend to create a file `plugins/ga.js`:

```js
/* eslint-disable */

export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_ENV !== 'production') return
  /*
  ** Include Google Analytics Script
  */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /*
  ** Set the current page
  */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
  /*
  ** Every time the route changes (fired on initialization too)
  */
  app.router.afterEach((to, from) => {
    /*
    ** We tell Google Analytic to add a page view
    */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

> Replace `UA-XXXXXXXX-X` by your Google Analytics tracking ID.

Then, we tell nuxt.js to import it in our main application:

`nuxt.config.js`
```js
module.exports = {
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ]
}
```

Voilà, Google Analytics is integrated into your nuxt.js application and will track every page view!

<p class="Alert Alert--nuxt-green"><b>INFO:</b> you can use this method for any other tracking service.</p>

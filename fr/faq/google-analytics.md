---
title: Intégration de Google Analytics
description: Comment intégrer Google Analytics?
---

# Comment intégrer Google Analytics?

Pour utiliser [Google Analytics](https://analytics.google.com/analytics/web/) avec votre application nuxt.js, nous recommandons de créer un plugin `plugins/ga.js`:

```js
import router from '~router'
/*
** Only run on client-side and only in production mode
*/
if (process.env.NODE_ENV === 'production') {
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
  router.afterEach((to, from) => {
    /*
    ** We tell Google Analytic to add a page view
    */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

> Remplace `UA-XXXXXXXX-X` par votre ID de tracking Google Analytics.

Puis, nous importons le plugin dans notre application pricinpale:

`nuxt.config.js`
```js
module.exports = {
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ]
}
```

Voilà, Google Analytics est intégré dans notre application nuxt.js et trackera chaque page vue!

<p class="Alert Alert--nuxt-green"><b>INFO:</b> cette méthode est valable pour n'importe quel autre service de tracking.</p>

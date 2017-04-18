---
title: Google アナリティクスの統合
description: Google アナリティクスを使うには？
---

<!-- title: Google Analytics Integration -->
<!-- description: How to use Google Analytics? -->

<!-- # How to use Google Analytics? -->

# Google アナリティクスを使うには？

<!-- To use [Google Analytics](https://analytics.google.com/analytics/web/) with your nuxt.js application, we recommend to create a file `plugins/ga.js`: -->

Nuxt.js アプリケーションで [Google アナリティクス](https://analytics.google.com/analytics/web/) を使うには `plugins/ga.js` というファイルを作成することを推奨します:

<!-- ```js -->
<!-- import router from '~router' -->
<!-- /* -->
<!-- ** Only run on client-side and only in production mode -->
<!-- */ -->
<!-- if (process.env.NODE_ENV === 'production') { -->
<!--   /* -->
<!--   ** Include Google Analytics Script -->
<!--   */ -->
<!--   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ -->
<!--   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), -->
<!--   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) -->
<!--   })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); -->
<!--   /* -->
<!--   ** Set the current page -->
<!--   */ -->
<!--   ga('create', 'UA-XXXXXXXX-X', 'auto') -->
<!--   /* -->
<!--   ** Every time the route changes (fired on initialization too) -->
<!--   */ -->
<!--   router.afterEach((to, from) => { -->
<!--     /* -->
<!--     ** We tell Google Analytic to add a page view -->
<!--     */ -->
<!--     ga('set', 'page', to.fullPath) -->
<!--     ga('send', 'pageview') -->
<!--   }) -->
<!-- } -->
<!-- ``` -->

```js
import router from '~router'
/*
** クライアントサイドかつプロダクションモードでのみ実行
*/
if (process.env.NODE_ENV === 'production') {
  /*
  ** Google アナリティクスのスクリプトをインクルード
  */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /*
  ** 現在のページをセット
  */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
  /*
  ** ルートが変更されるたびに毎回実行（初期化も実行される）
  */
  router.afterEach((to, from) => {
    /*
    ** Google アナリティクスにページビューが追加されたことを伝える
    */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

<!-- \> Replace `UA-XXXXXXXX-X` by your Google Analytics tracking ID. -->

> `UA-XXXXXXXX-X`を Google アナリティクスのトラッキング ID に置き換えてください。

<!-- Then, we tell nuxt.js to import it in our main application: -->

それから `plugins/ga.js` をメインアプリケーション内でインポートすることを Nuxt.js に伝えます:

`nuxt.config.js`

```js
module.exports = {
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ]
}
```

<!-- Voilà, Google Analytics is integrated into your nuxt.js application and will track every page view! -->

よし！これで Google アナリティクスは Nuxt.js アプリケーションに統合され、すべてのページビューをトラッキングするようになりました！

<!-- <p class="Alert Alert--nuxt-green"><b>INFO:</b> you can use this method for any other tracking service.</p> -->

<p class="Alert Alert--nuxt-green"><b>情報:</b> 他のトラッキングサービスでも、同様の方法を使うことができます。</p>

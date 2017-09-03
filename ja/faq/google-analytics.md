---
title: Google アナリティクスの統合
description: Google アナリティクスを使うには？
---

# Google アナリティクスを使うには？

Nuxt.js アプリケーションで [Google アナリティクス](https://analytics.google.com/analytics/web/) を使うには `plugins/ga.js` というファイルを作成することを推奨します:

```js
/* eslint-disable */
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
}

export default ({ app: { router }, store }) => {
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

> `UA-XXXXXXXX-X`を Google アナリティクスのトラッキング ID に置き換えてください。

それから `plugins/ga.js` をメインアプリケーション内でインポートすることを Nuxt.js に伝えます:

`nuxt.config.js`

```js
module.exports = {
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ]
}
```

よし！これで Google アナリティクスは Nuxt.js アプリケーションに統合され、すべてのページビューをトラッキングするようになりました！

<p class="Alert Alert--nuxt-green"><b>情報:</b> 他のトラッキングサービスでも、同様の方法を使うことができます。</p>

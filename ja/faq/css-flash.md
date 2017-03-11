---
title: CSS Flash
description: なぜ CSS Flash が見えるのか？
---

<!-- title: CSS Flash -->
<!-- description: Why a CSS Flash appears with Nuxt.js? -->

<!-- # Why a CSS Flash appears? -->

# なぜ CSS Flash が見えるのか？

![cssflash](/flash_css.gif)

<!-- This is because the CSS is in the JavaScript build in **development mode** to allow hot-reloading via Webpack. -->

これが見えるのは Webpack をとおしてホットリローディングする **開発モード** でビルドした JavaScript の中に CSS が埋め込まれているためです。

Don't worry in production mode, the CSS is separated and put in the header so this "flash" does not appear anymore.

心配しないてください。プロダクションモードでは  CSS は分離されて head に置かれるため、このような "flash" は見えません。

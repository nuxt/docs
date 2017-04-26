---
title: CSS Flash
description: なぜ CSS Flash が見えるのか？
---

# なぜ CSS Flash が見えるのか？

![cssflash](/flash_css.gif)

これが見えるのは Webpack をとおしてホットリローディングする **開発モード** でビルドした JavaScript の中に CSS が埋め込まれているためです。

大丈夫です。プロダクションモードでは  CSS は分離されて head に置かれるため、このような "flash" は見えません。

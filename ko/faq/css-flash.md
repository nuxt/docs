---
title: CSS Flash
description: 왜 CSS Flash 가 보이는지?
---

<!-- title: CSS Flash -->
<!-- description: Why a CSS Flash appears with Nuxt.js? -->

<!-- # Why a CSS Flash appears? -->

# 왜 CSS Flash 가 보이는지?

![cssflash](/flash_css.gif)

<!-- This is because the CSS is in the JavaScript build in **development mode** to allow hot-reloading via Webpack. -->

이게 보이는 것은 Webpack 을 통해 핫리로딩하는 **개발모드** 에서 빌드한 JavaScript 안에 CSS 가 작성되어 있기 때문입니다.

<!-- Don't worry in production mode, the CSS is separated and put in the header so this "flash" does not appear anymore. -->

그러니 걱정마세요. 프로덕션 모드에서는 CSS 는 분리되어서 head 에 위치하기 때문에, 이런 "flash" 현상은 보이지 않습니다.

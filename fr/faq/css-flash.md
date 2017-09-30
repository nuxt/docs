---
title: CSS Flash
description: Why a CSS Flash appears with Nuxt.js?
---

# Why a CSS Flash appears? (En)

![cssflash](/flash_css.gif)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>This is because the CSS is in the JavaScript build in **development mode** to allow hot-reloading via Webpack.</p>

Don't worry in production mode, the CSS is separated and put in the header so this "flash" does not appear anymore.

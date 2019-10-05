---
title: CSS Flash
description: Why a CSS Flash appears with Nuxt.js?
---

# Why a CSS Flash appears?

![cssflash](/flash_css.gif)

This is because the CSS is in the JavaScript build in **development mode** to allow hot-reloading via webpack. This flash is called [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

Don't worry in **production mode**, the CSS is separated and put in the header so this flash of unstyled content does not appear anymore.

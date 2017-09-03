---
title: CSS Flash
description: Pourquoi un flash CSS apparaît avec Nuxt.js?
---

# Pourquoi un flash CSS apparaît?

![cssflash](/flash_css.gif)

C'est parce qu'en **mode développement** le CSS se trouve dans le JavaScript afin de permettre le hot-reloading via Webpack.

Ne vous inquiétez pas; en mode de production le CSS est séparé et placé dans l'en-tête afin que ce "flash" n'apparaisse plus.

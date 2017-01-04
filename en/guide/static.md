---
title: Static
description: Nuxt.js has a static directory for static files serving.
---

> Nuxt has a `static` directory for static files serving.

If you don't want to use [Webpacked Assets](/guide/assets) from the `assets` directory, you can create and use the `static` directory in your project root directory.

These files will be automatically serve by Nuxt and accessible in your project root URL.

This option is helpful for files like `robots.txt` or `sitemap.xml`.

From your code you can then reference those files with `/` URLs:

```html
<!-- Static image from static directory -->
<img src="/my-image.png"/>

<!-- Webpacked image from assets directory -->
<img src="/assets/my-image-2.png"/>
```

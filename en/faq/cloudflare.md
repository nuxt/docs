---
title: Using Nuxt with Cloudflare
description: What needs to be considered when using Nuxt with Cloudflare
---

# What needs to be considered when using Nuxt with Cloudflare?

Nuxt can - in most cases - work with additional content (not generated / created by Nuxt). But sometimes additional content can cause problems with Nuxt - especially Cloudflare's "Minification and Security Options".

Accordingly, you should make sure that the following options are unchecked / disabled in Cloudflare:

1. Speed > Optimization > Auto Minify: **Uncheck** JavaScript, CSS and HTML
2. Speed > **Disable / turn off** "Rocket Loader™"
3. Scrape Shield > **Disable / turn off** "Email Address Obfuscation"
4. Scrape Shield > **Disable / turn off** "Server-side Excludes"

With these settings, you can be sure that your Nuxt application will not be affected by Cloudflare's "Minification and Security Options" (which may cause unwanted side effects).

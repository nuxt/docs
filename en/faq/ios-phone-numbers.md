---
title: iOS and phone numbers
description: Safari on iOS changes phone numbers to links which can cause a render mismatch
---

# iOS and phone numbers

If you include telephone numbers in your Nuxt page, make sure to directly wrap them into a link:

```html
<!-- Example phone number: +7 (982) 536-50-77 -->

<template>
  <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
</template>

```

Otherwise, some mobile Safari versions will automatically transform these numbers into links. Sounds good and 
helpful at first glance but this will trigger a `NodeMismatch` warning as the SSR content doesn't match the website 
content anymore. This can make your app unusable on these Safari versions.

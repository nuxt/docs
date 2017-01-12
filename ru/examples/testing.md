---
title: Testing
description: Testing example with Nuxt.js
github: with-ava
---

## Documentation

[`ava`](https://github.com/avajs/ava) is a powerful JavaScript testing framework, mixed with [`jsdom`](https://github.com/tmpvar/jsdom), we can use them to do end-to-end testing easily for `nuxt` applications.

```bash
npm install --save-dev ava jsdom
```

Add test script to the `package.json`

__package.json__

```javascript
// ...
"scripts": {
  "test": "ava",
}
// ...

```

---
title: 'API: The srcDir Property'
description: Menentukan direktori asal pada aplikasi Nuxt.js Anda.
---

# The srcDir Property

- Type: `String`
- Default: [rootDir value](/api/configuration-rootdir)

> Menentukan direktori asal pada aplikasi nuxt.js Anda.

Example (`nuxt.config.js`):

```js
module.exports = {
  srcDir: 'client/'
}
```

Then, your application structure can be:

```bash
-| app/
---| node_modules/
---| client/
------| pages/
------| components/
---| nuxt.config.js
---| package.json
```

Pilihan ini berguna ketika memiliki server khusus yang menggunakan Nuxt.js, jadi semua dependensi npm dapat dikelompokkan kembali dalam satu `package.json`.

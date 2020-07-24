---
title: 'API: The rootComponents Property'
description: 'Add components shared between all layouts'
---

> Injecting components which that will not be re-rendered between layout changes

- Type: `Array` of `Object`
  - `Array`
    - Items: `String` (path to .vue component)

  - `Object`
    - Key: `String` (name of components instance in `$nuxt.$rootComponents`)
    - Value: `String` (path to .vue component)
- Default: `[]`

Example:

`nuxt.config.js`

```js
{
  rootComponents: {
    global: '@/components/global.vue'
  }
}
```

## Accessing

> You can access to instance of this components after application mounting in `$nuxt.$rootComponents`.

<div class="Alert Alert--orange">

<b>Info:</b> Before app mounted or on server, `$nuxt.$rootComponents` props filled by `null`.

</div>

- Type: `Object`

```js
{
  mounted() {
    this.$nextTick(() => {
      console.log(this.$nuxt.$rootComponents.global)
    })
  }
}
```

- Type: `Array`

```js
{
  mounted() {
    this.$nextTick(() => {
      console.log(this.$nuxt.$rootComponents[0])
    })
  }
}
```

<div class="Alert Alert--teal">

<b>Info:</b> If you use array, order is preserved.

</div>

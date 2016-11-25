---
title: page.transition
---

# Pages transitions

The `transition` option allows to set the transition options used in the `<transition>` component.

## transition

- **Type:** `String | Object`
- **Properties:**
  - `name`
    - type: `String`
    - default: `page`
  - `mode`
    - type: `String`
    - default: `out-in`

If the value of the transition key is a String, it we be used as the transition's name.

### Example

`pages/index.vue`:
```js
<script>
export default {
  transition: 'bounce'
}
</script>
```

In the `store/index.js`:

```js
// ...
actions: {
  fetchPosts ({ commit }) {
    return axios.get('https//my-api/posts')
    .then((res) => {
      commit('SET_POSTS', res.data)
    })
  }
}
// ...
```

When the page will be rendered, the store will be filled and we will be able to show the `$store.state` inside the template.

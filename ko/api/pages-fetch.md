---
title: "API: fetch 메소드"
description: fetch 메소드는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용합니다. 컴포넌트의 데이터를 세팅하지 않는 점을 빼고는 data 메소드와 비슷합니다.
---

# fetch 메소드

> fetch 메소드는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용합니다. 컴포넌트의 데이터를 세팅하지 않는 점을 빼고는 data 메소드와 비슷합니다.

- **타입:** `Function`

`fetch` 메소드가 *만약 세팅되어 있다면*, 컴포넌트가 로딩되기 전에 매번 호출됩니다(**페이지 컴포넌트에 한합니다**). 서버사이드 혹은 사용자가 페이지가 이동하기 전에 불려집니다.

`fetch` 메소드는 첫번째 인수로 받은 [컨택스트](/api#컨택스트)를 사용하여 데이터를 받고, 그 데이터를 스토어에 넣을 수 있습니다. fetch 메소드를 비동기화 하기 위해서 **Promise를 리턴합니다**. Nuxt.js는 컴포넌트가 랜더링 되기 전에 Promise가 종료되기를 기다립니다.

`pages/index.vue` 예제:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  fetch ({ store, params }) {
    return axios.get('http://my-api/stars')
      .then((res) => {
        store.commit('setStars', res.data)
      })
  }
}
</script>
```

async/await를 사용하면 코드를 보다 깔끔하게 할 수 있습니다:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    let { data } = await axios.get('http://my-api/stars')
    store.commit('setStars', data)
  }
}
</script>
```

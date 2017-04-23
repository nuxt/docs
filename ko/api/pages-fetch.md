---
title: "API: fetch 메소드"
description: fetch 메소드는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용합니다. 컴포넌트의 데이터를 세팅하지 않는 점을 빼고는 data 메소드와 비슷합니다.
---

<!-- title: "API: The fetch Method" -->
<!-- description: The fetch method is used to fill the store before rendering the page, it's like the data method except it doesn't set the component data. -->

<!-- # The fetch Method -->

# fetch 메소드

<!-- \> The fetch method is used to fill the store before rendering the page, it's like the data method except it doesn't set the component data. -->

> fetch 메소드는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용합니다. 컴포넌트의 데이터를 세팅하지 않는 점을 빼고는 data 메소드와 비슷합니다.

<!-- - **Type:** `Function` -->

- **타입:** `Function`

<!-- The `fetch` method, *if set*, is called every time before loading the component (**only for pages components**). It can be called from the server-side or before navigating to the corresponding route. -->

`fetch` 메소드는 *혹시 세팅되어 있다면*, 컴포넌트가 로딩되기 전에 매번 호출됩니다(**페이지 컴포넌트에 한합니다**). 서버사이드 혹은 사용자가 페이지를 이동하기 전에 불려집니다.

<!-- The `fetch` method receives [the context](/api#context) as the first argument, we can use it to fetch some data and fill the store. To make the fetch method asynchronous, **return a Promise**, nuxt.js will wait for the promise to be resolved before rendering the Component. -->

`fetch` 메소드는 첫번째 인수로 [컨택스트](/api#컨택스트)를 받아서, 그 컨택스트를 사용하여 데이터를 받고 그 데이터를 스토어에 넣을 수 있습니다. fetch 메소드를 비동기화 하기 위해서는 **Promise를 리턴합니다**. Nuxt.js는 컴포넌트가 랜더링 되기 전에 Promise가 종료되기를 기다립니다.

<!-- Example of `pages/index.vue`: -->

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

<!-- You can also use async/await to make your code cleaner: -->

async/await를 사용한 코드를 보다 깔끔하게 할 수 있습니다:

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

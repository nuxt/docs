---
title: "API: fetch 메소드"
description: fetch 메소드는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용합니다. 컴포넌트의 데이터를 세팅하지 않는 점을 빼고는 data 메소드와 비슷합니다.
---


## Nuxt <= 2.11

> fetch 메소드는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용합니다. 컴포넌트의 데이터를 세팅하지 않는 점을 빼고는 `asyncData` 메소드와 비슷합니다.

- **타입:** `Function`

`fetch` 메소드가 *만약 세팅되어 있다면*, 컴포넌트가 로딩되기 전에 매번 호출됩니다(**페이지 컴포넌트에 한합니다**). 서버사이드에서는 Nuxt 애플리케이션의 최초 요청 시 한번, 그리고 클라이언트 사이드에서 추가 경로를 탐색하기 전에 호출할 수 있습니다. 

`fetch` 메소드는 첫번째 인수로 받은 [컨택스트](/api#컨택스트)를 사용하여 데이터를 받고, 그 데이터를 스토어에 넣을 수 있습니다. fetch 메소드를 비동기화 하기 위해서 **Promise를 리턴합니다**. Nuxt.js는 컴포넌트가 랜더링 되기 전에 Promise가 종료되기를 기다립니다.

<div class="Alert Alert--orange">

<b>Warning:</b> `fetch` 내부에서 `this`를 통해 컴포넌트 인스턴스에 접근하지 **못합니다**. 이는 이 메소드가 컴포넌트를 초기화하기 전에 호출되기 때문입니다.

</div>

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

### Vuex

스토어에서 액션을 호출하기 원하신다면, `store.dispatch`를 `fetch`메소드 안에서 호출해주세요. 그리고 액션 내부에 `async`/`await`를 사용하는 것으로 액션을 기다려 주세요.

```html
<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('GET_STARS');
  }
}
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS ({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

### 쿼리 스트링 변경 수신하기

기본값으로 모든 쿼리 스트링 변경에 `fetch`메소드가 **호출되지는 않습니다**. 예를 들어 페이징(pagination) 컴포넌트에서와 같이 이 기본값을 변경하고 싶으시다면, `watchQuery` 프로퍼티를 통해서 페이지 컴포넌트에서 파라미터를 수신하도록 설정하시면 됩니다. [API `watchQuery` 페이지](/api/pages-watchquery)를 참조해 주세요.

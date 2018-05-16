---
title: "API: asyncData 메소드"
description: 서버사이드 데이타를 가져와서, 랜더링을 하고싶은 경우가 있겠죠. Nuxt.js 는 컴포넌트 데이타를 세팅하기 전에 비동기 처리를 할 수 있도록 하기 위해서 `asyncData` 메소드를 추가해 두었습니다.
---

# asyncData 메소드

Nuxt.js는 컴포넌트 데이터를 설정하기 전에 비동기 작업을 처리 할 수 있도록 vue.js의 `data` 메소드를 제공합니다.

> 서버사이드에서 데이터를 가져와서 랜더링을 하고싶은 경우가 있겠죠. Nuxt.js는 컴포넌트 데이타를 세팅하기 전에 비동기 처리를 할 수 있도록 하기 위해서 `asyncData` 메소드를 추가해 두었습니다.

- **타입:** `Function`

`asyncData`는 컴포넌트（**페이지 컴포넌트에 한합니다**）가 로딩되기 전에 매번 불려집니다. 서버사이드 랜더링이나 사용자가 페이지를 이동하기 전에 불려집니다. 그리고 이 메소드는 첫번째 인수로 [컨텍스트](/api#컨텍스트)를 받고, 컨텍스트를 사용한 데이터를 받아서 컴포넌트 데이터와 머지할 수 있습니다.

```js
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    return { project: 'nuxt' }
  }
}
```

<div class="Alert Alert--orange">`data` 메소드 내부에서 컴포넌트 인스턴스에 `this`를 이용하여 접근해서는 **안됩니다**. 왜냐면, `data` 메소드는 컴포넌트가  **인스턴스화 되기 전에** 불려지기 때문입니다.</div>

## 프로세스

`process`에서 이용할수 있는 키 목록:

| 키 | 타입 | 사용가능 영역 | 설명 |
|-----|------|--------------|-------------|
| `isClient` | Boolean | 클라이언트&서버 | 클라이언트사이드에서 랜더링하고 있는지의 여부 |
| `isServer` | Boolean | 클라이언트&서버 | 서버사이드에서 랜더링하고 있는지의 여부 |
| `isDev` | Boolean | 클라이언트&서버 | 개발모드인지 아닌지. 이 키는 프로덕션 모드에서 데이터를 캐싱할 경우 도움이 됩니다. |
| `route` | [vue-router의 라우트](https://router.vuejs.org/en/api/route-object.html) | 클라이언트&서버 | `vue-router`의 라우트 인스턴스 |
| `store` | [Vuex Store](http://vuex.vuejs.org/en/api.html#vuexstore-instance-properties) | 클라이언트&서버 | `Vuex`의 스토어 인스턴스 **[Vuex Store](/guide/vuex-store)가 설정되어 있는경우에만 사용가능합니다.** |
| `env` | Object | 클라이언트&서버 | `nuxt.config.js`에 세팅된 환경변수. 자세한 내용은 [env API](/api/configuration-env)를 참조 |
| `params` | Object | 클라이언트&서버 | route.params의 alias |
| `query` | Object | 클라이언트&서버 | route.query의 alias |
| `req` | [http.Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | 서버 | Node.js 서버 요청. Nuxt.js를 미들웨어로 사용하고 있는 경우, req Object는 사용하고 있는 프레임워크에 따라서 달라집니다. *`nuxt generate`을 통해서 이용할 수 없습니다.* |
| `res` | [http.Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) | 서버 | Node.js 서버 응답. Nuxt.js를 미들웨어로 사용하고 있는 경우, res Object는 사용하고 있는 프레임워크에 따라서 달라집니다. *`nuxt generate`을 통해서 이용할 수 없습니다.* |
| `redirect` | Function | 클라이언트&서버 | 별도의 라우트에 리다이랙트시키고 싶을경우에 사용합니다. 서버사이드에서 사용되는 상태코드는 디폴트로 302입니다: `redirect([status,] path [, query])` |
| `error` | Function | 클라이언트&서버 | 에러페이지를 노출시키고 싶은 경우에 사용합니다: `error(params)`. `params`은 `statusCode`와 `message` 필드를 갖고있어야 합니다. |

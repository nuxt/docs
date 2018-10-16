---
title: 비동기 데이터
description: 아마 여러분은 서버에서 데이터를 가져오고 렌더링하고 싶은 적이 있을텐데요. Nuxt.js에서는 컴포넌트의 데이터를 셋팅하기 전에 비동기 작업을 처리할 수 있게 하는 `asyncData`를 지원합니다.
---

> 아마 여러분은 서버에서 데이터를 가져오고 렌더링하고 싶은 적이 있을텐데요. Nuxt.js에서는 컴포넌트의 데이터를 셋팅하기 전에 비동기 작업을 처리할 수 있게 하는 `asyncData`를 지원합니다.

## asyncData 메소드

여러분은 가끔씩 store를 사용하지 않고 서버사이드에서 데이터를 가져오고 렌더링하고 싶을 때가 있을겁니다.
이때 pages 컴포넌트를 로딩하기 전에 매번 호출되는 `asyncData`를 사용하면 됩니다. (**pages 컴포넌트만 지원됩니다.**)
이는 서버사이드에서 호출되거나 페이지를 이동할 때 발생하는데요.
asyncData 메소드는 첫 인자로 [context](/api#context)를 받아옵니다. 따라서 여러분은 이를 통해 데이터를 가져와서 사용할 수 있게되며, nuxt.js가 컴포넌트 데이터와 자동으로 머지합니다.

<div class="Alert Alert--orange">절대로 `asyncData` 안에서 컴포넌트를 참조하기 위해 `this`를 **사용하지 마세요. 컴포넌트가 생성되기 전에** 호출되기 때문에 엑세스할 수 없습니다.</div>

`asyncData`에는 몇 가지 사용 방법이 있습니다. 아래 중에서 원하는 것을 골라 사용해보세요:

1. `Promise` 객체를 리턴할 수 있습니다. Nuxt.js는 컴포넌트를 렌더링하기 전에 promise가 처리될 때까지 기다립니다.
2. [async/await](https://github.com/lukehoban/ecmascript-asyncawait)를 사용할 수 있습니다. (자세한 자료는 [이곳](https://zeit.co/blog/async-and-await)에서 확인할 수 있습니다.)
3. 두 번째 인자로 callback을 정의합니다. 그리고 이를 `callback(err, data)`와 같이 호출합니다.

### Promise 객체 사용하기
```js
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```

### async/await 사용하기
```js
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### callback 사용하기
```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### data 표시하기

asyncData의 반환 값은 data와 **합쳐집니다.** 따라서 위의 예처럼 사용할 경우 템플릿에서 아래와 같이 사용할 수 있게됩니다:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## Context

위의 예에서는 { params }와 같이 `context`에서 params 키만 가져와서 사용했는데요, 사용 가능한 키는 [이곳](/api)에서 모두 확인할 수 있습니다.

## 에러 핸들링

`context` 객체 안에는 `error(params)`라는 메소드가 있습니다. 이를 사용해서 에러 페이지를 보여주도록 할 수 있습니다. 서버사이드에서 전달되는 상태 코드 `params.statusCode`는 주로 렌더될 때 사용될 것입니다.

`Promise` 객체를 사용한 예시:
```js
export default {
  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

만약 `callback` 인자를 사용한다면, callback의 첫 번째 인자를 사용해서 `error` 메소드를 호출할 수 있습니다:
```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
    .catch((e) => {
      callback({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

에러 페이지를 커스터마이징 하기 위해서는 [VIEWS 레이아웃 절](/guide/views#layouts)을 참고합니다.

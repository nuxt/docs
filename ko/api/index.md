---
title: 'API: asyncData 메소드'
description: 서버사이드 데이타를 가져와서, 랜더링을 하고싶은 경우가 있겠죠. Nuxt.js 는 컴포넌트 데이타를 세팅하기 전에 비동기 처리를
  할 수 있도록 하기 위해서 `asyncData` 메소드를 추가해 두었습니다.
---

# asyncData 메소드

> 서버사이드에서 데이터를 가져와서 랜더링을 하고싶은 경우가 있겠죠. Nuxt.js는 컴포넌트 데이타를 세팅하기 전에 비동기 처리를 할 수 있도록 하기 위해서 `asyncData` 메소드를 추가해 두었습니다.

- **타입:** `Function`

`asyncData`는 구성 요소를 로드하기 전에 항상 호출됩니다. (**페이지 구성요소 만**). 서버 측에서 호출하거나 해당 경로를 탐색하기 전에 호출 할 수 있습니다. 이 메소드는 [`컨텍스트`](/api/context) 객체를 첫 번째 인수로 받으면 이를 사용하여 일부 데이터를 가져 와서 구성 요소 데이터를 반환 할 수 있습니다.

asyncData의 결과는 데이터와 **병합**됩니다.

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

<div class="Alert Alert--orange">`asyncData` 내부에서 `this`를 통해 컴포넌트 인스턴스에 접근하지 **못합니다**. 컴포넌트를 초기화하기 전에 호출되기 때문 입니다.</div>

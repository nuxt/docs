---
title: "API: head 메서드"
description: Nuxt.js는 vue-meta를 사용하여 애플리케이션의 `헤더`와 `html 속성`을 업데이트합니다.
---

# head 메서드

> Nuxt.js는 [vue-meta](https://github.com/nuxt/vue-meta)를 사용하여 애플리케이션의 `헤더`와 `html 속성`을 업데이트합니다.

- **타입:** `Object` 또는 `Function`

`head` 메소드를 사용하여 현재 페이지의 HTML 헤드 태그를 설정하세요.

컴포넌트 데이터는 `head` 메소드 안에서 `this`와 함께 사용할 수 있으며, 사용자 정의 메타 태그는 페이지 데이터와 함께 사용할 수 있습니다.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  data () {
    return {
      title: '안녕 세계!'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: '유니크한 아이디', name: '설명', content: '내가 커스텀한 설명' }
      ]
    }
  }
}
</script>
```

<div class="Alert">

하위 컴포넌트에서 사용할 때, 중복을 피하려면 유니크한 id인 `hid` 값을 부여해주세요. [이 곳](https://vue-meta.nuxtjs.org/api/#tagidkeyname)에서 더 많은 정보를 확인하실 수 있습니다.

</div>

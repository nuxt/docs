---
title: 플러그인
description: Nuxt.js에서는 루트 vue.js 어플리케이션이 만들어지기 전에 실행할 js 플러그인을 정의할 수 있습니다. 직접 만든 라이브러리나 외부 모듈들 모두 사용 가능합니다.
---

> Nuxt.js에서는 루트 vue.js 어플리케이션이 만들어지기 전에 실행할 js 플러그인을 정의할 수 있습니다. 직접 만든 라이브러리나 외부 모듈들 모두 사용 가능합니다.

<div class="Alert">모든 Vue [인스턴스의 라이프사이클](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram)에서 **클라이언트사이드와 서버사이드 모두 호출되는 메소드** 는 `beforeCreate`와 `created` 뿐입니다. 다른 메소드들은 모두 클라이언트 사이드에서만 호출됨을 명심하세요!</div>

## 외부 패키지

서버와 클라이언트 모두에서 HTTP 리퀘스트를 만들기 위해 [axios](https://github.com/mzabriskie/axios) 라는 패키지를 사용한다는 가정을 해보겠습니다.

먼저 npm을 통해 설치합니다:

```bash
npm install --save axios
```

이를 페이지 컴포넌트에서 바로 사용할 수 있습니다:

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

하지만 **한 가지 문제** 가 있습니다. 만약 다른 페이지에서 `axios`를 import 한다면 페이지 번들에 중복 포함되기 때문입니다. axios를 한 번만 포함하기 위해서는 `build.vendor` 키를 `nuxt.config.js`에서 사용하면 됩니다:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

이제 중복된 import 때문에 번들이 커질 걱정없이 `axios`를 어디서든 `import` 할 수 있게 되었습니다!

## Vue 플러그인

만약 어플리케이션에서 알림을 표시하기 위해 [vue-notifications](https://github.com/se-panfilov/vue-notifications)를 사용하고 싶다면, 먼저 앱이 실행되기 전에 플러그인을 셋업해야 합니다.

`plugins/vue-notifications.js` 파일입니다:
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

이제 `nuxt.config.js` 내의 `plugins` 키에 파일을 추가합니다:
```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

`plugins` 키에 대한 자세한 정보는 [플러그인 API](/api/configuration-plugins)에서 확인할 수 있습니다.

하지만 `vue-notifications`는 라이브러리이기 때문에 app 번들에 포함하는 것보다 vendor 번들에 포함하는 것이 캐싱에 더 좋습니다.

이를 위해서는 `nuxt.config.js`의 vendor 번들에 `vue-notifications`를 추가합니다:
```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~plugins/vue-notifications']
}
```

## $root 와 context 합치기

[vue-18n](https://github.com/kazupon/vue-i18n)같은 몇몇 플러그인은 앱의 루트에서 사용하기 위해 루트와 합쳐질 필요가 있습니다. 루트 컴포넌트와 Context에 플러그인을 추가하기 위한 Nuxt.js의 `injectAs` 속성을 소개합니다.

`plugins/i18n.js`:
```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '~store'

Vue.use(VueI18n)

const i18n = new VueI18n({
  /* options... */
})

export default i18n
```

`nuxt.config.js`:
```js
module.exports = {
  build: {
    vendor: ['vue-i18n']
  },
  plugins: [
    // Will inject the plugin in the $root app and also in the context as `i18n`
    { src: '~plugins/i18n.js', injectAs: 'i18n' }
  ]
}
```

어떻게 사용하는지는 [i18n 예제](/examples/i18n)에서 확인해주세요.

## 클라이언트에서만 사용하기

**브라우저에서만 작동하는 플러그인** 을 사용하려면 `plugins`에 `ssr: false` 옵션을 추가함으로써 클라이언트 사이드에서만 작동하도록 할 수 있습니다.

예시:

`nuxt.config.js`:
```js
module.exports = {
  plugins: [
    { src: '~plugins/vue-notifications', ssr: false }
  ]
}
```

`plugins/vue-notifications.js`:
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

만약 서버에서만 사용할 라이브러리가 필요하다면 webpack이 `server.bundle.js` 파일을 생성할 때 `process.server` 변수를 `true`로 설정하면 됩니다.

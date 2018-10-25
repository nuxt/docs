---
title: 라우팅
description: Nuxt.js는 애플리케이션의 라우트를 만들기 위해 파일 시스템을 사용하며, 이는 PHP가 라우트를 만드는 것과 유사합니다.
---

> Nuxt.js `pages` 디렉토리 내의 Vue 파일 구조를 기반으로 [vue-router](https://github.com/vuejs/vue-router) 설정을 자동으로 생성합니다.

## 기본 라우트

아래의 파일트리는:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

아래와 같이 자동으로 생성됩니다:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## 동적 라우트

파라메터가 있는 동적 라우트를 정의하기 위해서는 **앞에 밑줄이 붙은** .vue 파일이나 폴더를 정의해야합니다.

아래의 폴더 구조는:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

아래와 같이 자동으로 생성됩니다:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

위에서 볼 수 있듯이, `users-id` 라우트는 `:id?`라는 선택적 경로를 가집니다. 만약 이를 필수 경로로 만드려면 `users/_id` 폴더 안에 `index.vue` 파일을 만듭니다.

### 라우트 파라메터의 유효성 체크하기

Nuxt.js를 사용하면 동적 라우트 컴포넌트 내에 유효성을 검증하는 메소드를 정의할 수 있습니다.

예시: `pages/users/_id.vue`

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

만약 validate 메소드가 `true`를 반환하지 않는다면 Nuxt.js는 자동으로 404 error 페이지를 로딩할 것입니다.

메소드에 대한 더 많은 정보: [API Pages 유효성 체크](/api/pages-validate)

## 중첩 라우트

Nuxt.js를 사용하면 vue-router의 자식 라우트를 사용함으로써 중첩 라우트를 만들 수 있습니다.

중첩 라우트의 부모 컴포넌트를 정의하기 위해서는 자식 뷰를 포함하고 있는 **폴더와 같은 이름** 으로 Vue 파일을 생성해야 합니다.

<div class="Alert Alert--orange">

부모 컴포넌트(.vue file)에 `<nuxt-child/>` 태그를 사용해야함을 잊지마세요!

</div>

아래의 폴더 구조는:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

아래와 같이 자동으로 생성됩니다:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## 동적 중첩 라우트

Nuxt.js에서 동적 중첩 라우트는 자주 사용되지는 않지만 동적 라우트 하위에 동적 라우트가 있는 경우에도 가능하기는 합니다.

아래의 폴더 구조는

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

아래와 같이 자동으로 생성됩니다:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

## 트랜지션

Nuxt.js는 경로 전환 과정에서 [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) 컴포넌트를 사용해 놀라운 트랜지션/애니메이션을 만들어냅니다.

### 전역 설정

<div class="Alert Alert--orange">

Nuxt.js의 기본 트랜지션 이름은 `"page"` 입니다.

</div>

모든 페이지에 페이드 애니메이션을 추가하기 위해서는 모든 라우트에 사용될 CSS 파일을 작성해야 합니다. 따라서 `assets` 폴더에 CSS 파일을 만드는 것부터 시작하겠습니다.

전역 css 파일인 `assets/main.css` 입니다:
```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
```

이를 `nuxt.config.js` 파일에 추가합니다:
```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

transition 키에 대한 더 많은 정보: [API transition 구성](/api/pages-transition)

### 페이지 설정

`transition` 속성으로 한 페이지에만 사용자 정의 트랜지션을 적용할 수도 있습니다.

전역 css 파일인 `assets/main.css`에 새롭게 추가합니다:
```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

이제 우리는 test라는 이름의 트랜지션 속성을 사용할 수 있습니다:
```js
export default {
  transition: 'test'
}
```

transition 속성에 대한 더 많은 정보: [API Pages 트랜지션](/api/pages-transition)

## 미들웨어

> The middleware lets you define custom function to be ran before rendering a page or a group of pages.

**모든 미들웨어는 `middleware/` 디렉토리에 있어야합니다.** 파일 이름은 곧 미들웨어의 이름이 됩니다. (예를 들어 `middleware/auth.js`는 `auth` 미들웨어가 됩니다.)

미들웨어는 [context](/api#context)의 첫 인자로 전달받습니다:

```js
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```

미들웨어는 아래의 세가지에서 순차적으로 실행됩니다:
1. `nuxt.config.js`
2. 매칭된 레이아웃
3. 매칭된 페이지

미들웨어는 비동기가 될 수 있고 간단하게 `Promise`를 반환하거나 2번째 인자인 `callback`을 사용할 수 있습니다.

`middleware/stats.js`
```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

이제 `nuxt.config.js`나 레이아웃, 페이지에서 `middleware` 키를 사용할 수 있습니다:

`nuxt.config.js`
```js
module.exports = {
  router: {
    middleware: 'stats'
  }
}
```

`stats` 미들웨어는 경로가 변경될 때마다 실행될 것입니다.

middleware를 활용한 실 사례가 궁금하다면 깃허브에서 [example-auth0](https://github.com/nuxt/example-auth0)를 확인하세요.

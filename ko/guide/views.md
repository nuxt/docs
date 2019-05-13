---
title: Views
description: Views 절에서는 Nuxt.js 어플리케이션의 특정 라우트를 위해 데이터와 뷰를 설정하는 모든 것을 설명합니다. (도큐먼트, 레이아웃, 페이지 와 HTML Head)
---

> Views 절에서는 Nuxt.js 어플리케이션의 특정 라우트를 위해 데이터와 뷰를 설정하는 모든 것을 설명합니다. (Document, Layouts, Pages 와 HTML Head)

![nuxt-views-schema](/nuxt-views-schema.svg)

## 도큐먼트

> 당신은 nuxt.js의 메인 도큐먼트를 커스터마이징할 수 있습니다.

html 템플릿을 확장하기 위해서 당신의 프로젝트에 `app.html` 파일을 생성합니다.

기본 템플릿입니다:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

한 예로, IE 지원을 위한 CSS 클래스를 아래와 같이 추가할 수 있습니다:

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## 레이아웃

Nuxt.js를 사용하면 `layouts` 폴더에 레이아웃을 추가함으로써 메인 레이아웃을 확장하거나 사용자 정의 레이아웃을 만들 수 있습니다.

### 기본 레이아웃

메인 레이아웃을 확장하려면 `layouts/default.vue` 파일을 추가합니다.

*페이지 컴포넌트를 레이아웃에 렌더링하기 위해서 꼭 `<nuxt/>` 태그를 작성하세요.*

기본 레이아웃 코드는 아래와 같습니다:
```html
<template>
  <nuxt/>
</template>
```

### 에러 페이지

에러 페이지를 커스터마이징하려면 `layouts/error.vue` 파일을 추가합니다.

이 레이아웃은 `<nuxt/>` 태그를 포함하지 않습니다. 404나 500 에러가 발생했을 때 이 레이아웃은 컴포넌트처럼 작동합니다.

기본 에러 페이지 소스 코드는 [깃허브](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue)에서 확인할 수 있습니다.

`layouts/error.vue`에서 사용자 정의 에러 페이지를 사용한 예입니다:
```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
```

### 사용자 정의 레이아웃

`layouts` 폴더에 있는 모든 파일(*최상위 레벨*)은 각 페이지 컴포넌트에 `layout` 속성으로 접근할 수 있습니다.

*페이지 컴포넌트를 레이아웃에 렌더링하기 위해서 꼭 `<nuxt/>` 태그를 작성하세요.*

예시 `layouts/blog.vue`:
```html
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt/>
  </div>
</template>
```

이제 `pages/posts.vue`에서 Nuxt.js로 커스텀 레이아웃을 사용한다고 전달합니다:
```html
<script>
export default {
  layout: 'blog'
}
</script>
```

레이아웃 속성에 대한 더 많은 정보: [API Pages 레이아웃](/api/pages-layout)

혹은 [데모 영상](https://www.youtube.com/watch?v=YOKnSTp7d38)에서 이 액션을 확인할 수 있습니다.

## 페이지

모든 Page 컴포넌트는 Vue 컴포넌트입니다. 하지만 Nuxt.js는 범용 어플리케이션을 쉽게 개발할 수 있도록 특별한 키를 제공합니다.

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    // called every time before loading the component
    return { name: 'World' }
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```


| 속성 | 설명 |
|-----------|-------------|
| asyncData | 가장 중요한 키며 비동기적으로 만들 수 있고, 첫 번째 인자로 전달 받을 수도 있습니다. 자세한 내용 및 어떻게 동작하는 지는 [이곳](/guide/async-data)에서 확인합니다. |
| fetch | 페이지가 렌더링되기 전에 스토어를 채우기위해 사용되며, 구성 요소 데이터를 설정하지 않는다는 점을 제외하면 데이터 메소드와 같습니다. 자세한 내용은 [이곳](/api/pages-fetch)에서 확인합니다. |
| head | 현재 페이지에 대한 특정 메타 태그를 설정하려면 [이곳](/api/pages-head)에서 확인합니다. |
| layout | `layouts` 폴더에 정의된 레이아웃을 지정할 수 있습니다. 자세한 내용은 [이곳](/api/pages-layout)에서 확인합니다. |
| transition | 페이지에 대한 특정 트랜지션을 설정합니다. 자세한 내용은 [이곳](/api/pages-transition)에서 확인합니다. |
| scrollToTop | 기본값은 `false` 입니다. 페이지를 렌더링하기 전에 페이지를 맨 위로 스크롤할 것인지를 나타내며, 중첩 라우트를 위해 사용됩니다. 자세한 내용은 [이곳](/guide/routing#nested-routes)에서 확인합니다. |
| validate | 동적 라우트에 대한 유효성을 검사합니다. 자세한 내용은 [이곳](/guide/routing#dynamic-routes)에서 확인합니다. |
| middleware | 이 페이지에 대한 미들웨어를 설정하면, 미들웨어는 페이지를 렌더링하기 전에 호출되며, 자세한 내용은 [이곳](/guide/routing#middleware)에서 확인합니다. |

페이지 속성의 사용법에 대한 더 많은 정보: [API](/api)

## HTML Head

Nuxt.js는 `headers` 와 `html attributes` 를 갱신하기 위해서 [vue-meta](https://github.com/nuxt/vue-meta)를 사용합니다.

Nuxt.js는 `vue-meta`를 아래의 옵션으로 구성합니다:
```js
{
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
}
```

### 기본 메타 태그

Nuxt.js를 사용하면 `nuxt.config.js`에 `head` 속성을 사용함으로써 기본 메타를 정의할 수 있습니다:

사용자 정의 구글 폰트와 사용자 정의 뷰포트를 설정하는 예시입니다:
```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

`head`에 전달 가능한 옵션 목록을 알기 위해서는 [vue-meta 문서](https://vue-meta.nuxtjs.org/api/#metainfo-properties)를 확인합니다.

head 메소드에 대한 더 많은 정보: [API head 구성](/api/configuration-head)

### 한 페이지를 위한 사용자 정의 메타 태그

head 메소드에 대한 더 많은 정보: [API 페이지 head](/api/pages-head)

<p class="Alert">자식 컴포넌트를 사용할 때 중복을 피하고 싶다면 `hid` 키와 함께 유일한 식별자를 사용하세요. 자세한 내용은 [이곳](https://vue-meta.nuxtjs.org/api/#tagidkeyname)에서 확인합니다.

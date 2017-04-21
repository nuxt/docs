---
title: JSX
description: Nuxt.js 에서 JSX 를 사용하려면?
---

<!-- title: JSX -->
<!-- description: How to use JSX with Nuxt.js? -->

<!-- # How to use JSX? -->

# JSX 를 사용하려면?

<!-- Nuxt.js use the official [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) for babel default configuration, so you can use JSX in your components. -->

Nuxt.js 는 babel 기본 설정으로 공식 [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) 을 사용합니다. 그래서, 컴포넌트 안에서 JSX 를 사용할 수 있습니다.

<!-- You can now use JSX in your `render` method of your components: -->

컴포넌트의 `render` 메소드 안에서 JSX 를 사용할 수 있습니다:

```html
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

<!-- <p class="Alert Alert--info">Aliasing `createElement` to `h` is a common convention you’ll see in the Vue ecosystem and is actually required for JSX. If `h` is not available in the scope, **your app will throw an error**.</p> -->

<p class="Alert Alert--info">`h` 를 `createElement` 의 alias 로 설정하는 것은 Vue 생태계에서 일반적인 컨벤션이며, 또한 JSX 에서 요구되는 사항이기도 합니다. 혹시 `h` 가 스코프 안에서 사용할 수 없을 경우에는 **앱에서는 에러를 발생시키게 됩니다** </p>

<!-- You can learn more how to use it in the [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX) of the Vue.js documentation. -->

JSX 사용법에 대한 보다 깊은 이해를 위해서는 Vue.js 공식문서의  [JSX](https://kr.vuejs.org/v2/guide/render-function.html#JSX) 를 참고하시기 바랍니다.

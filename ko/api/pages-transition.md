---
title: "API: transition 프로퍼티"
description: Nuxt.js에서는 transition 컴포넌트를 사용해서 페이지를 이동하는 동안에 트랜지션/애니메이션을 발생시킬 수 있습니다.
---

<!-- title: "API: The transition Property" -->
<!-- description: Nuxt.js uses the transition component to let you create amazing transitions/animations between your pages. -->

<!-- # The transition Property -->

# transition 프로퍼티

<!-- \> Nuxt.js uses the  [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) component to let you create amazing transitions/animations between your pages. -->

> Nuxt.js는 [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) 컴포넌트를 사용하여 페이지를 이동하는 동안에 트랜지션/에니메이션을 발생시킬 수 있습니다.

<!-- - **Type:** `String` or `Object` or `Function` -->

- **타입:** `String` 혹은 `Object` 혹은 `Function`

<!-- To define a custom transition for a specific route, simply add the `transition` key to the page component. -->

특정 라우트에 대해서 커스텀 트랜지션을 설정하려면, 페이지 컴포넌트에 `transition` 키를 추가합니다.

<!-- ```js -->
<!-- export default { -->
<!--   // Can be a String -->
<!--   transition: '' -->
<!--   // Or an Object -->
<!--   transition: {} -->
<!--   // or a Function -->
<!--   transition (to, from) {} -->
<!-- } -->
<!-- ``` -->

```js
export default {
  // String을 지정할수 있습니다.
  transition: ''
  // 또는 Object
  transition: {}
  // 또는 Function
  transition (to, from) {}
}
```

<!-- ## String -->

## String

<!-- If the `transition` key is set as a string, it will be used as the `transition.name`. -->

`transition` 키에 String이 세팅되어 있는 경우에는 `transition.name`으로 사용됩니다.

```js
export default {
  transition: 'test'
}
```

<!-- Nuxt.js will use these settings to set the component as follows: -->

위와 같이 설정되어 있는 경우에 컴포넌트는 다음과 같이 세팅됩니다:

```html
<transition name="test">
```

<!-- ## Object -->

## Object

<!-- If the `transition` key is set as an object: -->

`transition`키에 Object가 세팅되어 있는 경우:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

<!-- Nuxt.js will use these settings to set the component as follows: -->

위와 같이 설정되어 있다면 컴포넌트는 다음과 같이 세팅됩니다:

```html
<transition name="test" mode="out-in">
```

<!-- The following properties that the `transition` object can have: -->

`transition` Object가 가질 수 있는 프로퍼티는 다음과 같습니다:

<!-- | key  | Type | Default | definition | -->
<!-- |------|------|---------|-----------| -->
<!-- | `name` | String | `"page"` | The transition name applied on all the routes transitions. | -->
<!-- | `mode` | String | `"out-in"` | The transition mode applied on all routes, see [Vue.js documentation](http://vuejs.org/v2/guide/transitions.html#Transition-Modes). | -->
<!-- | `css` | Boolean | `true` | Whether to apply CSS transition classes. Defaults to `true`. If set to false, will only trigger JavaScript hooks registered via component events. | -->
<!-- | `duration` | Integer | `n/a` | The duration (in milliseconds) applied on the transition, see [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations). | -->
<!-- | `type` | String | `n/a` | Specify the type of transition events to wait for to determine transition end timing. Available values are "transition" and "animation". By default, it will automatically detect the type that has a longer duration. | -->
<!-- | `enterClass` | String | `n/a` | The starting state of the transition class. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `enterToClass` | String | `n/a` | The ending state for the transition. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `enterActiveClass` | String | `n/a` | The class applied across the entire transition duration. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `leaveClass` | String | `n/a` | The starting state of the transition class. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `leaveToClass` | String | `n/a` | The ending state for the transition. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `leaveActiveClass` | String | `n/a` | The class applied across the entire transition duration. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->

| 키 | 타입 | 기본값 | 정의 |
|------|------|---------|-----------|
| `name` | String | `"page"` | 모든 라우트의 트랜지션에 적용되는 트랜지션명 |
| `mode` | String | `"out-in"` | 모든 라우트에 적용되는 트랜지션 모드. 자세한 내용은 [Vue.js 문서](http://vuejs.org/v2/guide/transitions.html#Transition-Modes) 참조 |
| `css` | Boolean | `true` | CSS 트랜지션 클래스의 적용 여부. 기본값은 `true`. false를 설정하면 컴포넌트 이벤트에 등록된 JavaScript Hook만 트리거됩니다. |
| `duration` | Integer | `n/a` | 트랜지션이 적용되는 시간(밀리세컨드). 자세한 내용은 [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations) 참조 |
| `type` | String | `n/a` | 트랜지션 종료 타이밍을 판정하기 위해 기다리는 트랜지션의 이벤트 타입. "transition" 혹은 "animation"을 지정할 수 있습니다. 기본, 보다 시간이 걸리는 타입이 자동적으로 선택하게 됩니다. |
| `enterClass` | String | `n/a` | 트랜지션을 시작할 때의 상태 클래스. 자세한 내용은  [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조 |
| `enterToClass` | String | `n/a` | 트랜지션을 종료할 때의 상태 클래스. 자세한 내용은  [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조 |
| `enterActiveClass` | String | `n/a` | 트랜지션중에 적용되는 클래스. 자세한 내용은  [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조 |
| `leaveClass` | String | `n/a` | 트랜지션을 시작할 때의 상태 클래스. 자세한 내용은  [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조 |
| `leaveToClass` | String | `n/a` | 트랜지션을 종료할 때의 상태 클래스. 자세한 내용은  [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조 |
| `leaveActiveClass` | String | `n/a` | 트랜지션중에 적용되는 클래스. 자세한 내용은  [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조 |

<!-- You can also define methods in the `transition`, these are for the [JavaScript hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks): -->

`transition` 안에서 메소드를 정의하는 것도 가능한데 메소드는 [JavaScript Hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) 에서 사용됩니다:

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

<!-- *Note: it’s also a good idea to explicitly add `css: false` for JavaScript-only transitions so that Vue can skip the CSS detection. This also prevents CSS rules from accidentally interfering with the transition.* -->

*메모: JavaScript만의 트랜지션을 위해서 명시적으로 Vue가 CSS판정을 스킵하도록 하는 `css: false`를 추가해 두는 것도 좋은 아이디어라 생각합니다. 또한 실수로 CSS룰이 트랜지션을 방해하는 것을 막아줍니다.*

<!-- ## Function -->

## Function

<!-- If the `transition` key is set as a function: -->

`transition`키에 Function이 세팅되었을 경우:

```js
export default {
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

<!-- Transitions applied on navigation: -->

트랜지션은 각 페이지로 이동할 때에 다음과 같이 적용됩니다.:

<!-- - `/` to `/posts` => `slide-left` -->
<!-- - `/posts` to `/posts?page=3` => `slide-left` -->
<!-- - `/posts?page=3` to `/posts?page=2` => `slide-right` -->

- `/` 에서 `/posts` 로 이동할 때 => `slide-left`
- `/posts` 에서 `/posts?page=3` 로 이동할 때 => `slide-left`
- `/posts?page=3` 에서 `/posts?page=2` 로 이동할 때 => `slide-right`

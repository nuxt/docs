---
title: "API: transition プロパティ"
description: Nuxt.js では transition コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションを行うことができます。
---

<!-- title: "API: The transition Property" -->
<!-- description: Nuxt.js uses the transition component to let you create amazing transitions/animations between your pages. -->

<!-- # The transition Property -->

# transition プロパティ

<!-- \> Nuxt.js uses the  [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) component to let you create amazing transitions/animations between your pages. -->

> Nuxt.js は [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションを行うことができます。

<!-- - **Type:** `String` or `Object` or `Function` -->

- **タイプ:** `文字列` または `オブジェクト` または `関数`

<!-- To define a custom transition for a specific route, simply add the `transition` key to the page component. -->

特定のルートに対してカスタムトランジションを設定するには、ページコンポーネントに `transition` キーを追加してください。

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
  // 文字列を指定できます
  transition: ''
  // またはオブジェクト
  transition: {}
  // または関数
  transition (to, from) {}
}
```

<!-- ## String -->

## 文字列

<!-- If the `transition` key is set as a string, it will be used as the `transition.name`. -->

`transition` キーに文字列がセットされたときは `transition.name` として用いられます。

```js
export default {
  transition: 'test'
}
```

<!-- Nuxt.js will use these settings to set the component as follows: -->

上のように設定されると、コンポーネントは次のようにセットされます:

```html
<transition name="test">
```

<!-- ## Object -->

## オブジェクト

<!-- If the `transition` key is set as an object: -->

`transition` キーにオブジェクトがセットされたとき:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

<!-- Nuxt.js will use these settings to set the component as follows: -->

上のように設定されると、コンポーネントは次のようにセットされます:

```html
<transition name="test" mode="out-in">
```

<!-- The following properties that the `transition` object can have: -->

`transition` オブジェクトが持つことができるプロパティは以下のとおり:

<!-- | key  | Type | Default | definition | -->
<!-- |------|------|---------|-----------| -->
<!-- | `name` | String | `"page"` | The transition name applied on all the routes transitions. | -->
<!-- | `mode` | String | `"out-in"` | The transition mode applied on all routes, see [Vue.js documentation](http://vuejs.org/v2/guide/transitions.html#Transition-Modes). | -->
<!-- | `css` | Boolean | `true` | Whether to apply CSS transition classes. Defaults to true. If set to false, will only trigger JavaScript hooks registered via component events. | -->
<!-- | `type` | String | `n/a` | Specify the type of transition events to wait for to determine transition end timing. Available values are "transition" and "animation". By default, it will automatically detect the type that has a longer duration. | -->
<!-- | `enterClass` | String | `n/a` | The starting state of the transition class. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `enterToClass` | String | `n/a` | The ending state for the transition. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `enterActiveClass` | String | `n/a` | The class applied across the entire transition duration. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `leaveClass` | String | `n/a` | The starting state of the transition class. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `leaveToClass` | String | `n/a` | The ending state for the transition. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->
<!-- | `leaveActiveClass` | String | `n/a` | The class applied across the entire transition duration. See [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) | -->

| キー | タイプ | デフォルト | 定義 |
|------|------|---------|-----------|
| `name` | 文字列 | `"page"` | すべてのトランジション時に適用されるトランジション名 |
| `mode` | 文字列 | `"out-in"` | すべてのトランジション時に適用されるトランジションモード。詳細は [Vue.js のドキュメント](http://vuejs.org/v2/guide/transitions.html#Transition-Modes) 参照 |
| `css` | ブーリアン | `true` | CSS トランジションクラスを適用するか否か。デフォルトは true です。false を設定すると、コンポーネントのイベントで登録された JavaScript フックのみがトリガーになります |
| `type` | 文字列 | `n/a` | トランジション終了のタイミングを判定するために待ち受けるトランジションのイベントタイプを指定します。"transition" または "animation" を指定できます。デフォルトでは、より時間がかかるほうのタイプが自動的に選ばれます |
| `enterClass` | 文字列 | `n/a` | トランジション開始時の状態のクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `enterToClass` | 文字列 | `n/a` | トランジション終了時の状態のクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `enterActiveClass` | 文字列 | `n/a` | トランジション中に適用されるクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `leaveClass` | 文字列 | `n/a` | トランジション開始時の状態のクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `leaveToClass` | 文字列 | `n/a` | トランジション終了時の状態のクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `leaveActiveClass` | 文字列 | `n/a` | トランジション中に適用されるクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |

<!-- You can also define methods in the `transition`, these are for the [JavaScript hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks): -->

`transition` の中でメソッドを定義することもでき、メソッドは [JavaScript フック](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) で使われます:

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

<!-- *Note: it’s also a good idea to explicitly add `css: false` for JavaScript-only transitions so that Vue can skip the CSS detection. This also prevents CSS rules from accidentally interfering with the transition.* -->

*メモ: JavaScript のみのトランジションのために明示的に `css: false` を追加しておくのは良いアイディアです。これは Vue は CSS 判定をスキップさせます。また誤って CSS ルールがトランジションに干渉するのを防ぎます。*

<!-- ## Function -->

## 関数

<!-- If the `transition` key is set as a function: -->

`transition` キーに関数がセットされたとき:

```js
export default {
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

<!-- Transitions applied on navigation: -->

トランジションは各ページ遷移時に次のように適用されます:

<!-- - `/` to `/posts` => `slide-left` -->
<!-- - `/posts` to `/posts?page=3` => `slide-left` -->
<!-- - `/posts?page=3` to `/posts?page=2` => `slide-right` -->

- `/` から `/posts` へ遷移するとき => `slide-left`
- `/posts` から `/posts?page=3` へ遷移するとき => `slide-left`
- `/posts?page=3` から `/posts?page=2` へ遷移するとき => `slide-right`

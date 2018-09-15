---
title: "API: transition プロパティ"
description: Nuxt.js では transition コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションを行うことができます。
---

# transition プロパティ

> Nuxt.js は [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションを行うことができます。

- **型:** `文字列` または `オブジェクト` または `関数`

特定のルートに対してカスタムトランジションを設定するには、ページコンポーネントに `transition` キーを追加してください。

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

## 文字列

`transition` キーに文字列がセットされたときは `transition.name` として用いられます。

```js
export default {
  transition: 'test'
}
```

上のように設定されると、コンポーネントは次のようにセットされます:

```html
<transition name="test">
```

## オブジェクト

`transition` キーにオブジェクトがセットされたとき:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

上のように設定されると、コンポーネントは次のようにセットされます:

```html
<transition name="test" mode="out-in">
```

`transition` オブジェクトが持つことができるプロパティは以下のとおり:

| キー | 型 | デフォルト | 定義 |
|------|------|---------|-----------|
| `name` | 文字列 | `"page"` | すべてのトランジション時に適用されるトランジション名 |
| `mode` | 文字列 | `"out-in"` | すべてのトランジション時に適用されるトランジションモード。詳細は [Vue.js のドキュメント](http://vuejs.org/v2/guide/transitions.html#Transition-Modes) 参照 |
| `css` | ブーリアン | `true` | CSS トランジションクラスを適用するか否か。デフォルトは `true` です。false を設定すると、コンポーネントのイベントで登録された JavaScript フックのみがトリガーになります |
| `duration` | 整数 | `n/a` | トランジションが適用される時間（ミリ秒）です。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations) 参照 |
| `type` | 文字列 | `n/a` | トランジション終了のタイミングを判定するために待ち受けるトランジションのイベントタイプを指定します。"transition" または "animation" を指定できます。デフォルトでは、より時間がかかるほうのタイプが自動的に選ばれます |
| `enterClass` | 文字列 | `n/a` | トランジション開始時の状態のクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `enterToClass` | 文字列 | `n/a` | トランジション終了時の状態のクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `enterActiveClass` | 文字列 | `n/a` | トランジション中に適用されるクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `leaveClass` | 文字列 | `n/a` | トランジション開始時の状態のクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `leaveToClass` | 文字列 | `n/a` | トランジション終了時の状態のクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |
| `leaveActiveClass` | 文字列 | `n/a` | トランジション中に適用されるクラスです。詳細は [Vue.js のドキュメント](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 参照 |

`transition` の中でメソッドを定義することもでき、メソッドは [JavaScript フック](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) で使われます:

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

*メモ: JavaScript のみのトランジションのために明示的に `css: false` を追加しておくのは良いアイディアです。これは Vue は CSS 判定をスキップさせます。また誤って CSS ルールがトランジションに干渉するのを防ぎます。*

## 関数

`transition` キーに関数がセットされたとき:

```js
export default {
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

トランジションは各ページ遷移時に次のように適用されます:

- `/` から `/posts` へ遷移するとき => `slide-left`
- `/posts` から `/posts?page=3` へ遷移するとき => `slide-left`
- `/posts?page=3` から `/posts?page=2` へ遷移するとき => `slide-right`

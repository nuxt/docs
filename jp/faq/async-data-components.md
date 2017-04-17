---
title: コンポーネント内の非同期データ
description: コンポーネント内で非同期データを扱うには？
---

<!-- title: Async data in components -->
<!-- description: Async data in components? -->

<!-- # Async data in components? -->

# コンポーネント内で非同期データを扱うには？

<!-- It is not possible because it's not linked to a route, Nuxt.js supercharges the component data() associated to a route to allow async data. -->

コンポーネントはルートに関連付けられていないため（訳注: 基本的には）非同期データを扱うことはできません。Nuxt.js ではルートに関連付けられたコンポーネント（訳注: pages ディレクトリ内のコンポーネントのこと）の data() メソッドに手を加えて非同期データを扱えるようにしています。

<!-- For sub components, there are 2 ways of achieving it: -->

しかしながら、サブコンポーネント（訳注: components ディレクトリ内のコンポーネントのこと）でも非同期データを扱えるようにする方法が 2つあります:

<!-- 1. Making the API call in the mounted() hook and setting the data afterwards, downside: no server rendering -->
<!-- 2. Making the API call in the data() of the page component and giving the data as a prop to the subComponent: server rendering OK. But the data() of the page might be less readable because it's loading the async data of the sub components -->

1. mounted() フック内に API コールを作成し、その呼び出し以降にデータをセットすること。マイナスな側面としては、サーバーサイドレンダリングできなくなります。
2. ページコンポーネントの data() メソッド内に API コールを作成し、データをプロパティとしてサブコンポーネントに渡すこと。この方法ではサーバーサイドレンダリングできます。しかしページの data() メソッドがサブコンポーネントの非同期データをロードするため、可読性が落ちるかもしれません。

<!-- It all depends if you want the sub components to be server-rendered or not. -->

どちらを選ぶべきかは、サブコンポーネントをサーバーサイドレンダリングしたいか否かにかかっています。

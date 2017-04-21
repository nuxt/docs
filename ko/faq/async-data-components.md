---
title: 컴포넌트에서의 비동기 데이터
description: 컴포넌트에서 비동기 데이터를 다루려면?
---

<!-- title: Async data in components -->
<!-- description: Async data in components? -->

<!-- # Async data in components? -->

# 컴포넌트에서 비동기 데이터를 다루려면?

<!-- It is not possible because it's not linked to a route, Nuxt.js supercharges the component data() associated to a route to allow async data. -->

컴포넌트는 라우트에 연결되어 있지 않기 때문에 비동기 데이터를 다룰 수 없습니다. Nuxt.js 에서는 라우트에 연결된 컴포넌트의 data() 메소드에 좀 손을 써서 비동기 데이터를 다룰수 있게 합니다.

<!-- For sub components, there are 2 ways of achieving it: -->

しかしながら、서브 컴포넌트(역주: components 디렉토리에 있는 컴포넌트를 말함)에서도 비동기 데이터를 다룰수 있도록 하는 방법이 두가지가 있습니다:

<!-- 1. Making the API call in the mounted() hook and setting the data afterwards, downside: no server rendering -->
<!-- 2. Making the API call in the data() of the page component and giving the data as a prop to the subComponent: server rendering OK. But the data() of the page might be less readable because it's loading the async data of the sub components -->

1. mounted() 훅에 API 콜을 작성하고 그 콜 이후에 데이터를 세팅하는 방법. 단점은 서버사이드 랜더링이 불가능하게 됩니다.
2. 페이지 컴포넌트의 data() 메소드에서 API 콜을 작성하고 데이터를 프로퍼티로 서브 컴포넌트에게 넘기는 방법. 이 방법에서는 서버사이드 랜더링이 가능합니다. 그러나, 페이지의 data() 메소드가 서브 컴포넌트의 비동기 데이터를 로딩하기 때문에 코드의 가독성이 떨어지게 될수도 있습니다.

<!-- It all depends if you want the sub components to be server-rendered or not. -->

어느쪽을 선택할지에 대해서는 서브 컴포넌트를 서버사이드 랜더링을 할지에 대한 여부에 달려있다고 볼수 있을것 같습니다.

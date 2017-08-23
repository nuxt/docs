---
title: Async data in components
description: Async data in components?
---

# Async data in components?

It is not possible because it's not linked to a route, Nuxt.js surcharges the component data() associated to a route to allow async data.

For sub components, there are 2 ways of achieving it:
1. Making the API call in the mounted() hook and setting the data afterwards, downside: no server rendering
2. Making the API call in the data() of the page component and giving the data as a prop to the subComponent: server rendering OK. But the data() of the page might be less readable because it's loading the async data of the sub components

It all depends if you want the sub components to be server-rendered or not.

---
title: Async data in components
description: Async data in components?
---

# Async data in components? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Because components do not have an asyncData method, you cannot directly fetch async data server side within a component. In order to get around there limitation you have two basic options:</p>

1. Make the API call in the mounted() hook and set data properties when loaded. *Downside: Won't work for server side rendering.*
2. Make the API call in the asyncData() or fetch() methods of the page component and pass the data as props to the sub components. Server rendering will work fine. *Downside: the asyncData() or fetch() of the page might be less readable because it's loading the data for other components*

---
title: "API: Компонент <nuxt-child>"
description: Отображение дочерних страниц.
---

> Этот компонент используется для отображения дочерних компонентов во [вложеных маршрутах](/guide/routing#nested-routes).

Пример:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Данное дерево файлов сгенерирует следующий набор маршрутов:

```js
[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Что бы отобразить компонент `child.vue`, нам требуется добавить `<nuxt-child/>` внутри `pages/parent.vue`:

```html
<template>
  <div>
    <h1>Я - компонент-родитель</h1>
    <nuxt-child :foobar="123" />
  </div>
</template>
```

`<nuxt-child/>` принимает входные параметры `keep-alive` и `keep-alive-props`:

```html
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- Будет преобразовано во что-то наподобие: -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```

> Дочерние компоненты так же могут принимать входные параметры, как и обычные компоненты Vue.

Пример можно увидеть на странице [с примером вложенных маршрутов](/examples/nested-routes).

## Именованные представления

> Добавлено в Nuxt v2.4.0

`<nuxt-child/>` принимает входной параметр `name` для отрисовки именованных представлений:

```html
<template>
  <div>
    <nuxt-child name="top" />
    <nuxt-child />
  </div>
</template>
```

Пример можно увидеть на странице [с примером именованных представлений](/examples/named-views).

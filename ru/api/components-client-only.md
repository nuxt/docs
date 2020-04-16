---
title: "API: Компонент <client-only>"
description: Отрисовка компонента только на стороне клиента, при этом отрисовывая заглушку на стороне сервера.
---

> Этот компонент используется для того, чтобы целенаправленно отрисовать его дочерний компонент только на клиентской стороне. Для того чтобы импортировать компонент только на клиенте, требуется зарегистрировать компонент в [плагинах, активных только на клиенте](/guide/plugins#client-side-only).

<div class="Alert Alert--orange">

**Внимание:** Если вы используете версию Nuxt < `v2.9.0`, тогда используйте `<no-ssr>` вместо `<client-only>`

</div>


**Входные параметры**:
- placeholder: `string`
  - Использовать текст в качестве заглушки, пока `<client-only />` монтируется на стороне клиента.

```html
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- Этот компонент будет отрисован только на стороне клиента -->
      <comments />
    </client-only>
  </div>
</template>
```

**Слоты**:

- placeholder:
  - Использовать слот в качестве заглушки, пока `<client-only />` монтируется на стороне клиента.
 
 ```html
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- Этот компонент будет отрисован только на стороне клиента -->
      <comments />
  
      <!-- индикатор загрузки, отрисовывается на стороне сервера -->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

Этот компонент импортирован из [egoist/vue-client-only](https://github.com/egoist/vue-client-only). Спасибо, [@egoist](https://github.com/egoist)!

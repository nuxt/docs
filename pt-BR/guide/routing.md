---
title: Rotas
description: Nuxt.js usa os arquivos para gerar as rotas da sua aplicação.
---

> Nuxt.js automáticamente gera a configuração do [vue-router](https://github.com/vuejs/vue-router) baseado apartir da sua arvore de arquivos Vue dentro do diretório `pages`.

<div class="Alert Alert--grey">

Para navegar entre as páginas, nós recomendamos usar o componente [`<nuxt-link>`](/api/components-nuxt-link).

</div>

Por exemplo:

```html
<template>
  <nuxt-link to="/">Home page</nuxt-link>
</template>
```

## Rota básica

Esta estrutura de arquivos:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

vai gerar automáticamente:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Rotas dinâmicas

Para definir uma rota dinâmica com um parametro, você precisa definir um arquivo .vue OU um diretório **prefixado por um underline**.

Esta estrutura de arquivos:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

vai gerar automáticamente:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

Como você pode ver a rota nomeada `users-id` possui o path `:id?` que o torna opicional, se você quer fazer com que ele seja requirido,
crie um arquivo `index.vue` dentro do diretório `users/_id`.

<div class="Alert Alert--orange">

**Atenção:** rotas dinâmicas são ignoradas pelo comando `generate`: [API Configuration generate](/api/configuration-generate#routes)

</div>

### Validar parâmetros de rotas

Nuxt.js permite que você crie um método validador dentro do seu componente de rota dinâmica.

Neste exemplo: `pages/users/_id.vue`

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

Se o método validador não retornar `true` ou uma `Promise` que retorne `true`, ou dispare um `Error`, Nuxt.js vai automáticamente carregar a página 404 ou 500 dependendo do erro.

Mais informações sobre o método validador: [API Pages validate](/api/pages-validate)

## Rotas aninhadas

Nuxt.js permite que você crie rotas aninhas usando rotas filhas no vue-router.


Para definir o componente pai de uma rota aninhada, você precisa criar um arquivo Vue com o **mesmo nome do diretório** que contem seus arquivos filhos.

<div class="Alert Alert--orange">

<b>Atenção:</b> não esqueça de incluir o componente `<nuxt-child/>` dentro do seu componente pai (arquivo <code>.vue</code>).

</div>

Esta estrutura de arquivos:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

vai gerar automáticamente:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Rotas aninhadas dinâmicas

Este cenário não deveria aconter com frequência, mas é possível com Nuxt.js: ter filhos dinâmicos dentro de pais dinâmicos.

Esta estrutura de arquivos:

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

vai gerar automáticamente:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

### Rotas aninhadas dinâmicas desconhecidas

Se você não sabe a profundidade das sua estrutura de URLs, você pode usar `_.vue` para corresponder a caminhos dinâmicos aninhados.
Isso vai tratar as requisições que não correspondem a uma requisição _mais específica_.

Esta estrutura de arquivos:

```bash
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

Vai tratar as requisições dessa maneira.

Path | File
--- | ---
`/` | `index.vue`
`/people` | `people/index.vue`
`/people/123` | `people/_id.vue`
`/about` | `_.vue`
`/about/careers` | `_.vue`
`/about/careers/chicago` | `_.vue`

__Note:__ O tratamento da página 404 agora está na lógica da página `_.vue`. [More on 404 redirecting can be found here](/guide/async-data#handling-errors).


### SPA fallback

You can enable SPA fallbacks for dynamic routes too. Nuxt.js will output an extra file that is the same as the `index.html` that would be used in `mode: 'spa'`. Most static hosting services can be configured to use the SPA template if no file matches. It won't include the `head` info or any HTML, but it will still resolve and load the data from the API.

We enable this in our `nuxt.config.js` file:

``` js
export default {
  generate: {
    fallback: true, // if you want to use '404.html' instead of the default '200.html'
    fallback: 'my-fallback/file.html' // if your hosting needs a custom location
  }
}
```

#### Implementation for Surge

Surge [can handle](https://surge.sh/help/adding-a-custom-404-not-found-page) both `200.html` and `404.html`. `generate.fallback` is set to `200.html` by default, so no need to change it.

#### Implementation for GitHub Pages and Netlify

GitHub Pages and Netlify recognize the `404.html` file automatically, so setting `generate.fallback` to `true` is all we have to do!

#### Implementation for Firebase Hosting

To use the fallback on Firebase Hosting, configure `generate.fallback` to `true` and use the following config ([more info](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites)):

``` json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/404.html"
      }
    ]
  }
}
```

## Transições

Nuxt.js usa o componente [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) para permitir que voce cria ótimas transições/animações entre a navegação das suas rotas.

### Configurações globais

<div class="Alert Alert--nuxt-green">

<b>Info:</b> nome padrão da transição do Nuxt.js é `"page"`.

</div>

Para adicinar um efeito de fade em todas as páginas da sua aplicação, você precisa de um arquivo CSS que compartilhe através de todas as rotas, então nos começamos criando um arquivo dentro da pasta `assets`.

Nosso CSS global `assets/main.css`:

```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
```

Então nos adicionamos esse caminho dentro do Array `css` no nosso arquivo `nuxt.config.js`:

```js
export default {
  css: [
    '~/assets/main.css'
  ]
}
```

Mais informações sobre transições: [API Configuration transition](/api/pages-transition)

### Configuração de uma página

Você também pode definir uma transição customizada para uma página específica com a propriedade `transition`.

Nós adicionamos uma nova classe em nosso css global `assets/main.css`:

```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

Então nos usamos a propriedade `transition` para definir o nome da classe que a página irá usar como transição.

```js
export default {
  transition: 'test'
}
```

Mais informações sobre a propriedade transition: [API Pages transition](/api/pages-transition)

## Middleware

> Middleware permite que você defina funções customizadas que podem ser executadas antes da renderização de uma página
ou um grupo de páginas (layout).

**Todo middleare deve estar dentro do diretório `middleware/`.** O nome do arquivo corresponde ao nome do middleware  (`middleware/auth.js` vai ser o middleware `auth`).

Um middleware recebe [o contexto](/api/context) como primeiro arugmento:

```js
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```
Middlewares vão ser chamados pelo servidor uma vez (na primeira requisição para o nuxt ou quando a página é atualizada) e no cliente quando
navegar para outras rotas.

O middleware será executado em série nesta ordem:

1. `nuxt.config.js`
2. Matched layouts
3. Matched pages

Um middleware pode ser assíncrono. Para isso, simplesmente retorne uma `Promise` ou use o segundo argumento que é a um `callback`:

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Então, em seu `nuxt.config.js`, use a propriedade `router.middleware`:
`nuxt.config.js`

```js
export default {
  router: {
    middleware: 'stats'
  }
}
```


Agora o middleware `stats` vai ser executado para qualquer mudança de rota.

Você pode adicionar seus middleware em um layout ou página específico desta maneira:

`pages/index.vue` or `layouts/default.vue`

```js
export default {
  middleware: 'stats'
}
```

Para ver um exemplo real usando o middleware, por favor veja este exemplo [example-auth0](https://github.com/nuxt/example-auth0) no GitHub.

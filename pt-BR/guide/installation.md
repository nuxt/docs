---
title: Instalação
description: Com Nuxt.js é muito fácil de começar a desenvolver. Um projeto simples precisa apenas da dependência `nuxt` instalada.
---

> Com Nuxt.js é muito fácil de começar a desenvolver. Um projeto simples precisa apenas da dependência `nuxt` instalada.

## Usando o `create-nuxt-app`

Para começar rapidamente, o time do Nuxt.js criou uma ferramenta de scaffolding chamada [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Tenha certeza de que você possui o [npx](https://www.npmjs.com/package/npx) instalado (`npx` vem por padrão desde a versão `5.2.0` do NPM)

```bash
$ npx create-nuxt-app <nome-do-projeto>
```

Ou com [yarn](https://yarnpkg.com/pt-BR/):

```bash
yarn create nuxt-app <nome-do-projeto>
```

A ferramenta vai te perguntar algumas coisas:

1. Escolhar entre um dos frameworks para o back-end:
  - None (Nuxt default server)
  - [Express](https://github.com/expressjs/express)
  - [Koa](https://github.com/koajs/koa)
  - [Hapi](https://github.com/hapijs/hapi)
  - [Feathers](https://github.com/feathersjs/feathers)
  - [Micro](https://github.com/zeit/micro)
  - [Adonis](https://github.com/adonisjs/adonis-framework) (WIP)
2. Escolha entre um dos frameworks para o front-end:
  - None (feel free to add one later)
  - [Bootstrap](https://github.com/bootstrap-vue/bootstrap-vue)
  - [Vuetify](https://github.com/vuetifyjs/vuetify)
  - [Bulma](https://github.com/jgthms/bulma)
  - [Tailwind](https://github.com/tailwindcss/tailwindcss)
  - [Element UI](https://github.com/ElemeFE/element)
  - [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
  - [Buefy](https://buefy.github.io)
3. O modo do nuxt que você deseja (`Universal` ou `SPA`)
4. Adicionar o [módulo do axios](https://github.com/nuxt-community/axios-module) para fazer erquisições HTTP facilmente.
5. Adicionar [EsLint](https://eslint.org/) para inspecionar seu código.
5. Adicionar [Prettier](https://prettier.io/) para deixar seu código organizado.

When answered, it will install all the dependencies so the next step is to launch the project with:
Depois de responder tudo, vai ser insalado todas as dependências e então o próximo passo é iniciar o projeto com:

```bash
$ npm run dev
```

A aplicação vai ser iniciada em http://localhost:3000.

<p class="Alert">O Nuxt.js vai ficar esperando por alterações dentro do diretório <code>pages</code>, sendo assim você não precisa reiniciar a aplicação caso adicione uma nova página ao projeto.</p>

Para saber mais sobre a estrutura de diretórios de uma aplicação: [Documentação da estrutura dos diretórios](/guide/directory-structure).

## Comece do zero

Criar uma aplicação Nuxt.js do zero é bem simples também, você precisa apenas de *um arquivo e uma pasta*. Vamos criar um diretório vázio para começar a trabalhar em nossa aplicação:

```bash
$ mkdir <nome-do-projeto>
$ cd <nome-do-projeto>
```

<p class="Alert Alert--nuxt-green"><b>Info:</b> substituia <code>&lt;nome-do-projeto&gt;</nom-du-projet></code> pelo nome do seu projeto.</p>

### O package.json

O projeto precisa de um `package.json` para especificarmos como sera iniciado nosso projeto `nuxt`:

```json
{
  "name": "nome-do-projeto",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts` vai iniciar o Nuxt.js através do comando `npm run dev`.

### Instalando o `nuxt`

Uma vez que o arquivo `package.json` foi criado, vamos adicionar o `nuxt` ao projeto usando o npm:

```bash
npm install --save nuxt
```

### O diretório `pages`

O Nuxt.js vai criar para cada arquivo `*.vue` dentro do diretório `pages` uma rota na a aplicação.

Crie o diretório `pages`:

```bash
$ mkdir pages
```

depois crie sua primeira página `pages/index.vue`:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

e inicie o projeto em modo de desenvolvimento com o comando:

```bash
$ npm run dev
```

A aplicação vai ser iniciada em http://localhost:3000..

<p class="Alert">O Nuxt.js vai ficar esperando por alterações dentro do diretório <code>pages</code>, sendo assim você não precisa reiniciar a aplicação caso adicione uma nova página ao projeto.</p>

Para saber mais sobre a estrutura de diretórios de uma aplicação: [Documentação da estrutura dos diretórios](/guide/directory-structure).

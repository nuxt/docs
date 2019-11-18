---
title: Introdução
description: Nuxt.js é um framework para criar aplicações Vue, você pode escolher
  entre Universal, Arquivos estáticos ou SPA(Single Page Application)
---

> Nuxt.js é um framework para criar aplicações Vue, você pode escolher entre Universal, Arquivos estáticos ou SPA(Single Page Application)

## O que é Nuxt.js?

O escopo principal é a **renderização da interface do usuário**, abstraindo as relações entre o cliente e servidor.

Nosso objetivo é criar um framework flexível o suficiente para que você possa usar como base em seus projetos ou até mesmo implementar em um projeto já existe baseado em Node.js.

Nuxt.js pré-configura todas as configurações necessárias para que você possa desenvolver aplicações **universais** com Vue.js de uma maneira divertida.

Além disso, nos também oferecemos outra maneira de implementação chamada: *nuxt generate*. Este comando irá gerar **arquivos estáticos** de uma aplicativo Vue.js.
Nós acreditamos que esta opção pode ser o próximo grande passo no desenvolvimento de aplicações web com microservices.

Além disso, você também pode usar o Nuxt.js para criar rapidamente aplicativos single page application (`mode: 'spa'`).

Como um framework, Nuxt.js vem com muitos recursos para ajudar você em seu desenvolvimento entre o lado do cliente e o lado do servidor, Asynchronous Data, Middleware, Layouts, etc.

## Como funciona

![Vue with webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js incluí o seguintes itens para criar um desenvolvimento de aplicações web rico:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) (incluído apenas quando a [opção de store](/guide/vuex-store) é usada)
- [Vue Server Renderer](https://ssr.vuejs.org/en/) (excluído quando [`mode: 'spa'`](/api/configuration-mode))
- [vue-meta](https://github.com/nuxt/vue-meta)

Um total de apenas **57kB min+gzip** (60kB com Vuex).

Por debaixo dos panos nós usamos [webpack](https://github.com/webpack/webpack) com [vue-loader](https://github.com/vuejs/vue-loader) e [babel-loader](https://github.com/babel/babel-loader) para criar o bundle, fazer o code-split e minificar o código.

## Recursos

- Escreva arquivos Vue (`*.vue`)
- Code Splitting automaticamente
- Server-Side Rendering
- Sistema de rotas robusto com Asynchronous Data
- Servidor de arquivos estáticos
- Transpilação para ES2015+
- Gera o build e minifica seus arquivos JS & CSS
- Gerencie a tag `<head>` (`<title>`, `<meta>`, etc.)
- Hot module replacement em desenvolvimento
- Pre-processadores: Sass, Less, Stylus, etc.
- HTTP/2 push headers ready
- Extensível com uma arquitetura modular

## Fluxo

Este fluxo mostra todo o processo que o Nuxt.js faz quando o server é chamado ou quando o usuário navega através do aplicativo usando `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.svg)

## Server Rendered (Universal SSR)

You can use Nuxt.js as a framework to handle all the UI rendering of your project.

When launching `nuxt`, it will start a development server with hot-reloading and [Vue Server Renderer](https://ssr.vuejs.org/en/) configured to automatically server-render your application.

### Single Page Applications (SPA)

If, for any reason, you prefer not to use server side rendering or need static hosting for your applications, you can simply use SPA mode using `nuxt --spa`. In combination with the *generate* feature, it gives you a powerful SPA deployment mechanism without the need to use a Node.js runtime or any special server handling.

Take a look at [the commands](/guide/commands) to learn more about usage.

If you already have a server, you can plug Nuxt.js by using it as a middleware. There is no restriction at all when using Nuxt.js for developing your Universal Web Applications. See the [Using Nuxt.js Programmatically](/api/nuxt) guide.

## Static Generated (Pre Rendering)

The big innovation of Nuxt.js comes with the `nuxt generate` command.

When building your application, it will generate the HTML for every one of your routes and store it in a file.

For example, the following file structure:

```bash
-| pages/
----| about.vue
----| index.vue
```

Will generate:

```
-| dist/
----| about/
------| index.html
----| index.html
```

With this, you can host your generated web application on any static hosting!

The best example is this website. It is generated and hosted on GitHub Pages:

We don't want to manually generate the application every time we update the [docs repository](https://github.com/nuxt/docs), so each push made calls an AWS Lambda function which:

1. Clone the [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org)
2. Install the dependencies via `npm install`
3. Run `nuxt generate`
4. Push the `dist` folder to the `gh-pages` branch

We now have a **Serverless Static Generated Web Application** :)

We can go further by thinking of an e-commerce web application made with `nuxt generate` and hosted on a CDN. Everytime a product is out of stock or back in stock, we regenerate the web app. But if the user navigates through the web app in the meantime, it will be up to date thanks to the API calls made to the e-commerce API. No need to have multiple instances of a server + a cache anymore!

<div class="Alert">

See [How to deploy on Netlify?](/faq/netlify-deployment) for more details on how to deploy to Netlify.

</div>

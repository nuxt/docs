---
title: Estrutura de diretórios
description: A estrutura padrão do Nuxt.js tem foco em proporcionar um excelente ponto de partida tanto para grandes quanto pequenos projetos.
---

> A estrutura padrão do Nuxt.js tem foco em proporcionar um excelente ponto de partida tanto para grandes quanto pequenos projetos. Mas sinta-se avontade para organizar da formar que achar melhor.

## Diretórios

### Diretório Assets

O diretório `assets` contem seus assets como arquivo Less, Sass ou JavaScript.

[Mais informações sobre o diretório Assets](/guide/assets)

### Diretório Componentes

O diretório `components` contem seus componentes Vue.js. O Nuxt.js não adiciona o metódo asyncData nesses componentes.

### Diretório Layouts

O diretório `layouts` contem os layouts da aplicação.

_Esse diretório não pode ser renommeado_

[Mais informações sobre o diretório Layouts](/guide/views#layouts)

### Diretório Middleware

O diretório `middleware` contem os middleware da aplicação. Middleware permite que você defina funções que podem ser executadas antes da renderização de uma página ou um grupo de páginas(layouts).

[Mais informações sobre o diretório Middleware](/guide/routing#middleware)

### Diretório Pages

O diretório `pages` contem a parte de Views e Routes. O framework le todos os arquivos `.vue` dentro do diretório e cria a rota da aplicação apartir da estrutura definida.

_Esse diretório não pode ser renommeado_

[Mais informações sobre o diretório Pages](/guide/views)

### Diretório Plugins

O diretório `plugins` contem os plugins JavaScript que você precisa executar antes da inicialização do root de uma aplicação Vue.js

[Mais informações sobre o diretório Plugins](/guide/plugins)

### Diretório Static

O diretório `static` contem os arquivos estáticos. Cada arquivo dentro do diretório é mapeado para `/`.

**Exemplo:** `/static/robots.txt` é mapeado como `/robots.txt`

_Esse diretório não pode ser renommeado_

[Mais informações sobre o diretório Static](/guide/assets#static)

### Diretório Store

O diretório `store` contem seus arquivos [Vuex Store](http://vuex.vuejs.org/en/). A opção de usar Vuex como store é implementada no Nuxt.js por padrão. Criando um arquivo `index.js` dentro do diretório habilita o Vuex automáticamente.

_Esse diretório não pode ser renommeado_

[Mais informações sobre o diretório Store](/guide/vuex-store)

### Arquivo nuxt.config.js

O arquivo `nuxt.config.js` contem suas configurações customizadas para o Nuxt.js.

_Esse arquivo não pode ser renommeado_

[Mais informações sobre o arquivo `nuxt.config.js`](/guide/configuration)

### Arquivo package.json

O arquivo `package.json` contem suas dependências e scripts.

_Esse arquivo não pode ser renommeado_

## Prefixos para os diretórios

| Apelido | Diretório |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

Por padrão, `srcDir` é o mesmo que `rootDir`.

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Dentro do seus templates `vue`, se você precisar referenciar seus diretórios `assets` or `static`, use `~/assets/usa_imagem.png` e `~/static/usa_imagem.png`.

</div>

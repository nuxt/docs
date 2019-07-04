---
Titulo: Estrutura de diretórios
Descrição: A estrutura de aplicação padrão do Nuxt.js destina-se a fornecer um ótimo ponto de partida para aplicativos grandes e pequenos.
---

> A estrutura de aplicação padrão do Nuxt.js destina-se a fornecer um excelente ponto de partida para aplicativos pequenos e grandes. Claro, você é livre para organizar seu aplicativo da maneira que quiser.


## Diretórios

### Diretórios assets
O diretório `assets` contém seus recursos não compilados, como Less, Sass ou JavaScript.

[Mais documentação sobre integração de assets](/guide/assets)

### Diretório de Componentes
O diretório `componentes` contém seus componentes Vue.js. O Nuxt.js não sobrecarrega o método de dados nesses componentes.

### Diretório de Layouts
O diretório `layouts` contém seus layouts de aplicativos.

_Esse diretório não pode ser renomeado._

[Mais documentação sobre integração de layouts](/guide/views#layouts)


### Diretório de Middleware
O diretório `middleware` contém o sua aplicação Middleware. O middleware permite definir funções personalizadas que podem ser executadas antes de renderizar uma página ou um grupo de páginas (layouts).

[Mais documentação sobre integração de middleware](/guide/routing#middleware)

### Diratório de paginas

O diretório `paginas` contém seus modos de exibição de aplicativo e rotas. O framework lê todos os arquivos `.vue` dentro deste diretório e cria o roteador do aplicativo.

_Esse diretório não pode ser renomeado._

[Mais documentação sobre integração de paginas](/guide/views)


### The Plugins Directory

The `plugins` directory contains your Javascript plugins that you want to run before instantiating the root Vue.js Application.

[More documentation about Plugins integration](/guide/plugins)

### The Static Directory

The `static` directory contains your static files. Each file inside this directory is mapped to `/`.

**Example:** `/static/robots.txt` is mapped as `/robots.txt`

_This directory cannot be renamed._

[More documentation about Static integration](/guide/assets#static)

### The Store Directory

The `store` directory contains your [Vuex Store](http://vuex.vuejs.org/en/) files. The Vuex Store option is implemented in the Nuxt.js framework. Creating an `index.js` file in this directory enables the option in the framework automatically.

_This directory cannot be renamed._

[More documentation about Store integration](/guide/vuex-store)

### The nuxt.config.js File

The `nuxt.config.js` file contains your Nuxt.js custom configuration.

_This file can not be renamed._

[More documentation about `nuxt.config.js` integration](/guide/configuration)

### The package.json File

The `package.json` file contains your Application dependencies and scripts.

_This file can not be renamed._

## Aliases

| Alias | Directory |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

By default, `srcDir` is the same as `rootDir`.

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Inside your `vue` templates, if you need to link to your `assets` or `static` directory, use `~/assets/your_image.png` and `~/static/your_image.png`.

</div>

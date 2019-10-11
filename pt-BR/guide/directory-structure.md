---
Titulo: Estrutura de diretórios
Descrição: A estrutura de aplicação padrão do Nuxt.js destina-se a fornecer um ótimo ponto de partida para aplicativos grandes e pequenos.
---

> A estrutura de aplicação padrão do Nuxt.js destina-se a fornecer um excelente ponto de partida para aplicativos pequenos e grandes. Claro, você é livre para organizar seu aplicativo da maneira que quiser.


## Diretórios

<br />

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

### Diretório de paginas

O diretório `paginas` contém seus modos de exibição de aplicativo e rotas. O framework lê todos os arquivos `.vue` dentro deste diretório e cria o roteador do aplicativo.

_Esse diretório não pode ser renomeado._

[Mais documentação sobre integração de paginas](/guide/views)

### Diretório de plugins

O diretório `plugins` contém seus plugins Javascript que você deseja executar antes de instanciar o aplicativo root Vue.js.

[Mais documentação sobre integração de Plugins ](/guide/plugins)


### Diretório Estático

O diretório `estatico` contém seus arquivos estáticos. Cada arquivo dentro deste diretório é mapeado para `/`.

**Example:** `/estatico/robots.txt` is mapeado como `/robots.txt`

_Esse diretório não pode ser renomeado._

[Mais documentação sobre integração de Static](/guide/assets#static)

### Diretório Store

O diretório `store` contém seu arquivos [Vuex Store](http://vuex.vuejs.org/en/). A opção Vuex Store é implementada no framework Nuxt.js. Criar um arquivo `index.js` neste diretório habilita a opção na estrutura automaticamente.

_Esse diretório não pode ser renomeado._

[Mais documentação sobre integração de Store](/guide/vuex-store)

### O arquivo nuxt.config.js

O arquivo `nuxt.config.js` contém sua configuração customizada do Nuxt.js.

_Esse arquivo não pode ser renomeado._

[Mais documentação sobre integração de`nuxt.config.js`](/guide/configuration)

### O arquivo package.json 

O arquivo `package.json` contém suas dependências e scripts da aplicação.

_Esse arquivo não pode ser renomeado._

## Aliases

| Alias | Diretório |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

Por padrão, `srcDir` é o mesmo que` rootDir`.

<div class="Alert Alert--nuxt-green">

Dentro dos seus templates `vue`, se você precisa fazer link ao diretório` assets` ou `static`, usado ` ~ assets / your_image.png` e `~ / static / your_image.png`.

</div>

---
title: "API : La propriété env (EN)"
description: Partager les variables d'environnement entre client et serveur.
---

# La propriété env

- Type : `Object`

> Nuxt.js vous permet de créer des variables d'environnement qui seront partagées entre le côté client et serveur.

Exemple (`nuxt.config.js`) :

```js
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

Cela me permet de créer une propriété `baseUrl` qui sera égale à la variable d'environnement `BASE_URL` si définie, sinon à `'http://localhost:3000'`.

Puis, je peux accéder à ma variable `baseUrl` de deux manières :

1. Via `process.env.baseUrl`.
2. Via `context.env.baseUrl`, voir l'[API context](/api/context).

Vous pouvez utiliser la propriété `env` pour fournir un jeton public par exemple.

Nous pouvons utiliser l'exemple ci-dessus pour configurer [axios](https://github.com/mzabriskie/axios).

`plugins/axios.js` :

```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Puis, dans vos pages, vous pouvez importer axios ainsi : `import axios from '~/plugins/axios'`

## Automatic injection of environment variables (EN)

If you define environment variables starting with `NUXT_ENV_` in the build phase (f.ex. `NUXT_ENV_COOL_WORD=freezing nuxt build`, they'll be automatically injected into the process environment. Be aware that they'll potentially take precedence over defined variables in your `nuxt.config.js` with the same name.

## process.env == {}

Notez que Nuxt utilise le `definePlugin` de webpack pour définir une variable d'environnement. Cela signifie que l'actuel `process` ou `process.env` de Node.js n'est ni accessible ni défini. Chacune des propriétés de `env` définie dans nuxt.config.js est individuellement associée à `process.env.xxxx` et convertie pendant la compilation.

Cela signifie que `console.log(process.env)` affichera `{}` mais `console.log(process.env.you_var)` va tout de même afficher votre valeur. Quand webpack compile votre code, il remplace toutes les instances de `process.env.your_var` par la valeur qui lui est affectée. Par ex. : `env.test = 'testing123'`. Si vous utilisez `process.env.test` quelque part dans votre code, il sera transformé en 'testing123'.

avant

```js
if (process.env.test == 'testing123')
```

après

```js
if ('testing123' == 'testing123')
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>

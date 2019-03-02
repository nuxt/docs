---
title: Host et Port
description: Comment changer le HOST et le PORT avec Nuxt.js ?
---

# Comment changer le host et le port ?

Vous pouvez configurer les variables de connexion de plusieurs façon différentes, listé de la plus basse à la plus haute priorité :

## Via la configuration `nuxt` dans le `package.json` :

Inside your `package.json`:

```json
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```

## Avec les variables `HOST` et `PORT` de `env`

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

**Note** : pour un meilleur développement qui fonctionne sur toutes les plateformes vous pouvez utiliser le package [cross-env](https://www.npmjs.com/package/cross-env).

Installation :

```bash
npm install --save-dev cross-env
```

```js
"scripts": {
  "dev": "cross-env HOST=0.0.0.0 PORT=3333 nuxt"
}
```

## Avec les variables `NUXT_HOST` et `NUXT_PORT` de `env`

Similaire à `HOST` et `PORT` mais plus spécifique dans le cas ou vous avez besoin d'autres choses.

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## Comme arguments directs

```js
"scripts": {
  "dev": "nuxt --hostname myhost --port 3333"
}
```

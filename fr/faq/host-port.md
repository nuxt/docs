---
title: Comment modifier l'hôte et le port?
description: Comment modifier l'hôte et le port avec Nuxt.js?
---

Par défault, Le serveur de développement Nuxt est `localhost` (uniquement accessible depuis la machine hôte).

L'hôte `0.0.0.0` est conçu pour indiquer à Nuxt pour rendre disponible l'addresse de l'hôte, accessible depuis des connexions _extérieures_ à la machine hôte (e.g. LAN).

Vous pouvez configurer les variables de connexion de plusieurs façons. Ces derniers sont affichés **de la plus grande priorité à la plus petite**.

> **Remarque:** Si au `port` est assigné une chaîne de charactère `'0'` (et non `0`, qui est incorrect), un port aléatoire sera attribué à votre application Nuxt.

## En utilisant des arguments directs

```sh
nuxt --hostname votrehote --port 3333
```
Ou
```js
"scripts": {
  "dev": "nuxt --hostname votrehote --port 3333"
}
```

## Configurer dans le fichier `nuxt.config.js`:

A l'intérieure de votre fichier `nuxt.config.js`:

```js
export default {
  server: {
    port: 8000, // par défaut: 3000
    host: '0.0.0.0' // par défaut: localhost
  }
  // d'autres configurations
}
```


## En utilisant les variables environments NUXT_HOST et NUXT_PORT

Similaire à HOST et PORT, mais plus spécifique lorsque vous avez besoin de les utiliser à d'autres fins. 

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

**Remarque**: pour une meilleur compatibilité d'un développement multi-platforme, vous pouvez utiliser [cross-env](https://www.npmjs.com/package/cross-env) package.

Installation:

```bash
npm install --save-dev cross-env
```

```js
"scripts": {
  "dev": "cross-env NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## En utilisant les variables environment HOST et PORT

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```


## A partir de la configuration `nuxt` dans le fichier `package.json`:

Dans votre fichier `package.json`:

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

---
title: Host et Port
description: Comment changer le HOST et le PORT avec Nuxt.js ?
---

# Comment changer le host et le port ? (EN)

By default, Nuxt development server host is `localhost` (only accessible from within the host machine).

Host `0.0.0.0` is designated to tell Nuxt to resolve a host address, which is accessible to connections _outside_ of the host machine (e.g. LAN).

Vous pouvez configurer les variables de connexion de plusieurs façons différentes, listé **de la plus haute à la plus basse priorité**.

> **Note :** si `port` est renseigné par la chaine de caractère `'0'` (pas `0`, qui correspond à Faux), un port aléatoire sera assigné à votre application Nuxt.

## Directement par les arguments

```sh
nuxt --hostname monserveur --port 3333
```
ou
```js
"scripts": {
  "dev": "nuxt --hostname monserveur --port 3333"
}
```

## Configuré dans `nuxt.config.js` :

Dans votre `nuxt.config.js` :

```js
export default {
  server: {
    port: 8000, // par défaut: 3000
    host: '0.0.0.0', // par défaut: localhost
  },
  // autres configurations
}
```


## Avec les variables d'environnement NUXT_HOST et NUXT_PORT

Similaire à HOST et PORT mais plus spécialement dans le cas où vous en avez besoin pour autre chose.

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

**Note** : pour un meilleur développement qui fonctionne sur toutes les plateformes vous pouvez utiliser le package [cross-env](https://www.npmjs.com/package/cross-env).

Installation :

```bash
npm install --save-dev cross-env
```

```js
"scripts": {
  "dev": "cross-env NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## Avec les variables d'environnement HOST et PORT

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```


## Via une configuration de `nuxt` dans `package.json` :

Dans votre `package.json` :

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

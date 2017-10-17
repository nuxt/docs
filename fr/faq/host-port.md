---
title: HOST et PORT
description: Comment changer le HOST et le PORT avec Nuxt.js ?
---

# Comment changer le HOST et le PORT ?

Vous pouvez configurer le PORT de trois façons :

1. Via une variable d'environnement

  ```js
  "scripts": {
    "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
  }
  ```

2. Ajoutez un meilleur support de développement qui fonctionne sur toutes les plateformes.

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

3. Via la configuration `nuxt` dans `package.json` :

  Dans votre `package.json` :

  ```js
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

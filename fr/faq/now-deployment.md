---
title: Déployer avec Now
description: Comment déployer une application Nuxt.js avec Now ?
---

# Comment déployer avec Now ?

## Now V2 (EN)

**Note:** You cannot deploy a server-side-rendered Nuxt app with Now V2 right now. Please use Now V1 for such apps.

Pour déployer avec [ZEIT Now](https://zeit.co/now), il faut un fichier `package.json` ainsi qu'un fichier de configuration `now.json` :

* Add `now-build` script command to `package.json`:
  * For SPA (without SSR):
    ```js
    "scripts": {
       ...
       "now-build": "nuxt build --spa"
    }
    ```
  * For Static Generated (Pre Rendering):
    ```js
    "scripts": {
       ...
       "now-build": "nuxt generate"
    }
    ```
* Create `now.json` and define `builds`
  ```json
  {
    "version": 2,
    "builds": [
      { "src": "package.json", "use": "@now/static-build" }
    ]
  }
  ```
* Run `now` and enjoy!

## Now V1 (legacy)

Pour déployer avec [now.sh](https://zeit.co/now), un fichier `package.json` comme suit est recommandé :

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

Puis exécutez `now` et profitez !

Note : nous recommandons d'ajouter `.nuxt` dans `.npmignore` ou `.gitignore`.

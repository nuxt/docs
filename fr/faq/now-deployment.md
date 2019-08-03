---
title: Déployer avec Now
description: Comment déployer une application Nuxt.js avec Now ?
---

# Comment déployer avec Now ?

![nuxt-now-builder](https://user-images.githubusercontent.com/904724/61308402-7a752d00-a7f0-11e9-9502-23731ccd00fd.png)

## Now V2

Pour déployer avec [Now V2](https://zeit.co/now), l'équipe Nuxt.js et ses contributeurs on travailler sur le package officiel [@nuxtjs/now-builder](https://github.com/nuxt/now-builder).

Tout ce que vous avez à faire est de définir un fichier `now.json` :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/now-builder",
      "config": {}
    }
  ]
}
```

Vous pouvez en apprendre plus et voir des exemples sur https://github.com/nuxt/now-builder

## Now V1 (legacy)

Pour déployer avec [Now V1](https://zeit.co/now), un fichier `package.json` comme suit est recommandé :

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

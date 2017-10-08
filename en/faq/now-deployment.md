---
title: Déployer avec Now
description: Comment déployer une application Nuxt.js avec Now ?
---

# Comment déployer avec Now ?

Pour déployer avec [Now](https://zeit.co/now), un fichier `package.json` comme suit est recommandé :

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

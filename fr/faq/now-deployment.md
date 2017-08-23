---
title: Déployer avec Now.sh
description: Déployer nuxt.js avec Now.sh
---

# Déployer avec Now.sh

Pour déployer avec [now.sh](https://zeit.co/now), un fichier `package.json` comme suit est recommandé:
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

Puis exécutez `now` et profiter!

Note: nous recommandons d'ajouter `.nuxt` dans `.npmignore` ou `.gitignore`.

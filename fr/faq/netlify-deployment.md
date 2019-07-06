---
title: Déploiement sur Netlify
description: Comment déployer une application Nuxt.js sur Netlify ?
---

# Comment déployer une application Nuxt.js sur Netlify ?

Déployer sur [Netlify](https://www.netlify.com) est une option sans friction pour obtenir en ligne rapidement un site Nuxt.js __généré statiquement__.

Le coeur du processus tire parti de la commande `nuxt generate` lors du déploiement pour créer une version statique de votre application Nuxt.js dans le répertoire `dist`. Le contenu de ce répertoire peut ensuite être déployé sur une URL de production.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Visionner un cours gratuit sur <strong>Comment déployer une application Nuxt.js sur Netlify</strong> sur Vue School (EN)
    </p>
  </a>
</div>

## Pour commencer

Appuyez sur le bouton _"Nouveau site depuis Git"_ sur le dashboard Netlify. Authentifiez-vous avec votre hôte de référentiels, sélectionnez un référentiel à déployer, et sur "continuer". Vous devriez atterrir à l'étape 3 : _"Options de Build, et déploiement !"_

## Configurer :

### Pour un site générée statiquement

1. __Branche à déployer :__ `master`, ou bien la branche que vous préférez
1. __Commande de Build :__ `npm run generate`
1. __Répertoire de publication :__ `dist`

### For site generated in SPA mode (EN)

1. __Branch to deploy:__ `master`, or which-ever branch you prefer
1. __Build command:__ `npm run build`
1. __Publish directory:__ `dist`

For a single page app there is a problem with refresh as by default on netlify the site redirects to *"404 not found"* this can be [prevented](https://www.netlify.com/docs/redirects/#rewrites-and-proxying) by configuring redirects. There is a module for that [nuxt-netlify](https://www.bazzite.com/docs/nuxt-netlify) which helps to configure both headers and redirects of the SPA .

> For simple reference on netlify redirects read blog [post](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site) by Divya Sasidharan

> Optionellement, vous pouvez ajouter des variables supplémentaires ENV via le bouton _"Avancé"_. Cela peut être utile afin de changer pour des informations d'identification aux API ou autre. Netlify fournit également des [variables d'environnement ENV par défaut](https://www.netlify.com/docs/build-settings/#build-environment-variables) qui peuvent être lu par votre application Nuxt.js au moment du build.

Cliquez sur _"Deployer le site"_ pour déclencher immédiatement le déploiement. Votre site Netlify se verra assigner une URL aléatoire et déployez en utilisant la commande `nuxt generate`.

Voilà ! Votre application Nuxt.js est maintenant hébergée sur Netlify !

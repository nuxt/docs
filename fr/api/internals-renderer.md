---
title: "API : la classe Renderer"
description: La classe `Renderer` de Nuxt
---

# Classe `Renderer`

- Source : **[core/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/renderer.js)**

Cette classe exporte un middleware qui gère et sert tous les rendus côté serveur et les requêtes de ressources.

## Points d'ancrage

Nous pouvons enregistrer des points d'ancrage sur certains évènements du cycle de vie.

Point d'ancrage           | Arguments              | Quand
--------------------------|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 `render:before`          |                        | *description manquante*
 `render:setupMiddleware` | connect instance (app) | Avant que Nuxt ajoute sa pile de middleware. Nous pouvons l'utiliser pour enregistrer des middlewares côté serveur personnalisés
 `render:resourcesLoaded` |                        | *description manquante*
 `render:errorMiddleware` | connect instance (app) | Appelez votre propre middleware avant d'utiliser ceux de Nuxt. Voir le [module Sentry](https://github.com/nuxt-community/sentry-module/blob/master/lib/sentry.js) pour plus d'informations.
 `render:route`           |                        | *description manquante*
 `render:done`            | renderer               | Middleware de rendu côté serveur et toutes les ressources prêtes

---
title: Données asynchrones dans les composants
description: Données asynchrones dans les composants?
---

# Données asynchrones dans les composants?

Étant donné que les composants ne comportent pas de méthode asyncData, vous ne pouvez pas récupérer directement côté serveur de données asynchrone dans un composant. Pour contourner cette limitation, vous avez deux possibilités:

1. Effectuez l'appel API dans le hook mounted() et définissez les données quand le composant est loadé. *Problème: ne fonctionne pas pour le rendu côté serveur
2. Effectuez l'appel API dans la méthode asyncData() ou fetch() du composant page et passez les données en tant que props au sous-composant. Le rendu côté serveur fonctionnera. *Problème: asyncData() ou fetch() d'une page peuvent êtres moins lisibles car elles chargent les données pour d'autres composants*

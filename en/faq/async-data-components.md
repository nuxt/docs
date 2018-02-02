---
title: Données asynchrones dans les composants
description: Données asynchrones dans les composants ?
---

# Données asynchrones dans les composants ?

Étant donné que les composants ne comportent pas de méthode `asyncData`, vous ne pouvez pas récupérer directement côté serveur de données asynchrones dans un composant. Pour contourner cette limitation, vous avez deux possibilités :

1. Effectuez l'appel à l'API dans le point d'ancrage `mounted` et définissez les propriétés des données quand le composant est chargé. *Problème : ne fonctionne pas pour le rendu côté serveur*.
2. Effectuez l'appel à l'API dans la méthode `asyncData` ou `fetch` du composant de page et passez les données en tant que props au sous-composant. Le rendu côté serveur fonctionnera correctement. *Problème : les méthodes `asyncData` ou `fetch` pour une page peuvent être moins lisibles car elles chargent les données pour d'autres composants*.

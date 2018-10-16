---
title: Asynchrone Daten in Komponenten
description: Asynchrone Daten in Komponenten?
---

# Asynchrone Daten in Komponenten?

Da nur Seiten-Komponenten eine `asyncData` Methode haben, können innerhalb normaler Komponenten keine asynchronen Daten vom Server abgerufen werden. Um diese Einschränkung zu umgehen, gibt es zwei Optionen:

1. Rufe die API im `mounted` Hook auf und setze `data` dann, wenn die Seite geladen hat. *Nachteil: Diese Methode funktioniert nicht bei serverseitigem rendern*.
2. Rufe die API in der `asyncData` oder `fetch` Methode der Seiten-Komponente auf und gib die Daten als props an die Komponnte weiter. Serverseitiges Rendering wird davon nicht beeinflusst. *Nachteil: Die `asyncData` oder `fetch` der Seite wird unübersichtlicher, da sie Daten für andere Komponenten lädt*.

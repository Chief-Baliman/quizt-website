# Quizt Website

Diese Version enthält:
- automatische Sortierung der Events nach `dateISO`
- nächstes anstehendes Event automatisch oben auf der Startseite
- vergangene Termine automatisch ab dem Folgetag auf der Termine-Seite
- Punkteübersicht-Button nur bei gefülltem `scoreboardCode`
- Impressum und Datenschutzerklärung im Footer

## Events pflegen
Alle Termine stehen in `data.js`.

Wichtig:
- `dateISO` im Format `YYYY-MM-DD` pflegen
- `ticketUrl` für Ticketlinks eintragen
- `scoreboardCode` leer lassen, bis die Punkteübersicht aktiv sein soll

Beispiel:
```js
scoreboardCode: ""
```

zeigt keinen Punktebutton.

```js
scoreboardCode: "1234"
```

zeigt den Button und öffnet direkt das Scoreboard.

## Rechtliches
Bitte Impressum und Datenschutz vor Veröffentlichung prüfen. Falls Laura rechtlich Betreiberin sein soll, müssen die Angaben entsprechend angepasst werden.

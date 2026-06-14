/*
  QUIZT WEBSITE DATEN
  Hier kannst du neue Events, Ergebnisse und Links pflegen.

  Wichtig:
  - Text immer in Anführungszeichen setzen.
  - Mehrere Events mit Komma trennen.
  - ticketUrl = direkter Ticketlink zum Event.
  - scoreboardCode = Event-Code aus dem Quizt-Scoreboard.

  Pflege der Punkteübersicht pro Event:
  - scoreboardCode: "" blendet den Button „Punkteübersicht" an der Event-Kachel aus.
  - scoreboardCode: "1234" zeigt den Button und öffnet beim Event direkt die Live-Punkte zu diesem Code.
*/

window.QUIZT_DATA = {
  brand: {
    name: "Quizt",
    claim: "Das Quiz mit Twist",
    mainUrl: "https://quizt.fun",
    instagramUrl: "https://www.instagram.com/quiz_mit_twist/",
    tiktokUrl: "https://www.tiktok.com/@quiz_mit_twist",
    linktreeUrl: "https://linktr.ee/quiz_mit_twist",
    email: "laura.quizt@gmail.com",
    scoreboardBaseUrl: "https://chief-baliman.github.io/quizt-scoreboard/"
  },

  events: [
    {
      id: "streetlife-2026-06-18",
      title: "Quizt im Streetlife",
      category: "Allgemeinwissen",
      location: "Streetlife",
      address: "Kölner Str. 45, 41539 Dormagen",
      dateLabel: "Do. 18.06.2026",
      dateISO: "2026-06-18",
      time: "19:30 Uhr",
      city: "Dormagen",
      ticketUrl: "https://rausgegangen.de/events/quizt-streetlife-das-quiz-mit-twist-0/",
      scoreboardCode: "",
      flyerImage: "flyer-streetlife.png",
      status: "upcoming",
      featured: true
    },
    {
      id: "gabriels-pinte-2026-07-17",
      title: "Quizt in Gabriels Pinte",
      category: "Allgemeinwissen",
      location: "Gabriels Pinte",
      address: "Neusser Landstr. 381, 50769 Köln",
      dateLabel: "Fr. 17.07.2026",
      dateISO: "2026-07-17",
      time: "19:30 Uhr",
      city: "Köln",
      ticketUrl: "https://rausgegangen.de/events/quizt-gabriels-pinte-das-quiz-mit-twist-0/",
      scoreboardCode: "",
      flyerImage: "flyer-gabriels-pinte.png",
      status: "upcoming",
      featured: false
    }
  ],

  results: [
    /* Beispiel für später:
    {
      title: "Quizt Premiere im Streetlife",
      dateLabel: "Do. 18.06.2026",
      location: "Streetlife",
      scoreboardCode: "1234"
    }
    */
  ],

  locationOffers: [
    {
      title: "Bars & Kneipen",
      text: "Ein wiederkehrender Quizabend für Teams, Stammgäste und neue Besucher. Ideal für Abende, die mehr Leben brauchen."
    },
    {
      title: "Cafés & Brauhäuser",
      text: "Persönlich, nahbar und gut planbar. Wir bringen Fragen, Ablauf, Moderation und digitale Punkteübersicht mit."
    },
    {
      title: "Firmen & private Feiern",
      text: "Ein lockeres Format für Gruppen, Geburtstage, Teamabende und besondere Anlässe ohne steifen Eventcharakter."
    }
  ]
};

# Fluffie eet

Een Nederlandstalige webapp waarmee kinderen van 4–8 jaar **samen met hun ouder over gezonde voeding leren**. Fluffie is het vaste personage; de appnaam laat ruimte voor latere apps zoals *Fluffie leest*.

Drie activiteiten verbinden een voedingsweetje, een gezamenlijke vraag en een opdracht buiten het scherm. Er zijn twee niveaus: 4–5 en 6–8 jaar. Proeven is vrijwillig. De app gebruikt geen scores, streaks, advertenties, meldingen of eindeloze inhoud.

## Lokaal starten

Gebruik Node.js 22.12 of nieuwer binnen versie 22, of Node.js 24. Voer de opdrachten uit in deze projectmap:

```sh
npm ci
npm run dev
```

Open het lokale adres dat Vite toont. Open `index.html` niet rechtstreeks als bestand. Voor een productiebuild:

```sh
npm run build
npm run preview
```

De gebouwde website staat in `dist/`. React, TypeScript en Vite dienen alleen voor de bouw; de gepubliceerde app heeft geen backend nodig. Relatieve assetpaden ondersteunen een GitHub Pages-projectadres. De ouderomgeving gebruikt `#ouders`, zodat verversen geen serverrouter vereist.

## iPad

Gebruik Safari op een bijgewerkte iPad. Het technische minimumdoel is iPadOS/Safari 15.4: vanaf die versie ondersteunt WebKit de Web Locks API voor afstemming tussen tabbladen. Dit versiedoel is geen bewijs dat iedere oudere iPad al fysiek is getest. Zie [WebKits releasebeschrijving](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/).

- Open de gepubliceerde HTTPS-pagina in Safari, in portret- of landschapsstand.
- Tik op de luisterknop om audio te starten; het eerste geluid vereist een bewuste aanraking.
- Geluid pauzeert wanneer de pagina naar de achtergrond gaat. De app gebruikt geen microfoon of browserstem.
- Controleer vóór de gezinsproef op jullie eigen iPad: alle drie activiteiten, geluid, scherm draaien, Safari verlaten en terugkomen, verversen en de daglimiet.
- Een eerste bezoek en het laden van geluidsbestanden vragen internet. Offline beschikbaarheid is niet gegarandeerd; er is geen serviceworker.

## Spraak

De stem is **Ruth – Kinderboeken stem**, rechtstreeks via ElevenLabs. Opnames worden vóór publicatie gemaakt en als MP3 in `public/audio/` opgenomen. De app zelf benadert ElevenLabs niet en bevat geen API-sleutel. Teksten staan in `audio-scripts.json`; de koppeling tussen schermen en bestanden staat in `src/audio-manifest.json`.

Alle 26 schermopnames zijn gemaakt en lokaal gekoppeld. Ouders hoeven de instructies niet voor te lezen. De buildcontrole controleert dat iedere opname aanwezig is. Verandert een lestekst, werk dan ook het spreekscript en de opname bij. Luister de uiteindelijke Nederlandse uitspraak en instructies na.

## Tijd en privacy

Het budget is maximaal tien minuten **gedeeld door alle kinderen in dezelfde browser**, per lokale kalenderdag. Er zijn geen kinderprofielen. Zichtbare tijd in het kindgedeelte telt mee; alleen de ouderomgeving en de statische afsluiting tellen niet mee. De laatste opdrachtpagina met audio telt wel mee zolang deze zichtbaar is. Overlappende tabbladen delen hetzelfde budget en leveren geen afzonderlijke tien minuten op.

Alleen niveau en functionele dagregistratie worden lokaal opgeslagen. Geen namen, geboortedata, vrije tekst over kinderen, foto's, opnames, accounts of statistiekendiensten. Gegevens worden niet gesynchroniseerd. `Wis lokale gegevens` vraagt bevestiging en verwijdert ook de tijdregistratie.

De tijdgrens is een hulpmiddel, geen apparaatbrede beveiliging. Andere browsers of apparaten, het wissen van gegevens en een veranderde apparaatklok kunnen haar omzeilen. Ontbreekt bruikbare opslag of tabbladafstemming, dan verschijnt een melding en werkt het budget alleen binnen de huidige geopende pagina. Abrupt beëindigen van een browser kan een laatste kleine tijdfractie verliezen. Blijf als ouder betrokken.

Lokale opslag maakt de website niet volledig anoniem: GitHub Pages kan verbindingsgegevens verwerken. Links naar bronnen openen externe websites pas wanneer iemand erop tikt. Een openbaar Pages-adres kan door anderen worden bezocht; een openbare repository maakt ook code en meegeleverde opnames zichtbaar. Voeg nooit gezinsgegevens, sleutels of andere geheimen toe.

## Controleren

```sh
npm test
npm run build
npx playwright install webkit chromium
npm run test:e2e
```

De unit-tests controleren de dagregistratie. De browsertests lopen de activiteiten, ouderbevestiging, opslag, daglimiet en schermformaten door in WebKit en Chromium. WebKit met iPad-instellingen is een nuttige controle, maar vervangt een proef op een echte iPad niet. Alleen de uitvoer van een daadwerkelijk gedraaide test is een testresultaat.

## Publiceren op GitHub Pages

Beoogd project: `DennisvanderSalm/fluffie-eet`. Beoogd adres: `https://dennisvandersalm.github.io/fluffie-eet/`. Dit zijn doeladressen, geen bevestiging dat publicatie al geslaagd is.

De eigenaar heeft expliciet toestemming gegeven voor deze openbare repository en publiek bereikbare website. Er worden geen gezinsgegevens gepubliceerd.

Publicatie en toekomstige updates:

1. Maak de repository aan en zet de inhoud van deze map op de `main`-branch. Laat `node_modules`, tijdelijke testresultaten en geheimen buiten de repository.
2. Kies in GitHub bij **Settings → Pages → Build and deployment → Source** voor **GitHub Actions**.
3. De meegeleverde workflow `.github/workflows/pages.yml` installeert de vaste afhankelijkheden, draait unit-tests, maakt `dist/` en publiceert die map. Een push naar `main` of handmatige workflowstart activeert dit.
4. Wacht op een geslaagde workflow en controleer het werkelijke Pages-adres, inclusief geluidsbestanden en verversen op `#ouders`.

## Gezinsproef en inhoud

Probeer drie weken lang ongeveer twee gezamenlijke momenten per week, zonder verplicht schema. De printbare kaart staat in `public/observatiekaart.html` en is vanuit de ouderomgeving bereikbaar. Noteer op papier wat kind én ouder leerden, of samen doen lukte en of stoppen rustig verliep. De app verzamelt deze observaties niet.

Broncontrole: **8 november 2026**. Zie [SOURCES.md](SOURCES.md) voor leerdoelen, onderbouwing en beperkingen. De app is nog niet beoordeeld door een kinderdiëtist en heeft geen bewezen gezondheidseffect. Controleer bronnen vóór inhoudelijke releases en daarna ieder kwartaal.

Uitgevoerde controles en beperkingen staan in [docs/CONTROLES.md](docs/CONTROLES.md).

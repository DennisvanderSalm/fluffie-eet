# Controle van de eerste gezinsversie

Gecontroleerd op 8 november 2026.

- Productiebuild met TypeScript en Vite geslaagd.
- 8 gerichte tests voor tijdregistratie geslaagd.
- 28 browsertests geslaagd: Chromium en WebKit met iPad-instellingen. Alle drie activiteiten en beide leeftijdsniveaus, verplichte ouderbevestiging, opslagverlies, verversen, meerdere tabbladen, dagwissel, ouderpauze, zichtbaarheid en schermformaten zijn gecontroleerd.
- Lokale MP3-weergave in beide browsers gecontroleerd. Geluid stopt bij navigeren, verbergen en het bereiken van de daglimiet, ook op de laatste opdrachtpagina.
- 26 opnames gemaakt met Ruth – Kinderboeken stem, rechtstreeks in ElevenLabs. Alle bestanden hebben leesbare MP3-informatie en een geldige speelduur. De app verwijst uitsluitend naar meegeleverde bestanden.
- Geen externe verzoeken tijdens de geteste gebruikersroutes. Een productiebeleid blokkeert fetch-, XHR- en WebSocket-verbindingen. Bronlinks worden alleen geopend op verzoek van de ouder; hosting- en audiobestanden moeten wel worden geladen.
- Gerichte scan van appbroncode op gangbare sleutelpatronen, microfoontoegang, netwerkfuncties en onveilige HTML-invoeging: geen treffers. Geen omgevingsbestanden of privégegevens toegevoegd.
- Audiometadata: encoder en C2PA-herkomstinformatie. Geen gevonden persoonsmarker in de gerichte scan. AI-herkomst blijft herkenbaar.
- Afhankelijkhedencontrole gaf nul bekende kwetsbaarheden. Dit is geen garantie tegen toekomstige of onbekende fouten.

Deze tests vervangen geen onafhankelijke beveiligingsaudit, beoordeling door een kinderdiëtist of proef op een echte iPad. Luister tijdens de gezinsproef ook naar uitspraak, tempo en begrijpelijkheid. De app heeft geen bewezen effect op eetgedrag.

De tijdgrens is een praktische browsergrens, geen beveiligde apparaatlimiet. De registratie wordt ongeveer viermaal per seconde bijgewerkt. Abrupt afsluiten en browser- of klokmanipulatie kunnen de registratie beïnvloeden. Persoonsgegevens worden niet gevraagd; niveau en schermtijd blijven lokaal. GitHub kan verbindingsgegevens verwerken.

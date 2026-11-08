export type Level = '4–5' | '6–8';
export type Activity = {
  id: string; title: string; subtitle: string; tag: string; color: string; needs: string; safety: string;
  tip: string; goal: string; evidence: string; sources: number[];
  young: { question: string; choices: string[]; response: string; talk: string; offline: string };
  older: { question: string; choices: string[]; response: string; talk: string; offline: string };
};
export const sources = [
  { title: 'Voedingscentrum · Schijf van Vijf', url: 'https://www.voedingscentrum.nl/schijfvanvijf', note: 'Actuele Nederlandse basis voor variatie en volkorenproducten. Geen individueel voedingsadvies.' },
  { title: 'Voedingscentrum · Mijn kind wil niet eten', url: 'https://www.voedingscentrum.nl/nl/zwanger-en-kind/eetopvoeding/mijn-kind-wil-niet-eten.aspx', note: 'Dwing niet tot eten; houd rekening met stemming en belangstelling.' },
  { title: 'Cochrane · Groente- en fruitinterventies (2024)', url: 'https://www.cochrane.org/evidence/CD008552_what-are-benefits-and-harms-interventions-increase-eating-fruit-and-vegetables-among-children-aged', note: '53 trials bij kinderen tot en met 5 jaar. Voedingspraktijken hebben waarschijnlijk een klein positief effect; alleen oudereducatie weinig tot geen effect. Niet rechtstreeks overdraagbaar naar alle 6–8-jarigen.' },
  { title: 'Pullar e.a. · Ouderlijke voedingspraktijken (2025)', url: 'https://pubmed.ncbi.nlm.nih.gov/40239841/', note: 'Review van prospectief onderzoek bij 1–6-jarigen: structuur en voorbeeldgedrag zijn geassocieerd met consumptie. Geen bewijs dat onze app werkt.' },
  { title: 'Costa Lopes e.a. · Autonomieondersteuning (2026)', url: 'https://pubmed.ncbi.nlm.nih.gov/41317875/', note: 'Kleine positieve verbanden bij 2–12-jarigen. Vooral observationeel onderzoek; een verband bewijst geen oorzaak.' },
  { title: 'Van der Horst e.a. · Kookprogramma’s (2024)', url: 'https://www.jneb.org/article/S1499-4046%2824%2900419-6/pdf', note: 'Kookkennis, vaardigheden en vertrouwen verbeteren vaker dan voedselinname. Programma’s en meetmethoden verschillen sterk.' },
  { title: 'Voedingscentrum · Gevarieerd eten', url: 'https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/gezonde-voeding-en-voedingsstoffen/wat-is-gevarieerd-eten-.aspx', note: 'Verschillende producten leveren verschillende voedingsstoffen. Afwisselen kan binnen en tussen productgroepen; een vertrouwd gerecht kan daar onderdeel van blijven.' },
  { title: 'Voedingscentrum · Vezels', url: 'https://www.voedingscentrum.nl/encyclopedie/vezels.aspx', note: 'Volkorenproducten zijn een bron van vezels. Vezels ondersteunen onder meer de darmfunctie en stoelgang. De app geeft geen hoeveelheden of behandeling.' },
  { title: 'Voedingscentrum · Brood', url: 'https://www.voedingscentrum.nl/encyclopedie/brood.aspx', note: 'Volkorenbrood gebruikt de hele graankorrel. Een donkere kleur bewijst niet dat brood volkoren is: kijk naar de aanduiding op het etiket.' },
];
export const activities: Activity[] = [
  {
    id: 'komkommer', title: 'Komkommer\nonderzoekers', subtitle: 'Een kleine ontdekking met je zintuigen.', tag: 'KIJKEN & VOELEN', color: 'green',
    needs: 'Een gewassen komkommer, een bord en een mes voor de volwassene.',
    safety: 'De volwassene snijdt. Kies bij eventueel proeven een vorm die bij het kind past. Eet zittend en onder toezicht, met het scherm uit. Controleer vooraf allergieën.',
    tip: 'Beschrijf zelf wat je merkt: “Ik voel dat hij nat is. Wat merk jij?” Een kind hoeft niets te proeven.',
    goal: '4–5: een eigenschap benoemen en komkommer herkennen als één van de verschillende soorten eten die je lichaam nodig heeft. 6–8: een voorspelling vergelijken met een waarneming en uitleggen waarom afwisseling helpt. Ouder: variatie en voorbeeldgedrag zonder druk toelichten.',
    evidence: 'De uitleg over variatie volgt het Voedingscentrum. Zintuiglijke ontdekking is hier een ontwerpkeuze. Herhaalde kennismaking en voorbeeldgedrag hebben ondersteuning, maar alleen voelen is niet bewezen gelijkwaardig aan proefinterventies.', sources: [0,1,2,3,4,6],
    young: { question: 'Hoe zou een komkommer vanbinnen voelen?', choices: ['Nat', 'Droog', 'Dat weet ik nog niet'], response: 'Dat is jouw idee. Straks onderzoeken jullie het samen.', talk: 'Vraag elkaar: wat wil jij ontdekken aan de komkommer?', offline: 'Leg het scherm weg. Bekijk samen de komkommer. De volwassene snijdt een stukje af. Voel of ruik als je wilt. Wat merk je? Proeven mag, maar hoeft niet.' },
    older: { question: 'Voelt de binnenkant hetzelfde als de buitenkant, denk je?', choices: ['Hetzelfde', 'Anders', 'Ik weet het nog niet'], response: 'Een voorspelling hoeft niet te kloppen. Je kunt straks zelf vergelijken.', talk: 'Vertel om de beurt: wat verwacht je van de binnenkant? En waarom?', offline: 'Leg het scherm weg. Laat de volwassene de komkommer doorsnijden. Vergelijk samen binnenkant en buitenkant: kleur, geur en gevoel. Was het zoals je dacht? Proeven is vrijwillig.' },
  },
  {
    id: 'groente', title: 'Hallo,\nbekende groente', subtitle: 'Kijk nog eens. Wat ontdek je nu?', tag: 'RUIKEN & VERGELIJKEN', color: 'peach',
    needs: 'Kies samen gewassen komkommer, gewassen paprika of afgekoelde, zacht gekookte wortel. Een bord en een mes voor de volwassene.',
    safety: 'De volwassene verwijdert de zaadlijst van paprika en snijdt alles passend voor het kind. Gebruik voor wortel de zacht gekookte, afgekoelde vorm. Controleer allergieën. Eet zittend onder toezicht; scherm uit.',
    tip: 'Bied ruimte om alleen te kijken. Op een ander moment opnieuw ontdekken mag; er is geen aantal keren dat moet.',
    goal: '4–5: kiezen hoe je onderzoekt en weten dat afwisseling tussen groenten helpt. 6–8: eigenschappen vergelijken en weten dat groenten in voedingsstoffen verschillen. Ouder: opnieuw aanbieden zonder druk en begrijpen dat kennis alleen eetgedrag niet vanzelf verandert.',
    evidence: 'Afwisselen tussen groenten volgt het Voedingscentrum. Herhaald aanbieden kan helpen bij acceptatie, vooral onderzocht bij jonge kinderen. Onze vrije zintuigenkeuze is een pedagogische ontwerpkeuze, geen bewezen behandeling.', sources: [1,2,4,6],
    young: { question: 'Wat wil jij onderzoeken aan jullie groente?', choices: ['De kleur', 'De geur', 'Hoe hij voelt'], response: 'Jij mag kiezen. Alleen kijken is ook ontdekken.', talk: 'Vraag aan de volwassene: wat merk jij aan deze groente?', offline: 'Leg het scherm weg. Pak samen jullie groente. Kijk, ruik of voel zoals jij wilt. Vertel elkaar één ding dat je merkt. Je hoeft niets te eten.' },
    older: { question: 'Wat wil je vandaag vergelijken aan jullie groente?', choices: ['Binnen- en buitenkant', 'Een groot en klein stukje', 'Alleen rustig kijken'], response: 'Je kunt iets bekends opnieuw ontdekken. Een smaak leren kennen kan tijd kosten.', talk: 'Wat is je eerder niet opgevallen aan deze groente? Vertel het aan elkaar.', offline: 'Leg het scherm weg. Laat de volwassene de groente voorbereiden. Vergelijk de stukjes samen. Zien ze er anders uit? Ruiken ze hetzelfde? Je kiest zelf of je ook wilt proeven.' },
  },
  {
    id: 'boterham', title: 'Samen een\nboterham maken', subtitle: 'Kleine handen kunnen ook helpen.', tag: 'SMEREN & SAMENSTELLEN', color: 'yellow',
    needs: 'Volkorenbrood, een vertrouwd smeerbaar beleg, gewassen komkommer en een bord. Bijvoorbeeld hummus of zuivelspread; een passende volkoren cracker kan ook.',
    safety: 'Controleer etiketten: brood kan gluten bevatten, hummus sesam en spread melk. Deze alternatieven zijn niet automatisch allergieveilig. Was handen. De volwassene snijdt; begeleid smeren met een bot smeermes. Eet zittend met het scherm uit.',
    tip: 'Laat het kind één haalbare taak kiezen. Je doet het samen, zonder dat alles op hoeft.',
    goal: '4–5: één keukentaak uitvoeren en weten dat volkorenbrood vezels bevat. 6–8: taakvolgorde bedenken, het woord volkoren herkennen en vertellen wat vezels voor de darmen doen. Ouder: brood kiezen op productinformatie in plaats van alleen kleur.',
    evidence: 'Kookonderzoek ondersteunt vooral vaardigheden en vertrouwen. De uitleg over volkoren, vezels en broodkleur volgt het Voedingscentrum. Deze boterham is een oefening, geen volledig voedingsplan.', sources: [0,1,5,7,8],
    young: { question: 'Waar wil jij mee helpen?', choices: ['Komkommer wassen', 'Samen smeren', 'Op het bord leggen'], response: 'Een kleine taak is ook helpen. De volwassene doet met je mee.', talk: 'Vertel elkaar: wat heb jij nodig voor jouw taak?', offline: 'Leg het scherm weg. Was samen je handen. De volwassene maakt alles veilig klaar. Doe jouw taak en maak samen een boterham. Eten mag als je trek hebt; je hoeft je bord niet leeg te maken.' },
    older: { question: 'Welke taak wil jij op je nemen?', choices: ['Wassen en klaarleggen', 'Samen smeren', 'De boterham samenstellen'], response: 'Brood, beleg en groente zijn verschillende ingrediënten. Samen kun je ermee variëren.', talk: 'Bedenk samen de volgorde: wat doen jullie eerst en wat daarna?', offline: 'Leg het scherm weg en was je handen. Verdeel de taken. De volwassene snijdt en begeleidt. Maak samen de boterham en bekijk de ingrediënten. Eet zittend als je wilt en luister naar wanneer je genoeg hebt.' },
  },
];

import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { activities, sources, type Level } from './content';
import { Fluffie, FoodArt } from './Art';
import { Listen } from './Audio';
import { TimeStore, LIMIT, LEVEL_KEY, TIME_KEY } from './time';
import './style.css';
import { learning } from './learning';

type View = 'home'|'level'|'activities'|'prep'|'discover'|'talk'|'offline'|'closed'|'parents';
const store = new TimeStore();
function initialLevel(): Level {try{return localStorage.getItem(LEVEL_KEY)==='6–8'?'6–8':'4–5';}catch{return '4–5';}}
function App(){
  const [view,setView]=useState<View>(location.hash==='#ouders'?'parents':'home');
  const [level,setLevel]=useState<Level>(initialLevel);
  const [index,setIndex]=useState(0);
  const [choice,setChoice]=useState<number|null>(null);
  const [checked,setChecked]=useState(false);
  const [budget,setBudget]=useState(()=>store.read());
  const [persistent,setPersistent]=useState(store.persistent);
  const [erase,setErase]=useState(false);
  const [message,setMessage]=useState('');
  const heading=useRef<HTMLHeadingElement>(null);
  const activity=activities[index];
  const content=level==='4–5'?activity.young:activity.older;
  const limited=budget.used>=LIMIT;
  const child=!['parents','closed'].includes(view);
  const effective=limited&&view!=='parents'?'closed':view;
  const go=(v:View)=>{setView(v);setMessage('');location.hash=v==='parents'?'ouders':'';};
  useEffect(()=>{const hash=()=>{if(location.hash==='#ouders')setView('parents');};window.addEventListener('hashchange',hash);return()=>window.removeEventListener('hashchange',hash);},[]);
  useEffect(()=>{heading.current?.focus();window.scrollTo(0,0);},[effective,index]);
  useEffect(()=>{
    let previous=Date.now();let visible=!document.hidden;let active=true;
    const update=async()=>{
      const now=Date.now();const start=previous;previous=now;
      const b=child&&visible&&!limited?await store.tick(start,now):store.read(now);
      if(active){setBudget(b);setPersistent(store.persistent);}
    };
    const visibility=()=>{void update();visible=!document.hidden;previous=Date.now();};
    const sync=()=>{setBudget(store.read());};
    const pagehide=()=>{void update();visible=false;};
    const pageshow=()=>{previous=Date.now();visible=!document.hidden;sync();};
    const interval=window.setInterval(()=>void update(),250);
    document.addEventListener('visibilitychange',visibility);window.addEventListener('storage',sync);window.addEventListener('pagehide',pagehide);window.addEventListener('pageshow',pageshow);
    return()=>{void update();active=false;clearInterval(interval);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('storage',sync);window.removeEventListener('pagehide',pagehide);window.removeEventListener('pageshow',pageshow);};
  },[child,limited]);
  const chooseLevel=(v:Level)=>{setLevel(v);try{localStorage.setItem(LEVEL_KEY,v);}catch{setPersistent(false);}};
  const title=(text:string)=><h1 ref={heading} tabIndex={-1}>{text}</h1>;
  const audioId=['discover','talk','offline'].includes(effective)?`${activity.id}-${level==='4–5'?'young':'older'}-${effective}`:effective==='prep'?`${activity.id}-prep`:effective;
  return <div className="app"><a className="skip" href="#main">Naar inhoud</a>
    <header><button className="brand" onClick={()=>go(limited?'closed':'home')} aria-label="Fluffie eet, start"><span className="brand-leaf">❧</span>Fluffie <em>eet</em><span className="brand-dot">.</span></button><button className="parent-link" onClick={()=>go('parents')}><span aria-hidden="true">☼</span> Voor ouders</button></header>
    <main id="main">
      {!persistent&&<aside className="storage-warning" role="status">Deze browser bewaart de schermtijd niet betrouwbaar. De limiet werkt nu alleen zolang deze pagina open blijft. Houd samen de tijd bij.</aside>}
      {effective==='home'&&<>
        <section className="hero"><div className="hero-copy"><p className="eyebrow">KLEINE ONTDEKKINGEN, SAMEN AAN TAFEL</p>{title('Grote nieuwsgierigheid.\nKleine hapjes avontuur.')}<p className="intro">Kijken, ruiken, voelen en samen iets maken.<br/>Leer samen over gezonde voeding met Fluffie.</p><div className="hero-actions"><button className="primary" onClick={()=>go('level')}>Samen ontdekken <span aria-hidden="true">↗</span></button><span className="soft-label">Voor kinderen van 4–8 jaar</span></div><Listen key="home" id="home"/></div><div className="hero-art"><span className="hello">Hoi, ik ben Fluffie!</span><Fluffie/><span className="art-note">Jouw nieuwsgierige tafelvriendje</span></div></section>
        <div className="principles"><span>◷ Een kort schermmoment</span><span>♧ Samen met een volwassene</span><span>♡ Proeven mag. Niets moet.</span></div>
        <section className="preview"><div><p className="eyebrow">DAARNA GAAT HET SCHERM UIT</p><h2>Het echte ontdekken<br/>doen jullie samen.</h2></div><p>Een weetje over gezonde voeding. Een vraag voor jullie allebei. En een kleine opdracht om wat je leert samen in de keuken te ontdekken.</p></section>
      </>}
      {effective==='level'&&<section className="center-panel"><Fluffie small/><p className="eyebrow">ELK KIND ONTDEKT OP ZIJN EIGEN MANIER</p>{title('Wat past bij jullie?')}<p>Kies samen een niveau. Je kunt dit later veranderen.</p><div className="level-options">{(['4–5','6–8'] as Level[]).map(l=><button key={l} className={level===l?'level selected':'level'} aria-pressed={level===l} onClick={()=>chooseLevel(l)}><strong>{l} jaar</strong><span>{l==='4–5'?'Kijken, aanwijzen en ontdekken':'Voorspellen, vergelijken en vertellen'}</span></button>)}</div><Listen key="level" id="level"/><button className="primary" onClick={()=>go('activities')}>Naar de ontdekkingen <span aria-hidden="true">→</span></button></section>}
      {effective==='activities'&&<section className="activity-list"><div className="section-top"><div><p className="eyebrow">EEN KLEIN MOMENT VOOR JULLIE TWEE</p>{title('Wat ontdekken jullie vandaag?')}<p>Kies er samen eentje. Daarna gaan jullie zelf aan de slag.</p></div><button className="quiet" onClick={()=>go('level')}>{level} jaar · wijzig</button></div><Listen key="activities" id="activities"/><div className="cards">{activities.map((a,i)=><button key={a.id} className={`activity-card ${a.color}`} onClick={()=>{setIndex(i);setChecked(false);setChoice(null);go('prep');}}><FoodArt kind={a.id}/><div className="card-copy"><span className="eyebrow">{a.tag}</span><h2>{a.title}</h2><p>{a.subtitle}</p><span className="card-bottom">Samen · ongeveer 4–6 minuten <span aria-hidden="true">↗</span></span></div></button>)}</div><div className="gentle-note"><Fluffie small/><p>Je hoeft niets lekker te vinden.<br/><strong>Nieuwsgierig zijn is genoeg.</strong></p></div></section>}
      {effective==='prep'&&<section className="prep-layout"><div className={`prep-art ${activity.color}`}><FoodArt kind={activity.id}/><p className="eyebrow">SAMEN VOORBEREIDEN</p>{title(activity.title.replace('\n',' '))}<p>Een volwassene doet de hele activiteit mee.</p></div><div className="prep-copy"><h2>Leg samen klaar</h2><p>{activity.needs}</p><h2>Fijn en veilig ontdekken</h2><p>{activity.safety}</p><div className="tip"><strong>Een tip voor de volwassene</strong><p>{activity.tip}</p></div><Listen key={audioId} id={audioId}/><label className="check"><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/><span>Ik ben de volwassene, doe mee en heb de voorbereiding gecontroleerd.</span></label><button className="primary" disabled={!checked} onClick={()=>go('discover')}>We zijn er samen klaar voor →</button><button className="quiet" onClick={()=>go('activities')}>Terug naar de ontdekkingen</button></div></section>}
      {effective==='discover'&&<section className="discovery"><p className="eyebrow">{activity.tag}</p><div className={`mini-art ${activity.color}`}><FoodArt kind={activity.id}/></div>{title(content.question)}<Listen key={audioId} id={audioId}/><div className="choices">{content.choices.map((c,i)=><button key={c} aria-pressed={choice===i} className={choice===i?'choice selected':'choice'} onClick={()=>setChoice(i)}><span className="choice-number">{i+1}</span>{c}</button>)}</div>{choice!==null&&<div className="response" role="status">{content.response}</div>}<button className="primary" onClick={()=>go('talk')}>Samen verder praten →</button><button className="quiet" onClick={()=>go('closed')}>We stoppen voor nu</button></section>}
      {effective==='talk'&&<section className="center-panel"><Fluffie small/><p className="eyebrow">DIT LEREN JULLIE SAMEN</p>{title('Een weetje voor aan tafel.')}<p className="big-question">{level==='4–5'?learning[index].young:learning[index].older}</p><Listen key={audioId} id={audioId}/><div className="tip"><strong>Bespreek het samen</strong><p>{learning[index].talk}</p></div><details><summary>Voor de ouder: waarom dit helpt</summary><p>{learning[index].parent}</p></details><button className="primary" onClick={()=>go('offline')}>Naar onze opdracht zonder scherm →</button><button className="quiet" onClick={()=>go('closed')}>We stoppen voor nu</button></section>}
      {effective==='offline'&&<section className="center-panel end"><Fluffie/><p className="eyebrow">NU BEGINT HET ECHTE ONTDEKKEN</p>{title('Scherm uit.\nSamen verder.')}<p className="big-question">{content.offline}</p><Listen key={audioId} id={audioId}/><p className="end-note">Jullie hoeven niets af te vinken of terug te komen.<br/>Veel plezier samen!</p></section>}
      {effective==='closed'&&<section className="center-panel end"><Fluffie/><p className="eyebrow">EEN RUSTIG EINDE</p>{title('Voor nu is het genoeg.')}<p className="big-question">Het scherm mag uit. Er is buiten de app nog van alles te ontdekken. Je hoeft niets af te maken.</p>{!limited&&<Listen key="closed" id="closed"/>}<p>{limited?'De tien minuten voor vandaag zijn voorbij.':'Fijn dat jullie samen iets hebben ontdekt.'}</p></section>}
      {effective==='parents'&&<section className="parents"><p className="eyebrow">VOOR OUDERS & VERZORGERS</p>{title('Samen ontdekken,\nzonder haast.')}<p className="intro">Fluffie geeft het zetje. Jullie maken het moment.</p><Listen key="parents" id="parents"/><div className="parent-grid"><article><h2>Een klein begin</h2><p>Probeer drie weken lang ongeveer twee momenten per week. Herhalen mag. Overslaan ook. Nieuwsgierigheid en samenzijn zijn het doel; een leeg bord niet.</p><p>Kies 4–5 jaar voor concrete vragen, of 6–8 jaar om meer te vergelijken. Iedere activiteit vraagt een volwassene die echt meedoet.</p><a className="text-link" href="./observatiekaart.html" target="_blank" rel="noreferrer">Open de printbare observatiekaart ↗</a></article><article><h2>De tijd op deze browser</h2><p><strong>{Math.floor(budget.used/60000)} minuten gebruikt vandaag</strong> · maximaal 10 minuten, gedeeld door alle kinderen en tabbladen in deze browser.</p><p>De ouderomgeving telt niet mee. De app pauzeert als hij niet zichtbaar is. Een nieuw apparaat of gewiste browsergegevens kan de limiet omzeilen; dit is geen apparaatbrede oudercontrole.</p><button className="quiet" onClick={()=>go(limited?'closed':'level')}>Naar het kindgedeelte →</button></article><article><h2>Alleen op dit apparaat</h2><p>We bewaren uitsluitend het niveau en de dagelijkse schermtijd. Geen accounts, namen, foto’s, microfoon, advertenties, tracking of externe AI-verzoeken.</p><p>De website en geluidsbestanden worden via GitHub Pages geladen. De hosting kan verbindingsgegevens verwerken. Het adres is openbaar; lokale opslag betekent niet volledige anonimiteit. Er is geen synchronisatie of gegarandeerde offline beschikbaarheid.</p><button className="quiet danger" onClick={()=>setErase(true)}>Wis lokale gegevens</button>{erase&&<div className="erase" role="group" aria-label="Gegevens wissen bevestigen"><p>Dit wist het niveau én de tijdregistratie op deze browser. Er komt geen reservekopie.</p><button onClick={async()=>{await store.clear();setBudget(store.read());setLevel('4–5');setErase(false);setMessage('De lokale gegevens zijn gewist.');}}>Ja, wis de gegevens</button><button onClick={()=>setErase(false)}>Annuleren</button></div>}<p role="status">{message}</p></article><article><h2>Een fijne manier van helpen</h2><p>Beschrijf wat je zelf merkt, geef ruimte om te kiezen en laat proeven vrijwillig. Respecteer gevoeligheid voor geur en structuur. Bij zorgen over eten of groei: vraag advies aan een passende zorgverlener.</p><p>Fluffie is een getekend personage, geen chatvriend. De stem is vooraf opgenomen met AI. Er worden geen gesprekken gevoerd of opnames gemaakt.</p></article></div><section className="science"><h2>Waar de inhoud op steunt</h2><p>Broncontrole: 8 november 2026. Deze gezinsproef is geen bewezen gezondheidsinterventie en is nog niet beoordeeld door een kinderdiëtist. De tienminutengrens en leeftijdsniveaus zijn ontwerpkeuzes.</p><div className="source-list">{sources.map(s=><article key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a><p>{s.note}</p></article>)}</div>{activities.map(a=><details key={a.id}><summary>{a.title.replace('\n',' ')} · leerdoel en bewijs</summary><p>{a.goal}</p><p>{a.evidence}</p><p>Bronnen: {a.sources.map(i=>sources[i].title).join('; ')}. Gecontroleerd op 8 november 2026.</p></details>)}<p>Onderhoud: vóór inhoudelijke releases en vervolgens ieder kwartaal opnieuw controleren. Nieuwe bevindingen wegen we naast bestaand bewijs.</p></section></section>}
    </main><footer><span>Fluffie eet <span aria-hidden="true">·</span> Samen is ontdekken fijner.</span><span>Geen haast. Geen scores. Gewoon samen.</span></footer></div>;
}
createRoot(document.getElementById('root')!).render(<App/>);

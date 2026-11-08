import { useEffect, useRef, useState } from 'react';
import manifest from './audio-manifest.json';
const files: Record<string,string> = manifest;
export function Listen({ id }: { id: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing,setPlaying] = useState(false);
  const [failed,setFailed] = useState(false);
  useEffect(()=>{
    const element=ref.current;
    const stop=()=>{ element?.pause(); setPlaying(false); };
    const visibility=()=>{ if(document.hidden) stop(); };
    document.addEventListener('visibilitychange',visibility);
    window.addEventListener('pagehide',stop);
    return ()=>{stop();document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',stop);};
  },[]);
  if(!files[id]) return <p className="audio-pending">De stem van Fluffie wordt voorbereid.</p>;
  return <div className="listen"><audio ref={ref} src={`${import.meta.env.BASE_URL}${files[id]}`} preload="none" onEnded={()=>setPlaying(false)} onError={()=>setFailed(true)}/><button className="audio-button" onClick={async()=>{if(playing){ref.current?.pause();setPlaying(false);}else{try{await ref.current?.play();setPlaying(true);setFailed(false);}catch{setFailed(true);}}}} aria-label={playing?'Uitleg pauzeren':'Luister naar Fluffie'}>{playing?'Ⅱ Pauzeer':'◖ Luister naar Fluffie'}</button>{failed&&<p role="status">Het geluid kon niet laden. Controleer de verbinding en probeer opnieuw.</p>}</div>;
}

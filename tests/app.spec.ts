import { test, expect } from '@playwright/test';
async function list(page:any,level='4–5') {await page.goto('./');await page.getByRole('button',{name:'Samen ontdekken'}).click();await page.getByRole('button',{name:new RegExp(level+' jaar')}).click();await page.getByRole('button',{name:'Naar de ontdekkingen'}).click();}
for(const level of ['4–5','6–8']) for(const name of ['Komkommer','Hallo,','Samen een']) test(`${level}: ${name}, volledige route`,async({page})=>{
 await list(page,level);await page.getByRole('button',{name:new RegExp(name)}).click();
 await expect(page.getByRole('button',{name:'We zijn er samen klaar voor'})).toBeDisabled();
 await page.getByRole('checkbox').check();await page.getByRole('button',{name:'We zijn er samen klaar voor'}).click();
 await page.locator('.choice').first().click();await expect(page.getByRole('status')).toContainText(/idee|kiezen|helpen|voorspelling|ontdekken|ingrediënten/);
 await page.getByRole('button',{name:'Samen verder praten'}).click();await expect(page.getByRole('heading',{name:'Een weetje voor aan tafel.'})).toBeVisible();
 await page.getByRole('button',{name:'Naar onze opdracht zonder scherm'}).click();await expect(page.getByRole('heading',{name:/Scherm uit/})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test('daglimiet overleeft heropenen; oudergedeelte bereikbaar',async({page})=>{
 await page.goto('./');await page.evaluate(()=>{const d=new Date();localStorage.setItem('sat:time:v1',JSON.stringify({day:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,used:600000,end:Date.now()}));});
 await page.reload();await expect(page.getByRole('heading',{name:'Voor nu is het genoeg.'})).toBeVisible();await page.getByRole('button',{name:'Voor ouders'}).click();await expect(page.getByRole('heading',{name:/Samen ontdekken/})).toBeVisible();await page.getByRole('button',{name:'Wis lokale gegevens',exact:true}).click();await page.getByRole('button',{name:'Ja, wis de gegevens'}).click();await expect(page.getByRole('status')).toHaveText('De lokale gegevens zijn gewist.');
});
test('twee tabbladen delen één daglimiet',async({page,context})=>{
 await page.goto('./');const other=await context.newPage();await other.goto('./');
 await expect.poll(()=>page.evaluate(()=>localStorage.getItem('sat:time:v1'))).not.toBeNull();
 await page.evaluate(()=>{const b=JSON.parse(localStorage.getItem('sat:time:v1')!);b.used=599800;localStorage.setItem('sat:time:v1',JSON.stringify(b));});
 await expect(page.getByRole('heading',{name:'Voor nu is het genoeg.'})).toBeVisible();await expect(other.getByRole('heading',{name:'Voor nu is het genoeg.'})).toBeVisible();
});
test('zichtbaarheid en ouderomgeving pauzeren de tijd',async({page})=>{
 await page.goto('./');await expect.poll(()=>page.evaluate(()=>localStorage.getItem('sat:time:v1'))).not.toBeNull();
 await page.waitForTimeout(2000);await page.evaluate(()=>navigator.locks.request('sat:budget',()=>{}));
 const first=await page.evaluate(()=>JSON.parse(localStorage.getItem('sat:time:v1')!).used);
 expect(first).toBeGreaterThanOrEqual(1750);expect(first).toBeLessThan(4000);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 await page.evaluate(()=>navigator.locks.request('sat:budget',()=>{}));
 const hiddenTime=await page.evaluate(()=>JSON.parse(localStorage.getItem('sat:time:v1')!).used);
 expect(hiddenTime-first).toBeLessThan(300);
 await page.waitForTimeout(2000);await page.evaluate(()=>navigator.locks.request('sat:budget',()=>{}));
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('sat:time:v1')!).used)).toBe(hiddenTime);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
 await page.waitForTimeout(1000);await page.evaluate(()=>navigator.locks.request('sat:budget',()=>{}));
 const resumed=await page.evaluate(()=>JSON.parse(localStorage.getItem('sat:time:v1')!).used);
 expect(resumed-hiddenTime).toBeGreaterThan(700);expect(resumed-hiddenTime).toBeLessThan(1300);
 await page.getByRole('button',{name:'Voor ouders'}).click();await page.waitForTimeout(500);
 const parentTime=await page.evaluate(()=>JSON.parse(localStorage.getItem('sat:time:v1')!).used);
 await page.waitForTimeout(1500);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('sat:time:v1')!).used)).toBe(parentTime);
});
test('vorige dag blokkeert de nieuwe kalenderdag niet',async({page})=>{
 await page.goto('./#ouders');await page.evaluate(()=>{const d=new Date();d.setDate(d.getDate()-1);localStorage.setItem('sat:time:v1',JSON.stringify({day:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,used:600000,end:d.getTime()}));});
 await page.goto('./');await expect(page.getByRole('button',{name:'Samen ontdekken'})).toBeVisible();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('sat:time:v1')!).used)).toBeLessThan(10000);
});
test('zonder opslag blijft de app bruikbaar met eerlijke melding',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Blocked');}});});await list(page);await expect(page.getByRole('status')).toContainText('bewaart de schermtijd niet betrouwbaar');await expect(page.locator('.activity-card')).toHaveCount(3);
});
test('geen externe verzoeken en bruikbaar in beide oriëntaties',async({page},testInfo)=>{
 const remote:string[]=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4187/'))remote.push(r.url());});
 await page.setViewportSize({width:768,height:1024});await page.goto('./');
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
 await page.screenshot({path:`docs/${testInfo.project.name}-home-portrait.png`,fullPage:true});
 await list(page);await page.setViewportSize({width:1024,height:768});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await page.screenshot({path:`docs/${testInfo.project.name}-overview-landscape.png`,fullPage:true});await page.setViewportSize({width:768,height:1024});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await page.screenshot({path:`docs/${testInfo.project.name}-overview-portrait.png`,fullPage:true});expect(remote).toEqual([]);
});
test('Ruth speelt lokaal en pauzeert bij verbergen en navigeren',async({page})=>{
 const requests:string[]=[];
 page.on('request',r=>requests.push(r.url()));
 await page.goto('./');
 await page.getByRole('button',{name:'Luister naar Fluffie',exact:true}).click();
 await expect(page.getByRole('button',{name:'Uitleg pauzeren'})).toBeVisible();
 await expect.poll(()=>page.locator('audio').evaluate((a:HTMLAudioElement)=>a.currentTime)).toBeGreaterThan(0);
 await expect.poll(()=>page.locator('audio').evaluate((a:HTMLAudioElement)=>a.duration)).toBeGreaterThan(1);
 expect(await page.locator('audio').evaluate((a:HTMLAudioElement)=>a.currentSrc)).toBe('http://127.0.0.1:4187/fluffie-eet/audio/home.mp3');
 expect(requests.every(url=>url.startsWith('http://127.0.0.1:4187/'))).toBeTruthy();
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 await expect(page.getByRole('button',{name:'Luister naar Fluffie',exact:true})).toBeVisible();
 expect(await page.locator('audio').evaluate((a:HTMLAudioElement)=>a.paused)).toBeTruthy();
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
 await page.getByRole('button',{name:'Luister naar Fluffie',exact:true}).click();
 await page.evaluate(()=>{(window as any).previousAudio=document.querySelector('audio');});
 await page.getByRole('button',{name:'Samen ontdekken'}).click();
 expect(await page.evaluate(()=>(window as any).previousAudio.paused)).toBeTruthy();
});

test('limiet stopt ook audio op de laatste opdrachtpagina',async({page})=>{
 await list(page);await page.getByRole('button',{name:/Komkommer/}).click();await page.getByRole('checkbox').check();await page.getByRole('button',{name:'We zijn er samen klaar voor'}).click();await page.getByRole('button',{name:'Samen verder praten'}).click();await page.getByRole('button',{name:'Naar onze opdracht zonder scherm'}).click();
 await page.getByRole('button',{name:'Luister naar Fluffie',exact:true}).click();
 await page.evaluate(()=>{(window as any).previousAudio=document.querySelector('audio');const b=JSON.parse(localStorage.getItem('sat:time:v1')!);b.used=599900;localStorage.setItem('sat:time:v1',JSON.stringify(b));});
 await expect(page.getByRole('heading',{name:'Voor nu is het genoeg.'})).toBeVisible();
 expect(await page.evaluate(()=>(window as any).previousAudio.paused)).toBeTruthy();
 await expect(page.locator('audio')).toHaveCount(0);
});

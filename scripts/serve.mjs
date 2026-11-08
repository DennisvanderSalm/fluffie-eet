import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root=resolve('dist');
http.createServer(async(req,res)=>{
  let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(path.startsWith('/fluffie-eet/'))path=path.slice('/fluffie-eet'.length);
  if(path==='/')path='/index.html';
  const file=resolve(root,'.'+path);
  if(!file.startsWith(root+'/')&&!file.startsWith(root+'\\')){res.writeHead(403);res.end();return;}
  try{const bytes=await readFile(file);const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.mp3':'audio/mpeg','.json':'application/json'};res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end('Niet gevonden');}
}).listen(Number(process.env.PORT || 4187),'127.0.0.1');

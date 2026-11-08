export function Fluffie({ small = false }: { small?: boolean }) {
  return <svg className={small?'fluffie small':'fluffie'} viewBox="0 0 300 300" role="img" aria-label="Fluffie, een zacht rond tafelvriendje met een groen blaadje">
    <ellipse cx="150" cy="266" rx="75" ry="13" fill="#294a3520"/>
    <path d="M90 233Q69 250 84 261Q103 270 121 247M183 245Q200 270 218 258Q231 246 210 231" fill="#d3ae88" stroke="#644e3c" strokeWidth="3"/>
    <path d="M64 173Q31 171 40 198Q47 216 69 203M236 172Q267 150 271 174Q270 192 238 203" fill="#f0dfc1" stroke="#644e3c" strokeWidth="3"/>
    <path d="M74 108Q47 83 71 65Q85 50 105 60Q110 31 139 43Q162 22 180 44Q211 34 220 63Q253 64 245 98Q272 119 253 144Q273 175 252 193Q263 223 230 233Q220 263 193 253Q167 276 145 258Q117 274 100 252Q64 256 62 225Q30 213 48 184Q28 159 49 140Q38 114 74 108Z" fill="#f5e7ce" stroke="#644e3c" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M148 46Q137 7 176 11Q184 39 148 46" fill="#62855e"/><path d="M150 44L169 20" stroke="#35583d" strokeWidth="3" fill="none"/>
    <ellipse cx="110" cy="157" rx="15" ry="9" fill="#e8b6a0"/><ellipse cx="202" cy="157" rx="15" ry="9" fill="#e8b6a0"/>
    <ellipse cx="121" cy="142" rx="5" ry="7" fill="#493e31"/><ellipse cx="189" cy="142" rx="5" ry="7" fill="#493e31"/>
    <path d="M141 160Q155 175 169 160" fill="none" stroke="#493e31" strokeWidth="4" strokeLinecap="round"/>
    <path d="M125 211Q153 225 182 211" fill="none" stroke="#dec9a7" strokeWidth="3" strokeLinecap="round"/>
  </svg>;
}
export function FoodArt({ kind }: { kind: string }) {
  return <svg className="food-art" viewBox="0 0 380 220" aria-hidden="true">
    <ellipse cx="190" cy="179" rx="128" ry="18" fill="#25402e10"/>
    {kind==='komkommer'?<g transform="rotate(-18 180 110)"><rect x="64" y="70" width="230" height="75" rx="38" fill="#537955"/><path d="M100 89H257M98 126H255" stroke="#8baa6e" strokeWidth="5" strokeLinecap="round"/><ellipse cx="290" cy="108" rx="32" ry="38" fill="#b8d094" stroke="#436e48" strokeWidth="7"/><ellipse cx="290" cy="108" rx="17" ry="26" fill="#e4e7b9"/>{[90,108,126].map(y=><g key={y}><ellipse cx="285" cy={y} rx="2" ry="4" fill="#9db77d"/><ellipse cx="295" cy={y} rx="2" ry="4" fill="#9db77d"/></g>)}</g>:kind==='groente'?<g><path d="M120 67Q61 55 66 121Q69 181 113 177Q158 188 169 136Q189 79 142 68" fill="#c9694e"/><path d="M115 78Q135 50 126 34" stroke="#567953" strokeWidth="12" fill="none" strokeLinecap="round"/><path d="M109 97Q90 131 110 158" stroke="#e69976" strokeWidth="6" fill="none" strokeLinecap="round"/><path d="M230 74Q208 54 193 84L245 185Q252 201 258 180L284 82Q269 58 250 74" fill="#df9c52"/><path d="M242 74Q215 29 232 33M250 70Q270 29 278 38" stroke="#62855e" strokeWidth="10" fill="none" strokeLinecap="round"/><path d="M224 103L244 107M242 135L260 138" stroke="#bd7d3d" strokeWidth="4" strokeLinecap="round"/></g>:<g><path d="M97 90Q76 57 107 43Q169 14 236 42Q274 55 253 91L253 169Q253 184 237 184H112Q95 184 96 168Z" fill="#bc8751"/><path d="M112 91Q91 64 121 56Q178 34 227 56Q254 64 237 92V166H112Z" fill="#ecd1a0"/><path d="M127 92Q177 67 222 94L220 151Q178 169 126 148Z" fill="#f6e7c6"/>{[148,193].map((x,i)=><g key={x}><ellipse cx={x} cy={112+i*23} rx="27" ry="22" fill="#5f8959"/><ellipse cx={x} cy={112+i*23} rx="21" ry="17" fill="#c4d79c"/><path d={`M${x-5} ${108+i*23}l10 8m-10 0l10-8`} stroke="#8ba56e" strokeWidth="3"/></g>)}</g>}
  </svg>;
}

export const LIMIT = 600_000;
export const TIME_KEY = 'sat:time:v1';
export const LEVEL_KEY = 'sat:level:v1';
export type Budget = { day: string; used: number; end: number };
export function dayKey(now: number) {
  const d = new Date(now);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
export function readBudget(raw: string | null, now: number): Budget {
  const empty = { day: dayKey(now), used: 0, end: 0 };
  try {
    const b = JSON.parse(raw || 'null');
    if (b?.day !== empty.day || !Number.isFinite(b.used) || !Number.isFinite(b.end) || b.used < 0 || b.end < 0) return empty;
    return { day: b.day, used: Math.min(LIMIT,b.used), end: b.end };
  } catch { return empty; }
}
// Serial transactions merge overlapping visible intervals: two visible tabs share one budget.
export function charge(b: Budget, start: number, end: number): Budget {
  const current = readBudget(JSON.stringify(b), end);
  const midnight = new Date(end); midnight.setHours(0,0,0,0);
  const from = Math.max(start, midnight.getTime(), current.end);
  return { day: current.day, used: Math.min(LIMIT,current.used + Math.max(0,end-from)), end: Math.max(current.end,end) };
}

export class TimeStore {
  private memory: string | null = null;
  persistent = true;
  constructor() {
    try { localStorage.setItem('sat:probe','1'); localStorage.removeItem('sat:probe'); }
    catch { this.persistent = false; }
    if (!navigator.locks) this.persistent = false;
  }
  read(now = Date.now()) {
    try { return readBudget(this.persistent ? localStorage.getItem(TIME_KEY) : this.memory,now); }
    catch { this.persistent = false; return readBudget(this.memory,now); }
  }
  private write(b: Budget) {
    this.memory = JSON.stringify(b);
    if (this.persistent) { try { localStorage.setItem(TIME_KEY,this.memory); } catch { this.persistent = false; } }
    return b;
  }
  async tick(start: number, end: number) {
    const update = () => this.write(charge(this.read(end),start,end));
    return navigator.locks ? navigator.locks.request('sat:budget',update) : update();
  }
  async clear() {
    const reset = () => {
      this.memory = null;
      try { localStorage.removeItem(TIME_KEY); localStorage.removeItem(LEVEL_KEY); } catch { /* memory-only */ }
    };
    if (navigator.locks) await navigator.locks.request('sat:budget',reset); else reset();
  }
}

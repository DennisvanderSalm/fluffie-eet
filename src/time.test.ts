import { describe, it, expect } from 'vitest';
import { charge, readBudget, LIMIT } from './time';
const noon = new Date(2026,10,8,12).getTime();
describe('gedeelde dagelijkse schermtijd',()=>{
  it('houdt tijd vast bij heropenen',()=>{const b=charge(readBudget(null,noon),noon,noon+1500);expect(readBudget(JSON.stringify(b),noon+2000).used).toBe(1500);});
  it('telt overlappende tabbladen één keer',()=>{let b=charge(readBudget(null,noon),noon,noon+1000);b=charge(b,noon+500,noon+1500);expect(b.used).toBe(1500);});
  it('telt verborgen tijd en ouderpauzes niet mee',()=>{let b=charge(readBudget(null,noon),noon,noon+1000);b=charge(b,noon+100000,noon+101000);expect(b.used).toBe(2000);});
  it('stopt bij tien minuten',()=>{expect(charge(readBudget(null,noon),noon,noon+LIMIT+5000).used).toBe(LIMIT);});
  it('begint opnieuw op een lokale kalenderdag',()=>{const b=charge(readBudget(null,noon),noon,noon+1000);expect(readBudget(JSON.stringify(b),noon+86400000).used).toBe(0);});
  it('telt alleen het nieuwe dagdeel bij middernacht',()=>{const end=new Date(2026,10,9,0,0,1).getTime();expect(charge(readBudget(null,end-2000),end-2000,end).used).toBe(1000);});
  it('herstelt ontbrekende, corrupte of ongeldige opslag',()=>{for(const raw of [null,'{','{"day":"2026-11-08","used":-3,"end":1}']) expect(readBudget(raw,noon).used).toBe(0);});
  it('negatieve klokverschuiving trekt geen tijd af',()=>{const b=charge(readBudget(null,noon),noon,noon+1000);expect(charge(b,noon+1000,noon).used).toBe(1000);});
});

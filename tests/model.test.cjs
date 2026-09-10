'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');
const {Simulator,levelToSymbol,symbolToLevel}=require('../js/simulator.js');
const finish=s=>{let n=0;while(!s.done){s.advance();if(n++>100)throw Error('Sequence failed to terminate');}};
const byte=s=>s.rowValues().reduce((a,b)=>a*2+b,0);
for(const type of ['SRAM','DRAM','HBM','HBF','NAND']){
 test(`${type}: read sequence terminates and returns selected row`,()=>{let s=new Simulator(type);let before=JSON.stringify(s.mem.cells);finish(s);assert.deepEqual(s.mem.output,s.rowValues());assert.equal(JSON.stringify(s.mem.cells),before);});
 test(`${type}: writes affect only selected row and bank`,()=>{let s=new Simulator(type),b=s.bank,r=s.row,old=JSON.parse(JSON.stringify(s.mem.cells));s.targetHex=type==='HBF'?'AB1234':'5A';assert.equal(s.setOperation('write').ok,true);finish(s);assert.deepEqual(s.mem.output,s.targetSymbols());for(let bi=0;bi<old.length;bi++)for(let ri=0;ri<8;ri++)if(bi!==b||ri!==r)assert.deepEqual(s.mem.cells[bi][ri],old[bi][ri]);});
 test(`${type}: previous step deterministically replays`,()=>{let s=new Simulator(type);s.targetHex=type==='HBF'?'ABCDEF':'34';s.setOperation('write');finish(s);let final=JSON.stringify(s.mem);s.seek(0);assert.notEqual(JSON.stringify(s.mem),final);s.seek(s.steps.length-1);assert.equal(JSON.stringify(s.mem),final);});
}
for(const type of ['SRAM','DRAM','HBM']){
 test(`${type}: power loss invalidates data; power-on does not resurrect it`,()=>{let s=new Simulator(type);finish(s);s.power(false);assert.equal(s.activeValue,null);s.power(true);assert.equal(s.activeValue,null);s.targetHex='AA';s.setOperation('write');finish(s);assert.equal(byte(s),170);});
}
for(const type of ['NAND','HBF']){
 test(`${type}: page cannot be arbitrarily rewritten`,()=>{let s=new Simulator(type);s.targetHex='00';s.setOperation('write');finish(s);assert.equal(s.setOperation('write').ok,false);});
 test(`${type}: block erase clears every page but not other blocks`,()=>{let s=new Simulator(type);s.targetHex='01';s.setOperation('write');finish(s);s.address(s.bank,1,0);s.targetHex='02';s.setOperation('write');finish(s);s.setOperation('erase');finish(s);assert.ok(s.mem.cells[0].every(r=>r.every(v=>v===0)));assert.equal(s.mem.eraseCount[0],1);assert.ok(s.mem.programmed[0].every(v=>!v));});
 test(`${type}: power cycle retains charge state`,()=>{let s=new Simulator(type);s.targetHex='00';s.setOperation('write');finish(s);let before=JSON.stringify(s.mem.cells);s.power(false);s.power(true);assert.equal(JSON.stringify(s.mem.cells),before);});
}
test('All illustrative Gray mappings are bijective and erased state decodes to ones',()=>{for(let b=1;b<=4;b++){assert.equal(levelToSymbol(0,b),(1<<b)-1);for(let n=0;n<1<<b;n++)assert.equal(symbolToLevel(levelToSymbol(n,b),b),n);}});
test('DRAM charge sharing follows charge conservation for 1 and 0',()=>{for(let c=0;c<8;c++){let s=new Simulator('DRAM');s.address(0,3,c);let v=s.activeValue;s.seek(2);assert.ok(Math.abs(s.signals().bl-(.1*v+.5)/1.1)<1e-12);}});
test('DRAM row hit omits activation after completed read',()=>{let s=new Simulator('DRAM');finish(s);s.setOperation('read');assert.equal(s.steps[0].code,'ROW HIT');assert.equal(s.steps.length,2);});
test('DRAM row change cannot use stale row buffer',()=>{let s=new Simulator('DRAM');finish(s);s.address(0,4,0);assert.equal(s.steps[0].code,'PRECHARGE');});
test('DRAM refresh-off loses margins while refresh-on retains values',()=>{let s=new Simulator('DRAM');s.mem.refreshEnabled=false;s.base=JSON.parse(JSON.stringify(s.mem));s.age(120);assert.equal(s.activeValue,null);s.reset();let before=JSON.stringify(s.mem.cells);s.age(1000);assert.equal(JSON.stringify(s.mem.cells),before);});
test('Refresh cannot recover information already invalidated',()=>{let s=new Simulator('DRAM');s.mem.refreshEnabled=false;s.base=JSON.parse(JSON.stringify(s.mem));s.age(120);s.setOperation('refresh');finish(s);assert.equal(s.activeValue,null);});
test('Switching type never transfers the old memory object into the new type',()=>{let s=new Simulator('DRAM');s.advance();s.selectType('NAND');assert.equal(s.mem.type,'NAND');assert.equal(s.bpc,1);assert.ok(s.mem.cells[0].every(row=>row.every(v=>v===0)));s.selectType('HBM');assert.equal(s.mem.cells.length,8);assert.equal(s.mem.type,'HBM');});
test('Changing flash format resets only current type and updates all 16 states',()=>{let s=new Simulator('NAND');s.format(4);assert.equal(s.bpc,4);s.targetHex='01234567';assert.equal(s.setOperation('write').ok,true);finish(s);assert.deepEqual(s.mem.output,[0,1,2,3,4,5,6,7]);});
test('Invalid hex is rejected, not silently coerced',()=>{let s=new Simulator();for(let text of ['', 'GG','123', '-1','0x']){s.targetHex=text;assert.equal(s.setOperation('write').ok,false);}});
test('Unfinished writes are canceled when choosing another address',()=>{let s=new Simulator('DRAM');let before=JSON.stringify(s.mem.cells);s.targetHex='00';s.setOperation('write');s.seek(4);assert.notEqual(JSON.stringify(s.mem.cells),before);s.address(0,7,2);assert.equal(JSON.stringify(s.mem.cells),before);});
test('Read reference controls conduction, not stored NAND data',()=>{let s=new Simulator('NAND');let before=JSON.stringify(s.mem.cells);s.readRef=0;assert.equal(s.signals().conducting,false);s.readRef=1;assert.equal(s.signals().conducting,true);assert.equal(JSON.stringify(s.mem.cells),before);});
test('32-bit QLC data is unsigned and roundtrips',()=>{let s=new Simulator('NAND');s.format(4);s.targetHex='FEDCBA98';s.setOperation('write');finish(s);assert.deepEqual(s.mem.output,[15,14,13,12,11,10,9,8]);});

test('DRAM open row keeps WL asserted through column reads',()=>{const s=new Simulator('DRAM');while(!s.done)s.advance();assert.equal(s.signals().wl,1);s.setOperation('precharge');while(!s.done)s.advance();assert.equal(s.signals().wl,0);});
test('HBM write is host to memory before cell commitment',()=>{const s=new Simulator('HBM');s.targetHex='01';s.setOperation('write');const codes=s.steps.map(x=>x.code);assert(codes.indexOf('DATA IN')<codes.indexOf('WRITE / RESTORE'));assert(codes.indexOf('TSV WRITE')<codes.indexOf('WRITE / RESTORE'));assert.equal(s.signals().operation,'write');while(!s.done)s.advance();assert.equal(s.rowValues().join(''),'00000001');});
test('HBM closed-page example closes before opening new row',()=>{const s=new Simulator('HBM');while(!s.done)s.advance();assert.equal(s.mem.openRows[0],3);s.setOperation('read');assert.equal(s.mem.openRows[0],null);assert.equal(s.signals().wl,0);});
test('ideal comparator sweep resolves all 30 multi-level states',()=>{const {senseLevel}=require('../js/simulator.js');for(let bpc=1;bpc<=4;bpc++)for(let level=0;level<(1<<bpc);level++)assert.equal(senseLevel((level+.5)/(1<<bpc),bpc),level);});

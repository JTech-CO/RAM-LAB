/* Deterministic educational state machine. No wall-clock hardware timing claims. */
(function(root){
'use strict';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const copy=x=>JSON.parse(JSON.stringify(x));
const isFlash=t=>t==='NAND'||t==='HBF';
const isCap=t=>t==='DRAM'||t==='HBM';
const S=(code,title,detail,tags=[],action='')=>({code,title,detail,tags,action});
function gray(n){return n^(n>>1);}
function inverseGray(n){let r=n;while(n>>=1)r^=n;return r;}
function levelToSymbol(level,bpc){return level===null?null:((1<<bpc)-1)^gray(level);}
function symbolToLevel(symbol,bpc){return inverseGray(((1<<bpc)-1)^symbol);}
// Ideal multi-reference read. The slider shows one comparator; digital output
// uses all decision boundaries, rather than pretending one threshold decodes TLC.
function senseLevel(vt,bpc){let level=0;for(let k=1;k<(1<<bpc);k++)if(vt>k/(1<<bpc))level++;return level;}
function fresh(type,bpc=type==='HBF'?3:1){
 const banks=(type==='HBM'||type==='HBF')?8:1,flash=isFlash(type);
 const cell=(b,r,c)=>flash?0:((0xA6+r*23+b*11) >>> (7-c))&1;
 let cells=Array.from({length:banks},(_,b)=>Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=>cell(b,r,c))));
 return {type,bpc,power:true,cells,volts:cells.map(b=>b.map(r=>r.map(x=>x))),openRows:Array(banks).fill(null),buffers:Array(banks).fill(null),programmed:Array.from({length:banks},()=>Array(8).fill(false)),eraseCount:Array(banks).fill(0),ageMs:0,refreshEnabled:true,output:null};
}
class Simulator {
 constructor(type='DRAM'){
  this.memories={};this.type=type;this.bank=0;this.row=3;this.col=2;this.targetHex='A6';this.readRef=.5;this.lanes=8;this.playing=false;this.speed=1;this.history=[];this.virtualPhase=0;
  this.memories[type]=fresh(type);this.setOperation('read');
 }
 get mem(){return this.memories[this.type];}set mem(v){this.memories[this.type]=v;}
 get flash(){return isFlash(this.type);}get cap(){return isCap(this.type);}get bpc(){return this.mem.bpc;}
 get step(){return this.steps[this.index];}get done(){return this.index>=this.steps.length-1;}
 get activeValue(){return this.mem.cells[this.bank][this.row][this.col];}
 get activeBits(){return this.flash?levelToSymbol(this.activeValue,this.bpc):this.activeValue;}
 rowValues(){return this.mem.cells[this.bank][this.row].map(v=>this.flash?levelToSymbol(v,this.bpc):v);}
 cancel(){this.playing=false;if(this.base&&!this.done)this.mem=copy(this.base);}
 selectType(type){this.cancel();this.base=null;this.type=type;if(!this.memories[type])this.memories[type]=fresh(type);this.bank=0;this.row=3;this.col=2;this.targetHex=isFlash(type)?(this.mem.bpc===3?'A5C3E1':'A6'):'A6';return this.setOperation('read');}
 address(bank,row,col){this.cancel();this.bank=clamp(Number(bank)||0,0,this.mem.cells.length-1);this.row=clamp(Number(row)||0,0,7);this.col=clamp(Number(col)||0,0,7);return this.setOperation('read');}
 format(bpc){if(!this.flash)return;this.cancel();this.base=null;this.mem=fresh(this.type,clamp(bpc,1,4));this.targetHex=['','A6','A5C3','A5C3E1','A5C3E17B'][this.mem.bpc];this.setOperation('read');}
 targetSymbols(){let digits=this.flash?this.bpc*2:2;let h=this.targetHex.replace(/^0x/i,'').trim();if(!new RegExp(`^[0-9a-fA-F]{1,${digits}}$`).test(h))throw Error(`16진수를 1~${digits}자리로 입력하세요.`);let value=parseInt(h,16),bits=this.flash?this.bpc:1,mask=(1<<bits)-1;return Array.from({length:8},(_,i)=>(value>>>(bits*(7-i)))&mask);}
 validate(op){
  if(!this.mem.power)return '전원이 꺼져 있습니다. 전원을 켠 뒤 실행하세요.';
  if(op==='write'){
   let symbols;try{symbols=this.targetSymbols();}catch(e){return e.message;}
   if(this.flash&&this.mem.programmed[this.bank][this.row])return '이미 프로그램된 페이지입니다. 블록을 지우거나 다른 페이지를 선택하세요. 이 모델은 부분 페이지 재프로그램을 허용하지 않습니다.';
   if(this.flash&&symbols.some((x,c)=>symbolToLevel(x,this.bpc)<this.mem.cells[this.bank][this.row][c]))return '문턱 전압을 낮추는 덮어쓰기는 허용되지 않습니다. 먼저 블록을 지우세요.';
  }
  return null;
 }
 setOperation(op){
  this.cancel();let err=this.validate(op);if(err&&this.mem.power)return {ok:false,error:err};
  this.op=op;this.base=copy(this.mem);this.steps=this.makeSteps(op);this.index=0;this.playing=false;this.mem.output=null;this.apply(0);return {ok:true};
 }
 makeSteps(op){
  const t=this.type;
  if(op==='erase')return [S('ERASE SETUP','블록을 지정합니다','페이지 한 개가 아니라 선택한 물리 블록의 모든 워드라인이 소거 대상입니다.',['select']),S('ERASE FIELD','저장층 전하를 줄입니다','소거 바이어스로 전하 상태를 되돌립니다. 실제 주입·탈출 메커니즘은 셀 구조에 따라 다르며, 여기서는 문턱 전압의 감소를 모델링합니다.',['erase']),S('ERASE VERIFY','소거 상태를 검증합니다','블록 안 모든 셀이 소거 문턱 구간에 도달해야 합니다.',['sense']),S('ERASE DONE','블록 전체가 소거되었습니다','모든 페이지의 셀을 E 상태로 되돌립니다. 이 예시 매핑에서 E는 모든 비트가 1입니다.',['buffer'],'erase')];
  if(op==='precharge')return [S('RESTORE','열린 행의 복원을 마칩니다','다른 행을 열기 전에 현재 행의 저장 전압을 복원해야 합니다.',['restore'],'restore'),S('PRECHARGE','행을 닫고 비트라인을 평형화합니다','워드라인을 내리고 비트라인 쌍을 VDD/2로 맞춥니다. 행 버퍼는 더 이상 열린 행을 뜻하지 않습니다.',['bl','blb'],'precharge')];
  if(op==='refresh')return [S('PRE','기존 행을 닫습니다','리프레시를 위해 선택 뱅크를 준비합니다. 실제 REF 명령의 내부 행 선택은 장치가 관리합니다.',['bl'],'precharge'),S('REF ACT','리프레시 행을 엽니다','사용자 읽기 없이 저장 전하를 감지합니다. 이 실험에서는 선택 행을 대표로 보여줍니다.',['wl','charge'],'open'),S('REF SENSE','아직 구분되는 값을 감지합니다','누설 때문에 신호가 작아져도 판정 마진이 남아 있으면 원래 비트를 재생할 수 있습니다. 이미 소실된 정보는 복구하지 못합니다.',['sense'],'sense'),S('REF RESTORE','행 전체의 전압을 복원합니다','센스 앰프가 값을 다시 구동합니다. DQ 데이터 출력을 만들기 위한 읽기가 아닙니다.',['restore'],'restore'),S('REF END','행을 닫습니다','반복되는 내부 리프레시의 한 행을 보여주었습니다. 이 모델의 가상 ms는 특정 DDR 제품의 타이밍 사양이 아닙니다.',['bl'],'precharge')];
  if(t==='SRAM'){
   if(op==='write')return [S('WRITE DRIVER','서로 반대인 비트라인을 구동합니다','쓰기 드라이버가 목표 비트에 따라 BL과 BL̅을 상보 전압으로 만듭니다.',['bl','blb']),S('WL HIGH','액세스 트랜지스터를 켭니다','WL이 두 패스 게이트를 열어 외부 쓰기 구동과 내부 래치를 연결합니다.',['wl','bl','blb']),S('LATCH FLIP','래치의 안정 상태를 바꿉니다','쓰기 드라이버가 기존 상태를 이겨 Q와 Q̅을 반전시킵니다. 목표 값은 선택한 8비트 워드 전체에 적용됩니다.',['q','qb','latch'],'write'),S('WL LOW','셀을 비트라인에서 분리합니다','WL을 내린 뒤에도 두 인버터의 양의 되먹임이 새 상태를 유지합니다.',['q','qb','latch']),S('HOLD','새 데이터가 유지됩니다','리프레시는 필요 없지만 전원은 필요합니다. Static은 비휘발성을 뜻하지 않습니다.',['q','qb','vdd'],'output')];
   return [S('PRECHARGE','BL과 BL̅을 높게 맞춥니다','두 비트라인을 같은 높은 전압으로 프리차지합니다. 저장 노드 Q와 Q̅은 그대로 유지됩니다.',['bl','blb','latch']),S('WL HIGH','선택한 셀을 비트라인에 연결합니다','워드라인이 두 액세스 NMOS를 동시에 켭니다.',['wl','latch']),S('BITLINE Δ','한쪽 비트라인이 조금 내려갑니다','0을 저장한 쪽의 풀다운 경로가 해당 비트라인을 방전합니다. 차동 센싱에 필요한 작은 전압차가 만들어집니다.',['bl','blb','q','qb']),S('SENSE','전압 차를 디지털 값으로 판정합니다','센스 앰프가 두 선의 차이를 증폭합니다. 정상 동작에서는 래치의 저장 값을 파괴하지 않습니다.',['sense'],'output'),S('HOLD','셀을 다시 분리합니다','WL을 내립니다. DRAM과 달리 읽기 후 커패시터 복원 단계가 없습니다.',['q','qb','latch'])];
  }
  if(t==='DRAM'){
   if(this.mem.openRows[this.bank]===this.row&&op==='read')return [S('ROW HIT','이미 열린 행을 사용합니다','같은 뱅크의 같은 행이 센스 앰프에 남아 있습니다. 새 ACT와 전하 공유를 반복하지 않습니다.',['sense']),S('COLUMN','열 선택으로 데이터를 출력합니다','열 멀티플렉서가 행 버퍼에서 필요한 데이터를 선택합니다.',['buffer'],'output')];
   let prefix=[S('PRECHARGE','비트라인 쌍을 VDD/2로 맞춥니다','닫힌 뱅크를 준비합니다. 다른 행이 열려 있었다면 복원 완료 후 그 행을 닫아야 합니다.',['bl','blb'],'precharge'),S('ACTIVATE','선택 행의 워드라인을 올립니다','액세스 트랜지스터가 열려 해당 행의 커패시터들이 비트라인에 연결됩니다.',['wl'],'open'),S('CHARGE SHARE','셀과 비트라인이 전하를 나눕니다','Cc가 Cb보다 작으므로 BL의 변화는 작습니다. 셀 전압은 크게 흔들리므로 감지 후 복원이 필요합니다.',['charge','bl']),S('SENSE','작은 차이를 논리 전압으로 증폭합니다','센스 앰프가 BL과 기준선의 차이를 증폭하며 열린 행의 데이터를 잡습니다.',['sense'],'sense')];
   if(op==='write')return [...prefix,S('WRITE','쓰기 드라이버가 새 값을 구동합니다','열 선택 회로를 통해 행 버퍼의 값을 바꾸고, 열린 WL을 통해 커패시터를 충전 또는 방전합니다.',['bl','charge'],'write'),S('RESTORE','행의 저장 전압을 복원합니다','선택한 워드뿐 아니라 활성화된 행의 나머지 셀도 보존되어야 합니다.',['restore'],'restore'),S('WRITE DONE','새 값이 행 버퍼에 남습니다','행은 열린 상태로 유지합니다. 같은 행을 다시 읽으면 ROW HIT 경로가 됩니다.',['buffer'],'output')];
   return [...prefix,S('RESTORE','감지한 값을 셀에 다시 씁니다','전하 공유로 달라진 저장 전압을 원래 논리 전압으로 돌립니다. 실제 감지·복원은 겹쳐 진행되며 여기서는 설명을 위해 분리했습니다.',['restore'],'restore'),S('COLUMN','행 버퍼에서 데이터를 꺼냅니다','선택한 8비트 워드를 표시합니다. 행을 열린 채 남겨 다음 접근에서 행 적중을 실험할 수 있습니다.',['buffer'],'output')];
  }
  if(t==='HBM'&&op==='write')return [
   S('COMMAND','쓰기 주소를 제어 경로로 보냅니다','이 예제는 이전 행을 닫고 새 접근을 시작합니다. 실제 HBM 컨트롤러의 행 버퍼 정책과 JEDEC 명령 타이밍은 구현별로 다릅니다.',['base'],'precharge'),
   S('ACTIVATE','쓰기 대상 DRAM 행을 엽니다','해당 행의 액세스 MOS를 켭니다. 적층 여부와 무관하게 행의 기존 상태를 먼저 감지해야 합니다.',['wl','array'],'open'),
   S('CHARGE SHARE','기존 저장 전하를 공유합니다','1T1C 셀과 비트라인의 작은 전압차를 만듭니다.',['charge']),
   S('SENSE / RESTORE','행의 기존 값을 감지·보존합니다','부분 쓰기에서 다른 셀의 정보를 잃지 않도록 기존 행을 센스 앰프에 잡고 복원합니다.',['sense','restore'],'senseRestore'),
   S('DATA IN','가속기에서 쓰기 데이터를 보냅니다','쓰기 데이터의 방향은 읽기의 반대입니다. 가속기에서 인터포저와 베이스 다이 쪽으로 이동합니다.',['lanes','base']),
   S('TSV WRITE','수직 경로로 데이터를 전달합니다','적층 DRAM의 대상 배열에 쓰기 데이터가 전달됩니다. 대표 선들은 실제 주소 배선이나 핀 수를 재현하지 않습니다.',['tsv']),
   S('WRITE / RESTORE','드라이버가 새 셀 전압을 구동합니다','선택된 워드의 데이터를 바꾸고 저장 커패시터의 전압을 복원합니다.',['restore','array'],'writeRestore'),
   S('WRITE DONE','새 데이터가 저장되었습니다','우측 읽기·쓰기 결과는 교육용 검증 표시입니다. 쓰기 명령이 데이터 에코를 외부 DQ로 자동 반환한다는 뜻이 아닙니다.',['buffer'],'output')];
  if(t==='HBM')return [S('COMMAND','채널·뱅크·행 주소를 전달합니다','여러 독립 채널이 DRAM 뱅크 접근을 분담합니다. 이 예제는 이전 행을 닫고 새 접근을 시작합니다. 실제 컨트롤러의 행 버퍼 정책과 타이밍은 별도입니다.',['base'],'precharge'),S('ACTIVATE','해당 DRAM 행을 엽니다','HBM도 1T1C 셀입니다. 워드라인과 비트라인, 센스 앰프를 이용합니다.',['wl','array'],'open'),S('CHARGE SHARE','커패시터의 전하를 감지 경로로 보냅니다','수직 적층이 전하 공유를 없애지 않습니다. 셀 접근 지연과 외부 대역폭은 별개의 값입니다.',['charge']),S('SENSE / RESTORE',op==='write'?'쓰기 데이터를 저장하고 복원합니다':'행 데이터를 감지하고 복원합니다','동일한 DRAM 저장 원리를 사용하므로 복원과 리프레시가 여전히 필요합니다.',['sense','restore'],op==='write'?'writeRestore':'senseRestore'),S('TSV BURST','여러 데이터 경로가 병렬로 움직입니다','TSV는 수직 전기 연결이고 저장 소자가 아닙니다. 연속 버스트가 넓은 데이터 인터페이스를 활용합니다.',['tsv','base']),S('PARALLEL I/O','인터포저를 건너 데이터를 전달합니다','표시된 병렬 경로 수는 교육용입니다. 버스 폭과 전송률을 함께 봐야 대역폭을 계산할 수 있습니다.',['lanes'],'output')];
  if(this.flash&&op==='write')return [S('DATA LOAD','쓰기 데이터를 페이지 버퍼에 놓습니다','표시한 8개 셀은 한 WL의 표본입니다. MLC 이상은 여러 논리 페이지에 걸친 상태를 한 번에 다루는 축약 모델이며, 실제 페이지·다중 패스 프로그램과 다릅니다.',['buffer']),S('PROGRAM SETUP','선택 워드라인에 프로그램 조건을 겁니다','선택 페이지의 셀별 목표 상태에 따라 프로그램 또는 억제 조건이 달라집니다. 정확한 고전압 값은 제품별로 다릅니다.',['wl','select']),S('ISPP PULSE','프로그램 펄스로 문턱 전압을 올립니다','저장층의 전하가 증가하면서 Vt가 이동합니다. 실제 장치의 ISPP 반복을 이 단계에서는 축약해서 보여줍니다.',['program'],'programPreview'),S('VERIFY','목표 문턱 구간을 확인합니다','프로그램과 검증을 반복해 목표 구간에 도달한 셀의 추가 프로그램을 억제합니다.',['sense']),S('PAGE COMMIT','프로그램된 페이지를 확정합니다','이 교육용 모델은 동일 페이지 재프로그램을 금지합니다. 다른 값을 덮어쓰려면 소거 또는 컨트롤러의 새 페이지 매핑이 필요합니다.',['buffer'],'write'),S('READY','페이지 데이터를 확인합니다','전원을 꺼도 저장층의 문턱 상태는 유지됩니다. 무한 보존·무제한 내구성을 뜻하지는 않습니다.',['buffer'],'output')];
  if(t==='HBF')return [S('REQUEST','요청을 제어 로직에 전달합니다','HBF는 NAND 기반 비휘발성 메모리입니다. HBM과 같은 셀이나 동일한 임의 바이트 덮어쓰기 모델로 취급하지 않습니다.',['base']),S('ARRAY SELECT','독립적인 NAND 배열을 선택합니다','병렬 서브어레이가 여러 요청을 겹쳐 처리하도록 표현했습니다. 내부 배선과 큐 구성은 개념 모델입니다.',['array','wl','select']),S('NAND SENSE','각 배열에서 문턱 전압을 판정합니다','셀 읽기는 여전히 NAND의 센싱 동작입니다. 병렬도가 커져도 단일 셀의 지연이 DRAM처럼 바뀌지 않습니다.',['sense','channel']),S('PAGE BUFFER','읽은 데이터를 버퍼에 모읍니다','오류 정정과 데이터 재배열은 제어 경로에 속합니다. 이 앱은 실제 ECC 코드를 계산하지 않고 위치를 표시합니다.',['buffer','base']),S('PARALLEL TRANSFER','여러 경로로 데이터를 전달합니다','겹치는 배열 접근과 넓은 전송 경로가 대역폭을 만듭니다. 화면의 선 수는 실제 표준 핀 수가 아닙니다.',['tsv','lanes']),S('COMPLETE','제어 로직이 요청 결과를 돌려줍니다','가속기와의 연계는 구현에 따라 다릅니다. 공개 구조를 바탕으로 한 개념 시각화이며 특정 HBF 제품 에뮬레이터가 아닙니다.',['base'],'output')];
  return [S('SELECT STRING','페이지와 NAND 스트링을 선택합니다','여러 셀이 수직 채널을 공유하며 직렬로 연결됩니다. 양 끝 선택 게이트가 스트링의 접근을 제어합니다.',['select']),S('PASS BIAS','선택하지 않은 셀을 통과시킵니다','비선택 WL에는 통과 전압을 인가해 해당 셀들이 직렬 경로를 막지 않도록 합니다.',['pass','bl']),S('VREF','선택 WL에 읽기 기준을 인가합니다','선택 셀의 Vt보다 읽기 기준이 높으면 채널이 도통합니다. 전압 숫자 자체를 직접 꺼내오는 것이 아니라 전류 유무를 감지합니다.',['wl','channel']),S('SENSE','전류 결과로 문턱 구간을 판정합니다','다중 레벨 셀은 여러 경계를 사용합니다. 우측 Vref는 한 비교기의 관찰용 기준입니다. 완전한 디지털 출력은 모든 경계의 이상적인 비교 결과를 결합해 판정합니다.',['sense','channel']),S('PAGE BUFFER','셀 상태를 페이지 버퍼에 담습니다','여러 센싱 결과를 비트로 해석합니다. 오류 정정은 이 경로의 기능이며 본 모델은 ECC 처리를 추상화합니다.',['buffer']),S('DATA OUT','디지털 데이터를 출력합니다','SLC·MLC·TLC·QLC 선택에 따라 한 셀의 상태 수는 2·4·8·16개입니다. 소거는 페이지가 아니라 블록 단위입니다.',['buffer'],'output')];
 }
 apply(index){
  if(!this.mem.power)return;
  const action=this.steps[index].action,m=this.mem,b=this.bank,r=this.row;
  const restore=()=>{m.cells[b][r].forEach((v,c)=>{m.volts[b][r][c]=v===null?.5:v;});m.ageMs=0;};
  const sense=()=>{if(this.cap)m.cells[b][r].forEach((v,c)=>{let voltage=m.volts[b][r][c];if(Math.abs(voltage-.5)<.035)m.cells[b][r][c]=null;});m.buffers[b]=copy(m.cells[b][r]);};
  const write=()=>{let target=this.targetSymbols();m.cells[b][r]=target.map(x=>this.flash?symbolToLevel(x,this.bpc):x);if(this.flash)m.programmed[b][r]=true;else{m.volts[b][r]=copy(target);m.buffers[b]=copy(target);}};
  if(action==='precharge'){m.openRows[b]=null;m.buffers[b]=null;}
  if(action==='open')m.openRows[b]=r;
  if(action==='sense')sense();if(action==='restore')restore();
  if(action==='senseRestore'){sense();restore();}
  if(action==='writeRestore'){write();restore();}
  if(action==='write')write();
  if(action==='erase'){m.cells[b]=Array.from({length:8},()=>Array(8).fill(0));m.programmed[b]=Array(8).fill(false);m.eraseCount[b]++;m.output=null;}
  if(action==='output'){m.output=this.flash?m.cells[b][r].map(level=>levelToSymbol(senseLevel((level+.5)/(1<<this.bpc),this.bpc),this.bpc)):this.rowValues();}
 }
 advance(){if(!this.mem.power)return {ok:false,error:'전원이 꺼져 있습니다.'};if(this.done){this.playing=false;return {ok:true,done:true};}this.index++;this.apply(this.index);if(this.done)this.playing=false;return {ok:true,done:this.done};}
 seek(index){this.playing=false;this.mem=copy(this.base);this.index=clamp(index,0,this.steps.length-1);for(let i=0;i<=this.index;i++)this.apply(i);return {ok:true};}
 restart(){return this.setOperation(this.op);}
 reset(){this.playing=false;this.mem=fresh(this.type,this.bpc);this.base=null;this.setOperation('read');}
 power(on){this.cancel();let m=this.mem;m.power=on;m.output=null;m.openRows.fill(null);m.buffers.fill(null);
  if(!on&&!this.flash){m.cells=m.cells.map(b=>b.map(r=>r.map(()=>null)));m.volts=m.volts.map(b=>b.map(r=>r.map(()=>.5)));}
  this.base=copy(m);this.steps=this.makeSteps('read');this.op='read';this.index=0;this.playing=false;
 }
 age(ms=20){this.cancel();let m=this.mem;if(!this.cap)return;ms=clamp(Number(ms)||0,0,10000);m.ageMs+=ms;
  for(let b=0;b<m.cells.length;b++)for(let r=0;r<8;r++)for(let c=0;c<8;c++){
   const bit=m.cells[b][r][c];
   if(m.power&&m.refreshEnabled&&bit!==null)m.volts[b][r][c]=bit;
   else{m.volts[b][r][c]=.5+(m.volts[b][r][c]-.5)*Math.exp(-ms/40);if(Math.abs(m.volts[b][r][c]-.5)<.035)m.cells[b][r][c]=null;}
  }
  m.openRows.fill(null);m.buffers.fill(null);this.base=copy(m);this.setOperation('read');
 }
 signals(){
  const m=this.mem,code=this.step.code,t=this.type,bit=this.activeBits,raw=this.activeValue,power=m.power;
  const tags=power?[...this.step.tags]:[];
  let cellV=this.cap?m.volts[this.bank][this.row][this.col]:(bit===null?.5:bit),wl=tags.includes('wl')||tags.includes('charge')||tags.includes('restore')||tags.includes('sense')?1:0,bl=.5,blb=.5;
  if(t==='SRAM'){
   bl=blb=1;
   if(this.op==='write'){let v=this.targetSymbols()[this.col];bl=v;blb=1-v;}
   else if(['BITLINE Δ','SENSE'].includes(code)){bl=bit===0?.88:1;blb=bit===1?.88:1;}
   if(code==='HOLD')wl=0;
  } else if(this.cap){
   if(code==='CHARGE SHARE'){cellV=(.1*cellV+1*.5)/1.1;bl=cellV;}
   if(['SENSE','RESTORE','COLUMN','WRITE','WRITE DONE','SENSE / RESTORE','TSV BURST','PARALLEL I/O','ROW HIT','REF RESTORE','REF SENSE'].includes(code)){bl=bit===null?.5:bit;blb=1-bl;}
  }
  if(this.cap){wl=m.openRows[this.bank]===this.row?1:0;if(wl&& !['ACTIVATE','CHARGE SHARE','REF ACT'].includes(code)){bl=bit===null?.5:bit;blb=1-bl;}if(code==='SENSE'){const shared=(.1*cellV+.5)/1.1;cellV=(shared+cellV)/2;}}
  let vt=this.flash?(raw+.5)/(1<<this.bpc):null;
  if(this.flash&&this.step.action==='programPreview'){let desired=symbolToLevel(this.targetSymbols()[this.col],this.bpc);vt=((raw+desired)/2+.5)/(1<<this.bpc);}
  const conducting=this.flash&&power&&this.readRef>=(vt??1);
  if(this.flash&&!conducting){let i=tags.indexOf('channel');if(i!==-1)tags.splice(i,1);}
  if(!power){wl=0;bl=blb=0;}
  return {power,operation:this.op,bit:bit===null?null:bit,cellVoltage:cellV,wl,bl,blb,vt,conducting,activeTags:tags,code,output:m.output};
 }
 snapshot(){return {schema:'ram-lab.session.v1',exportedAt:new Date().toISOString(),model:'educational; not device-calibrated',type:this.type,address:{bank:this.bank,row:this.row,column:this.col},operation:this.op,step:this.index,stepCode:this.step.code,signals:this.signals(),memory:copy(this.mem)};}
}
const API={Simulator,fresh,isFlash,isCap,gray,inverseGray,levelToSymbol,symbolToLevel,senseLevel,clamp};
if(typeof module!=='undefined'&&module.exports)module.exports=API;else Object.assign(root.RAM=root.RAM||{},API);
})(typeof window!=='undefined'?window:globalThis);

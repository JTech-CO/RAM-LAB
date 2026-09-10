(() => {
'use strict';
const R=window.RAM;
let chartMode=false;
const fontSize=size=>Math.max(chartMode?12:16,size);
const local=s=>R.i18n?R.i18n.t(s):s;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
R.escape=esc;
const text=(x,y,s,color='#99b2bd',size=12,anchor='start')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize(size)}" text-anchor="${anchor}" font-family="Inter,Arial,sans-serif">${esc(local(s))}</text>`;
const mono=(x,y,s,color='#bad0d3',size=12,anchor='start')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize(size)}" text-anchor="${anchor}" font-family="Consolas,monospace">${esc(local(s))}</text>`;
function wire(path,active=false,color='#68848b'){return `<path d="${path}" stroke="${active?color:'#465f69'}" class="wire${active?' active-wire':''}"/>`;}
const box=(x,y,w,h,label,sub,active=false)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${active?'#233f38':'#15252e'}" stroke="${active?'#9be6cd':'#3c5663'}"/>${text(x+w/2,y+h/2-6,label,active?'#c0eedb':'#b5cbd1',12,'middle')}${mono(x+w/2,y+h/2+15,sub,'#7c9da9',9,'middle')}`;
function mos(x,y,type='n',on=false,rot=0){return `<g transform="translate(${x} ${y}) rotate(${rot})" stroke="${on?'#a1e4c8':'#758a93'}" stroke-width="2" fill="none"><path d="M0 -40V-25H-8V25H0V40 M-17 -24V24 M-35 0H-17"/>${type==='p'?'<circle cx="-23" cy="0" r="4" fill="#0f1a21"/>':''}</g>`;}
function sram(sim){let q=sim.signals(),bit=q.bit,read=sim.op==='read',wl=q.wl===1;
 return `<svg viewBox="0 0 860 430" role="img" aria-label="6개 트랜지스터로 구성한 SRAM 회로. 4개는 교차 결합 인버터, 2개는 접근 NMOS입니다."><title>6T SRAM · 교차 결합 인버터와 두 액세스 게이트</title>
 ${mono(430,29,'VDD',' #b7c8ce',13,'middle')}${wire('M285 52H595')}${wire('M310 52V97 M570 52V97')}
 ${mos(310,137,'p',bit===1)}${mos(310,303,'n',bit===0)}${mos(570,137,'p',bit===0)}${mos(570,303,'n',bit===1)}
 ${wire('M310 177V263',true,'#9be6cd')}${wire('M570 177V263',true,'#bda7e6')}
 ${wire('M310 343V371H570V343')}${wire('M440 371V384 M427 384H453 M431 390H449 M436 396H444')}
 ${wire('M310 219H369V83H519V137H535',true,'#9be6cd')}${wire('M519 137V303H535',true,'#9be6cd')}
 ${wire('M570 239H496V353H264V303H275',true,'#bda7e6')}${wire('M264 303V137H275',true,'#bda7e6')}
 ${wire('M110 70V350 M755 70V350',read||sim.op==='write','#9be6cd')}
 ${wire('M110 229H175 M255 229H310 M570 229H610 M690 229H755',wl,'#9be6cd')}
 ${mos(215,229,'n',wl,90)}${mos(650,229,'n',wl,90)}
 ${wire('M215 194V67H650V194',wl,'#dfb87b')}${mono(215,29,'WL = '+q.wl,'#dfb87b',12,'middle')}
 ${mono(110,57,'BL','#9be6cd',14,'middle')}${mono(755,57,'BL̅','#bda7e6',14,'middle')}
 ${text(101,369,q.bl.toFixed(2)+' V','#73968b',11,'middle')}${text(755,369,q.blb.toFixed(2)+' V','#9586ae',11,'middle')}
 <circle cx="310" cy="229" r="5" fill="#9be6cd"/><circle cx="570" cy="229" r="5" fill="#bda7e6"/>
 ${mono(335,244,'Q = '+(bit===null?'X':bit),'#a7e6ce',14)}${mono(591,208,'Q̅ = '+(bit===null?'X':1-bit),'#c5b3e3',14)}
 ${mono(329,137,'P1','#8d9eac',10)}${mono(589,137,'P2','#8d9eac',10)}${mono(329,306,'N1','#8d9eac',10)}${mono(589,306,'N2','#8d9eac',10)}
 ${text(215,274,'ACCESS','#829ca8',10,'middle')}${text(650,274,'ACCESS','#829ca8',10,'middle')}
 ${text(430,421,'4T 래치 + 2T 액세스','#a0b7c3',10,'middle')}</svg>`;
}
function dram(sim){let q=sim.signals(),tags=q.activeTags,act=t=>tags.includes(t);
 return `<svg viewBox="0 0 860 430" role="img" aria-label="DRAM 1T1C 회로. 워드라인으로 트랜지스터를 켜면 저장 커패시터와 비트라인이 연결됩니다."><title>1T1C DRAM · 전하 공유, 감지, 복원</title>
 ${wire('M220 56V325',act('bl')||act('charge'),'#9be6cd')}${mono(220,40,'BL = '+q.bl.toFixed(3)+' V','#9be6cd',14,'middle')}
 ${wire('M220 197H359 M439 197H638V260',act('charge')||act('restore'),'#9be6cd')}${mos(399,197,'n',q.wl===1,90)}
 ${wire('M399 162V90H540',q.wl===1,'#dfb87b')}${mono(550,94,'WL = '+q.wl,'#dfb87b',14)}
 ${text(397,249,'접근 트랜지스터','#95b1b9',13,'middle')}${mono(397,267,'1T · MOS','#a0b7c3',10,'middle')}
 ${wire('M604 262H672 M604 277H672',act('charge')||act('restore'),'#9be6cd')}${wire('M638 277V345H731',false)}
 ${mono(745,349,'VDD/2','#a7bac2',12)}${text(745,366,'공통 플레이트','#a0b7c3',10)}
 ${mono(685,268,'Cc','#badecd',14)}${text(685,288,'저장 커패시터','#9cb7bc',12)}
 ${mono(638,175,'Vcell = '+q.cellVoltage.toFixed(3)+' V','#b8ecda',14,'middle')}
 <circle cx="638" cy="197" r="5" fill="#b4edd7"/>
 ${wire('M220 197H141V257 M119 258H163 M119 271H163 M141 271V298 M129 299H153 M133 306H149 M137 313H145')}
 ${mono(88,265,'Cb','#849eab',12,'middle')}${text(89,283,'기생 용량','#a0b7c3',9,'middle')}
 ${box(150,325,140,58,'센스 앰프','ROW BUFFER',act('sense')||act('restore'))}
 ${wire('M290 354H420',act('buffer'),'#9be6cd')}${box(420,327,111,54,'열 선택','DQ',act('buffer'))}
 ${text(220,399,'감지 → 복원','#8ba3ad',11,'middle')}
 ${text(598,401,'예시 Cc:Cb = 1:10','#a0b7c3',11,'middle')}
 </svg>`;
}
function nand(sim){let q=sim.signals(),y0=51,p=36,sel=sim.row;
 let body=wire('M407 17V32',q.power,'#9be6cd')+mono(432,24,'BL','#9be6cd',13);
 for(let i=0;i<8;i++){let y=y0+i*p;body+=mos(407,y,'n',i===sel?q.conducting:true,0).replace('M0 -40V-25H-8V25H0V40','M0 -18V-12H-8V12H0V18').replace('M-17 -24V24 M-35 0H-17','M-17 -12V12 M-35 0H-17');body+=wire(`M217 ${y}H372`,true,i===sel?'#cbb4ed':'#4f7780')+mono(209,y+4,i===sel?`WL${i} · Vref ${sim.readRef.toFixed(2)}`:`WL${i} · Vpass`,i===sel?'#cbb4ed':'#76939c',i===sel?12:10,'end');if(i===sel)body+=`<rect x="390" y="${y-19}" width="32" height="38" fill="none" stroke="#bca2df" stroke-dasharray="3 3"/>`+mono(436,y+4,`Vt ${q.vt.toFixed(2)} · ${q.conducting?'ON':'OFF'}`,q.conducting?'#a4e2c8':'#d3a485',12);}
 body+=wire('M407 321V347H515',q.conducting,'#9be6cd')+box(515,321,168,55,'페이지 버퍼 / 센싱','PAGE DATA',q.activeTags.includes('buffer'));
 body+=text(406,390,'선택 셀에서 스트링 전류를 판정합니다.','#90a9b4',12,'middle')+text(406,415,'선택 WL: Vref · 비선택 WL: Vpass','#a0b7c3',10,'middle');
 body+=box(565,54,227,91,'전하 트랩 → Vt',`${sim.bpc} bit / cell · ${1<<sim.bpc} states`,true)+text(577,199,'읽기: Vref 비교','#a8c4c9',11)+text(577,222,'쓰기: Vt 증가','#a8c4c9',11)+text(577,245,'소거: 블록 초기화','#a8c4c9',11);
 return `<svg viewBox="0 0 860 430" role="img" aria-label="직렬 NAND 스트링의 선택 워드라인에 읽기 기준을 걸고 나머지 셀을 통과시켜 전류를 감지합니다."><title>NAND 직렬 스트링 · 선택 WL과 통과 바이어스</title>${body}</svg>`;
}
function stack(sim){let q=sim.signals(),flash=sim.flash,body='',act=t=>q.activeTags.includes(t);
 body+=box(45,150,137,108,'HOST',flash?'DATA I/O':'CONTROLLER',act('lanes'));
 body+=box(283,137,160,135,flash?'버퍼 · 제어':'BASE DIE',flash?'I/O · ECC*':'ROUTING',act('base'));
 for(let i=0;i<4;i++){let y=37+i*91;
  body+=box(563,y,223,63,flash?`NAND 배열 ${i}`:`DRAM 뱅크 ${i}`,flash?'CHARGE TRAP → Vt':'1T1C / SENSE',act('array')||act('charge')||act('sense'));
  body+=wire(`M443 ${165+i*22}H${480+i*13}V${y+31}H563`,act('tsv')||act('array'),flash?'#c9afe7':'#a1e0c5');
 }
 for(let i=0;i<8;i++)body+=wire(`M182 ${163+i*11}H283`,act('lanes')&&i<sim.lanes,flash?'#c9afe7':'#9be6cd');
 body+=mono(231,141,'PARALLEL',flash?'#c9afe7':'#a1e0c5',10,'middle')+mono(231,273,`${sim.lanes} paths`,'#a0b7c3',8,'middle');
 body+=text(430,407,flash?'ECC 위치 표시 · 연산은 미구현':'독립 뱅크 + 병렬 전송','#819aa6',11,'middle');
 return `<svg viewBox="0 0 860 430" role="img" aria-label="${flash?'HBF NAND':'HBM DRAM'} 배열에서 버퍼와 제어 로직을 거쳐 가속기로 이어지는 병렬 데이터 경로"><title>적층 메모리의 논리 데이터 경로</title>${body}</svg>`;
}
R.circuit=sim=>{chartMode=false;return ({SRAM:sram,DRAM:dram,NAND:nand,HBM:stack,HBF:stack})[sim.type](sim);};
R.signalChart=sim=>{
 chartMode=true;
 if(sim.flash)return threshold(sim);
 const q=sim.signals(),count=sim.steps.length,w=276,h=117,x0=42,x1=263,dy=29;
 let body=`<rect width="${w}" height="${h}" fill="#0c161d"/>`;
 let samples=[];
 const c=Object.assign(Object.create(Object.getPrototypeOf(sim)),sim);c.memories=JSON.parse(JSON.stringify(sim.memories));c.base=JSON.parse(JSON.stringify(sim.base));
 for(let i=0;i<count;i++){c.seek(i);samples.push(c.signals());}
 const names=sim.type==='SRAM'?[['WL','wl','#dfbd82'],['BL','bl','#91d8be'],['Q','bit','#9bbada']]:[['WL','wl','#dfbd82'],['BL','bl','#91d8be'],['CELL','cellVoltage','#9bbada']];
 let currentX=x0+sim.index/count*(x1-x0),blockW=(x1-x0)/count;
 body+=`<rect x="${currentX}" y="5" width="${blockW}" height="101" fill="#8fe3c911"/>`;
 for(let k=0;k<3;k++){
  const [label,key,col]=names[k],base=25+k*dy;
  body+=mono(8,base-5,label,col,8)+`<path d="M${x0} ${base}H${x1}" stroke="#20343d" stroke-width="1"/>`;
  let path='';samples.forEach((v,i)=>{let value=v[key]===null?.5:v[key],x=x0+i/count*(x1-x0),y=base-value*17;path+=`${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}L${(x+blockW).toFixed(2)} ${y.toFixed(2)}`;});
  body+=`<path d="${path}" fill="none" stroke="${col}" stroke-width="1.35"/>`;
 }
 for(let i=0;i<count;i++)body+=mono(x0+(i+.5)*blockW,109,String(i+1),i===sim.index?'#bcebd7':'#a0b7c3',7,'middle');
 return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="각 동작 단계에 따른 워드라인·비트라인·저장 노드의 예시 신호 파형"><title>단계별 정규화 전압 · 실제 시간 비율 아님</title>${body}</svg>`;
};
function threshold(sim){
 const q=sim.signals(),N=1<<sim.bpc,w=276,h=120,x0=13,x1=265,yb=85,range=x1-x0;
 let body=`<path d="M${x0} ${yb}H${x1}" stroke="#34515a"/>`;
 for(let level=0;level<N;level++){
  let center=x0+(level+.5)/N*range,sigma=range/N*.23,path=`M${center-3*sigma} ${yb}`;
  for(let t=-3;t<=3.01;t+=.25){let x=center+t*sigma,y=yb-Math.exp(-t*t/2)*43;path+=`L${x.toFixed(2)} ${y.toFixed(2)}`;}path+=`L${center+3*sigma} ${yb}Z`;
  let selected=level===sim.activeValue;body+=`<path d="${path}" fill="${selected?'#bfa9e04a':'#31445055'}" stroke="${selected?'#c4ade8':'#496375'}" stroke-width="1"/>`;
  if(N<=8||selected||([0,4,8,12,15].includes(level)&&Math.abs(level-sim.activeValue)>1))body+=mono(center,99,level===0?'E':`P${level}`,selected?'#e0cef6':'#a5bdc8',12,'middle');
  if(N<=8)body+=mono(center,112,R.levelToSymbol(level,sim.bpc).toString(2).padStart(sim.bpc,'0'),'#7f9ca8',7,'middle');
 }
 let xv=x0+sim.readRef*range,xt=x0+q.vt*range;
 body+=`<path d="M${xv} 23V87" stroke="#e2bc80" stroke-dasharray="3 3"/><circle cx="${xt}" cy="34" r="3" fill="#c5afe5"/>`+mono(Math.min(xv,235),17,'Vref','#d9b780',8,'middle')+mono(14,17,'Vt (norm.)','#a0b7c3',8);
 return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${N}개 문턱 전압 상태와 읽기 기준. 현재 셀의 정규화 문턱은 ${q.vt.toFixed(3)}이며 읽기 기준은 ${sim.readRef.toFixed(2)}입니다."><title>예시 문턱 분포와 Gray 매핑 · 실측 분포 아님</title>${body}</svg>`;
}
})();

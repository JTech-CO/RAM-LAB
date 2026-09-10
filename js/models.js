/* Representative structures; dimensions and lane counts are deliberately not to scale. */
(() => {
'use strict';
const R=window.RAM;
const C={silicon:'#33484b',well:'#526d70',metal:'#a7b8b9',copper:'#c69566',oxide:'#c5d9d4',gate:'#7189ae',wl:'#e3b96c',bit:'#79cdbb',charge:'#c8ffe4',dark:'#14272b',die:'#405b65',purple:'#8b83b9'};
function transistor(s,x,z,id,kind='n',scale=1,y=.12){
 const q=scale,part=/^[pn][12]$/.test(id)?'latch':id.startsWith('access')?'access':id;
 s.box([x,y,z],[1.12*q,.14*q,.62*q],kind==='p'?'#665971':C.well,{part});
 s.box([x-.38*q,y+.1*q,z],[.3*q,.13*q,.48*q],C.bit,{part});s.box([x+.38*q,y+.1*q,z],[.3*q,.13*q,.48*q],C.bit,{part});
 s.box([x,y+.15*q,z],[.21*q,.08*q,.69*q],C.oxide,{part});
 s.box([x,y+.29*q,z],[.18*q,.22*q,.76*q],C.gate,{part,tag:id.startsWith('access')?'wl':'latch',activeColor:C.charge});
 [-.38,.38].forEach(d=>s.cyl([x+d*q,y+.3*q,z],[.1*q,.35*q,.1*q],C.copper,{part}));
}
function ground(s){s.box([0,-.48,0],[60,.025,60],'#14232a',{grid:true});}
function sram(s,o){
 const e=o.explode;
 ground(s);s.box([0,-.15,0],[7.3,.48,5],C.silicon,{part:'substrate'});
 s.box([0,.1,-.95],[4.8,.1,1.3],'#64516b',{part:'well'});
 const y=.14,py=.65+e*1.9;
 transistor(s,-1.25,-1.18,'p1','p',1,y);transistor(s,1.25,-1.18,'p2','p',1,y);
 transistor(s,-1.25,.65,'n1','n',1,y);transistor(s,1.25,.65,'n2','n',1,y);
 transistor(s,-2.85,-.05,'access1','n',.8,y);transistor(s,2.85,-.05,'access2','n',.8,y);
 s.wire([[-3.2,py,1.88],[3.2,py,1.88]],C.wl,'wl',.055);
 s.wire([[-2.85,py,1.88],[-2.85,py,-.05],[-2.85,.5,-.05]],C.wl,'wl');
 s.wire([[2.85,py,1.88],[2.85,py,-.05],[2.85,.5,-.05]],C.wl,'wl');
 s.wire([[-1.64,.47,-1.18],[-1.64,py,-1.18],[-1.64,py,-2.0],[1.64,py,-2.0],[1.64,py,-1.18],[1.64,.47,-1.18]],C.copper,'vdd',.05);
 s.wire([[-1.64,.47,.65],[-1.64,py,.65],[-1.64,py,1.32],[1.64,py,1.32],[1.64,py,.65],[1.64,.47,.65]],'#738690','gnd',.05);
 // The output of each inverter feeds the gates of the opposite inverter.
 s.wire([[-.87,.45,-1.18],[-.87,py,-1.18],[-.87,py,.65],[-.87,.45,.65]],C.bit,'q',.047);
 s.wire([[.87,.45,-1.18],[.87,py,-1.18],[.87,py,.65],[.87,.45,.65]],C.purple,'qb',.047);
 s.wire([[-.87,py,-.4],[-.4,py+.16,-.4],[-.4,py+.16,-.7],[1.25,py+.16,-.7],[1.25,py+.16,-1.18],[1.25,.56,-1.18]],C.bit,'q');
 s.wire([[1.25,py+.16,-.7],[1.25,py+.16,.65],[1.25,.56,.65]],C.bit,'q');
 s.wire([[.87,py,.12],[.25,py+.32,.12],[.25,py+.32,-.1],[-1.25,py+.32,-.1],[-1.25,py+.32,-1.18],[-1.25,.56,-1.18]],C.purple,'qb');
 s.wire([[-1.25,py+.32,-.1],[-1.25,py+.32,.65],[-1.25,.56,.65]],C.purple,'qb');
 s.wire([[-3.65,py,-2.1],[-3.65,py,2.05]],C.bit,'bl',.07);s.wire([[3.65,py,-2.1],[3.65,py,2.05]],C.purple,'blb',.07);
 s.wire([[-3.65,py,-.05],[-3.15,py,-.05],[-3.15,.46,-.05]],C.bit,'bl');
 s.wire([[-2.55,.46,-.05],[-2.55,py,-.05],[-.87,py,-.05]],C.bit,'q');
 s.wire([[3.65,py,-.05],[3.15,py,-.05],[3.15,.46,-.05]],C.purple,'blb');
 s.wire([[2.55,.46,-.05],[2.55,py,-.05],[.87,py,-.05]],C.purple,'qb');
 s.sphere([-.87,py,-.05],[.22,.22,.22],C.charge,{tag:'q',part:'q',dynamic:(m,st)=>{m.glow=st.power&&st.bit===1?.9:0;m.color=R.math.hex(st.bit===1?C.charge:C.dark);}});
 s.sphere([.87,py,-.05],[.22,.22,.22],C.purple,{tag:'qb',part:'qb',dynamic:(m,st)=>{m.glow=st.power&&st.bit===0?.9:0;}});
 s.label('latch','교차 결합 인버터',[0,py+.8,-1.55]);s.label('q','Q',[-.87,py+.15,-.05]);s.label('qb','Q̅',[.87,py+.15,.1]);
 s.label('access','액세스 MOS',[-2.85,.55,-.05]);s.label('wl','워드라인 WL',[-1.2,py,1.9]);s.label('bl','BL',[-3.65,py,-1.65]);s.label('blb','BL̅',[3.65,py,1.1]);
 s.label('substrate','실리콘 기판',[-3.25,-.12,2.3]);
 s.pulse([[-3.65,py,-2.1],[-3.65,py,-.05],[-2.85,py,-.05],[-.87,py,-.05]],'bl');
 s.pulse([[.87,py,-.05],[2.85,py,-.05],[3.65,py,-.05],[3.65,py,2.05]],'blb',C.purple);
}
function dram(s,o){
 ground(s);let e=o.explode;
 s.box([0,-.19,0],[6.0,.52,4.65],C.silicon,{part:'substrate'});
 // Context cells sit behind a magnified, electrically annotated representative cell.
 for(let z of [-1.1,.25])for(let x of [-1.65,0,1.65]){
  if(z===.25&&x===0)continue;
  s.cyl([x,1.95,z],[.75,3.0,.75],'#597576',{part:'capacitor'});
  s.cyl([x,3.48,z],[.7,.05,.7],C.metal);
  s.cyl([x,.28,z],[.15,.48,.15],C.copper);
  s.cyl([x,3.5,z],[.46,.03,.46],'#263e40');
 }
 const x=.15,z=1.15,bottom=.72,h=3.2,cy=bottom+h/2;
 const arc=o.cutaway?{start:2.65,span:4.55}:{};
 s.cyl([x,cy+e*.8,z],[1.11,h,1.11],C.metal,{part:'plate',geo:{inner:.86,...arc}});
 s.cyl([x,cy+e*.4,z],[.94,h,.94],C.wl,{part:'dielectric',geo:{inner:.89,...arc}});
 s.cyl([x,cy,z],[.825,h,.825],C.bit,{part:'storage',geo:{inner:.83,...arc},tag:'charge'});
 s.cyl([x,cy,z],[.67,h-.08,.67],'#234747',{part:'storage',geo:arc});
 // Storage node is connected to one diffusion; the other diffusion to BL.
 transistor(s,-.3,1.18,'access','n',1.18,.14);
 s.cyl([x,.64,z],[.13,.66,.13],C.copper,{part:'contact',tag:'charge'});
 s.box([-.3,.1,.9],[.14,.16,4.1],C.wl,{part:'wl',tag:'wl'});
 s.wire([[-2.7,.61+e*.6,1.2],[-.78,.61+e*.6,1.2],[-.78,.48,1.2]],C.bit,'bl',.065);
 s.box([-2.5,.43,1.2],[.55,.2,.74],C.gate,{part:'sense',tag:'sense'});
 s.wire([[-2.5,.61,1.2],[-2.5,.61,2.08]],C.purple,'blb',.05);
 s.wire([[x,3.95+e*.8,z],[2.65,3.95+e*.8,z],[2.65,.14,z]],C.metal,'plate',.04);
 for(let i=0;i<22;i++){
  let a=2.72+(i%7)/7*4.35,yy=1.05+Math.floor(i/7)*.74;
  s.sphere([x+.405*Math.cos(a),yy,z+.405*Math.sin(a)],[.065,.065,.065],C.charge,{part:'charge',glow:.7,dynamic:(m,st)=>{m.hidden=i>=Math.round((st.cellVoltage??.8)*22);m.glow=st.activeTags.includes('charge')?1.4:.6;}});
 }
 s.label('plate','공통 플레이트 · VDD/2',[1.0,3.9+e*.8,1.15]);
 s.label('dielectric','고유전율 절연막',[.58,2.7+e*.4,1.58]);
 s.label('storage','저장 전극 · 전하 Q',[.15,1.8,1.5]);
 s.label('access','액세스 트랜지스터',[-.4,.6,1.75]);
 s.label('wl','매몰 워드라인 WL',[-.3,.2,-1.9]);
 s.label('sense','센스 앰프',[-2.5,.7,1.25]);
 s.label('bl','비트라인 BL',[-1.6,.65+e*.6,1.2]);
 s.label('substrate','실리콘 기판',[1.8,-.15,2.3]);
 s.pulse([[.15,2.9,1.15],[.15,.66,1.15],[-.78,.61,1.2],[-2.5,.61,1.2]],'charge');
 s.pulse([[-2.5,.61,1.2],[-.78,.61,1.2],[.15,.66,1.15],[.15,2.9,1.15]],'restore',C.charge);
}
function stack(s,o,type){
 ground(s);let e=o.explode,flash=type==='HBF';
 s.box([0,-.04,0],[9.7,.28,5.7],'#254448',{part:'interposer'});
 s.box([0,.18,0],[9.5,.08,5.5],'#52746b',{part:'interposer'});
 for(let i=0;i<8;i++)for(let j=0;j<5;j++)s.sphere([-4.05+i*1.15,-.32,-2.18+j*1.08],[.22,.19,.22],C.copper);
 s.box([-2.4,.44,.0],[3.4,.41,3.6],'#62777b',{part:'processor'});
 s.box([-2.4,.66,0],[3.05,.035,3.25],'#344952',{part:'processor'});
 for(let i=0;i<5;i++)for(let j=0;j<5;j++)s.box([-3.52+i*.55,.69,-1.2+j*.57],[.41,.025,.44],'#496877');
 const base=.66,cx=2.32,dx=3.5,dz=3.65,pitch=.36+e*.59;
 s.box([cx,.49,0],[dx+.18,.45,dz+.16],flash?'#897b69':'#778da1',{part:'base',tag:'base'});
 for(let row=0;row<4;row++)for(let col=0;col<4;col++)s.box([cx-1.22+col*.8,.73,-1.25+row*.78],[.56,.035,.58],flash?'#bc9f6c':'#93b9cb',{part:'base'});
 for(let k=0;k<8;k++){
  let yy=base+.31+k*pitch;
  s.box([cx,yy,0],[dx,.21,dz],flash?'#62637d':C.die,{part:'die',tag:k===o.layer?'array':'',activeColor:flash?'#c7b5fb':'#a1d9d5'});
  s.box([cx,yy+.111,0],[dx-.1,.026,dz-.1],k===o.layer?(flash?'#aa92ce':'#91bec4'):(flash?'#8c83aa':'#68868c'),{part:'die'});
  for(let a=0;a<4;a++)for(let b=0;b<4;b++)s.box([cx-1.24+a*.82,yy+.134,-1.3+b*.86],[.65,.027,.64],flash?(a%2?'#aa98c1':'#b8a9cd'):(a%2?'#90b7bc':'#73949d'),{part:'bank',tag:'array'});
  if(flash)for(let z of [-1.82,1.82])for(let j=0;j<3;j++)s.box([cx,yy-.07+j*.058,z],[dx,.019,.027],j===1?'#bdb5cf':'#8a85a4');
  for(let q=0;q<7;q++)s.sphere([cx-1.43+q*.47,yy-.155,1.57],[.067,.066,.067],C.copper);
 }
 let top=base+.31+7*pitch;
 // Only representative vias and lanes are drawn; these are not one per die/channel.
 for(let side of [-1,1])for(let j=0;j<4;j++)s.cyl([cx+side*1.53,(top+.1)/2+.2,-1.3+j*.86],[.07,top+.1,.07],C.copper,{part:'tsv',tag:'tsv'});
 for(let ch=0;ch<8;ch++){
  let z=-1.35+ch*.39;
  const path=[[cx+1.52,.45,z],[cx+.8,.29,z],[-.25,.29,z],[-.25,.72,z],[-.72,.72,z]];
  s.wire(path,ch<o.lanes?(flash?'#c0a5f0':C.bit):'#456365','lanes',.028);
  if(ch<o.lanes)s.pulse([[cx+1.52,top,z],[cx+1.52,.45,z],...path.slice(1)],'tsv',flash?'#d9b9ff':C.charge,2);
  s.pulse(path,ch<o.lanes?'lanes':'disabled',flash?'#d9b9ff':C.charge,2);
 }
 s.label('processor','가속기 · 연산 로직',[-2.7,.85,1.35]);
 s.label('die',flash?'3D NAND 다이 × 8':'DRAM 다이 × 8',[2.6,top+.5,-1.5]);
 s.label('bank',flash?'독립 서브어레이':'뱅크 · 셀 배열',[2.8,top+.25,.35]);
 s.label('tsv','TSV · 수직 연결',[3.86,Math.max(1.5,top*.6),1.2]);
 s.label('base',flash?'페이지 버퍼 · 제어 로직':'베이스 다이 · I/O',[2.4,.76,1.92]);
 s.label('interposer','인터포저 · 병렬 데이터 경로',[-.2,.27,2.43]);
 if(flash)s.label('cba','NAND 배열 / CMOS 분리',[.8,1.12,1.8]);
}
function nand(s,o){
 ground(s);let e=o.explode,arc=o.cutaway?{start:2.65,span:4.55}:{};
 s.box([0,-.12,0],[6.4,.43,4.8],C.silicon,{part:'substrate'});
 s.box([0,.17,0],[6,.14,4.4],C.metal,{part:'source'});
 const mainX=0,mainZ=1.12,n=8,pitch=.43+e*.21,top=.6+n*pitch;
 for(let x of [-1.8,0,1.8])for(let z of [-1.17,1.12]){
  const selected=x===0&&z===mainZ;
  s.cyl([x,(top+.34)/2,z],[.3,top-.34,.3],'#417f77',{part:'channel',tag:selected?'channel':''});
  if(selected){
   s.cyl([x,(top+.34)/2,z],[.37,top-.34,.37],'#b7d7cc',{part:'tunnel',geo:{inner:.82,...arc}});
   s.cyl([x,(top+.34)/2,z],[.47,top-.34,.47],C.wl,{part:'trap',geo:{inner:.8,...arc}});
   s.cyl([x,(top+.34)/2,z],[.57,top-.34,.57],'#8cadb1',{part:'blocking',geo:{inner:.83,...arc}});
  }
  for(let k=0;k<n;k++){
   const yy=.63+k*pitch;
   s.cyl([x,yy,z],[.91,.27,.91],k===o.row?'#c8bae8':(selected?'#92a4ad':'#657b8a'),{part:'wordline',tag:k===o.row?'wl':'pass',geo:{inner:selected?.63:.4,...(selected?arc:{})}});
   if(!selected)s.cyl([x,yy+.135,z],[.93,.025,.93],'#a7b6c1',{geo:{inner:.4}});
   if(selected&&k===o.row)for(let j=0;j<12;j++){let a=2.7+j/12*4.3;s.sphere([x+.235*Math.cos(a),yy,z+.235*Math.sin(a)],[.045,.06,.045],C.charge,{part:'trap',glow:1.2,dynamic:(m,st)=>{m.hidden=j>=Math.round((st.vt??.3)*12);}});}
  }
  s.cyl([x,.4,z],[.76,.19,.76],'#b68c5e',{part:'select',tag:'select',geo:{inner:.43,...(selected?arc:{})}});
  s.cyl([x,top-.03,z],[.76,.19,.76],'#b68c5e',{part:'select',tag:'select',geo:{inner:.43,...(selected?arc:{})}});
  s.cyl([x,top+.18,z],[.12,.35,.12],C.copper,{part:'bl',tag:'bl'});
 }
 for(let k=0;k<n;k++){
  const y=.63+k*pitch;
  s.box([0,y,-1.17],[4.45,.12,.28],k===o.row?'#c0adde':'#6d8594',{part:'wordline',tag:k===o.row?'wl':'pass'});
  s.box([-2.28,y,0],[.22,.12,2.6],C.copper,{part:'wordline',tag:k===o.row?'wl':'pass'});
  s.box([-1.8,y,.0],[.24,.12,2.4],'#72869a',{part:'wordline'});
 }
 for(let x of [-1.8,0,1.8])s.wire([[x,top+.36,-1.8],[x,top+.36,1.8]],C.bit,'bl',.058);
 s.box([0,.22,2.3],[5.6,.22,.4],'#817f9b',{part:'buffer',tag:'buffer'});
 s.label('bl','비트라인 BL',[1.1,top+.4,1.2]);
 s.label('wordline',`선택 워드라인 WL${o.row}`,[-1.3,.63+o.row*pitch,1.38]);
 s.label('trap','전하 트랩 · 질화막',[.45,1.75,1.4]);s.label('channel','수직 반도체 채널',[0,top-.4,1.32]);
 s.label('tunnel','터널 절연막',[.15,1.15,1.4]);s.label('select','스트링 선택 게이트',[0,top,1.14]);
 s.label('source','공통 소스라인',[-1.35,.31,1.75]);s.label('buffer','페이지 버퍼 / 센싱',[1.4,.48,2.35]);
 s.pulse([[0,top+.36,1.12],[0,top-.03,1.12],[0,.4,1.12],[0,.17,1.12]],'channel',C.charge,4);
 s.pulse([[0,.63+o.row*pitch,1.12],[.24,.63+o.row*pitch,1.32]],'program',C.charge,3);
 s.pulse([[.24,.63+o.row*pitch,1.32],[0,.63+o.row*pitch,1.12]],'erase',C.wl,3);
}
R.buildModel=(scene,type,options)=>{if(!scene.available)return;scene.clear();({SRAM:sram,DRAM:dram,HBM:(s,o)=>stack(s,o,'HBM'),HBF:(s,o)=>stack(s,o,'HBF'),NAND:nand})[type](scene,options);};
})();

/* RAM Lab UI controller. All operations stay in this browser. */
(() => {
'use strict';
const R=window.RAM,$=id=>document.getElementById(id),esc=R.escape,t=R.i18n.t;
let circuitCamera=null;
const validTypes=Object.keys(R.profiles),initial=decodeURIComponent(location.hash.slice(1));
const sim=new R.Simulator(validTypes.includes(initial)?initial:'DRAM');
const state={view:'structure',part:'storage',explode:0,cutaway:true,layer:3,lanes:8,labels:innerWidth>760};
let scene=null,lastTime=performance.now(),elapsed=0,animationTime=0,toastTimer=0,renderScheduled=false;
const defaultParts={SRAM:'latch',DRAM:'storage',HBM:'die',HBF:'die',NAND:'trap'};
const download=(name,blob)=>{let url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);};
function toast(message){$('toast').textContent=t(message);$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,6000);}
function result(r){if(r&&!r.ok)toast(r.error);return r?.ok!==false;}
function options(){return {explode:state.explode,cutaway:state.cutaway,layer:state.layer,lanes:state.lanes,row:sim.row};}
function rebuild(resetCamera=false){if(scene?.available){R.buildModel(scene,sim.type,options());scene.selected=state.part;scene.hideLabels=!state.labels;if(resetCamera)scene.setCamera(sim.type);}}
function choosePart(id,focus=false){
 const parts=R.parts[sim.type];if(!parts[id])id=defaultParts[sim.type];state.part=id;if(scene)scene.selected=id;
 let part=parts[id];$('part-name').textContent=part[0];$('part-en').textContent=part[1];$('part-detail').textContent=part[2];R.i18n.apply(document.querySelector('.part-inspector'));if(focus){const panel=document.querySelector('.inspector');if(panel.scrollHeight>panel.clientHeight)panel.scrollTop=panel.scrollHeight;}
}
function buildNav(){
 $('memory-nav').innerHTML=validTypes.map(type=>{const p=R.profiles[type];return `<button class="memory-nav-button${type===sim.type?' active':''}" data-memory="${type}" aria-current="${type===sim.type?'page':'false'}"><span class="nav-no">${p.num}</span><span><strong>${type}</strong><small>${p.short}</small></span><span class="nav-arrow">›</span></button>`;}).join('');
}
function buildOperations(){
 const ops=[['read','읽기','READ'],['write','쓰기',sim.flash?'PROGRAM':'WRITE']];if(sim.cap)ops.push(['refresh','리프레시','REF'],['precharge','행 닫기','PRE']);if(sim.flash)ops.push(['erase','블록 소거','ERASE']);
 $('operation-select').innerHTML=ops.map(([op,title,eng])=>`<button class="op-button${sim.op===op?' active':''}" data-op="${op}" aria-pressed="${sim.op===op}">${title}<small>${eng}</small></button>`).join('');
}
function updateProfile(){
 const p=R.profiles[sim.type];document.documentElement.style.setProperty('--accent',p.color);
 $('memory-title').textContent=sim.type;$('memory-subtitle').textContent=p.subtitle;$('memory-unit').textContent=p.unit;$('volatility').textContent=p.badge;$('profile-num').textContent=p.num;$('intro-note').textContent=R.summaries[sim.type].intro;$('data-summary').textContent=R.summaries[sim.type].data;$('model-summary').textContent=R.summaries[sim.type].model;
 $('concept-title').textContent=p.concept;$('formula').textContent=p.formula;$('formula-note').textContent=p.formulaNote;$('data-meaning').textContent=p.data;$('model-caveat').textContent=p.caveat;
 $('profile-facts').innerHTML=p.facts.map(([a,b])=>`<div><span>${a}</span><span>${b}</span></div>`).join('');
 $('scene-title').textContent=({SRAM:'6T SRAM / CROSS-COUPLED LATCH',DRAM:'1T1C / CELL CROSS-SECTION',HBM:'HBM / DRAM STACK & INTERPOSER',HBF:'HBF / NAND-BASED PARALLEL MEMORY',NAND:'3D NAND / VERTICAL CHARGE-TRAP STRING'})[sim.type];
 $('scene-note').textContent=sim.type==='HBF'?'공개 구조 기반 개념 모델 · 축척 비례 아님':'대표 구조 · 축척 비례 아님';
 $('flash-controls').hidden=!sim.flash;$('cap-controls').hidden=!sim.cap;$('lane-controls').hidden=!(sim.type==='HBM'||sim.type==='HBF');
 $('layer-control').hidden=!(sim.type==='HBM'||sim.type==='HBF');$('cutaway').closest('label').hidden=!(sim.type==='DRAM'||sim.type==='NAND');
 $('bank-wrapper').hidden=sim.mem.cells.length===1;$('bank-wrapper').firstChild.textContent=sim.flash?'BLOCK ':'BANK ';
 $('bpc').value=sim.bpc;$('bank').innerHTML=Array.from({length:sim.mem.cells.length},(_,i)=>`<option value="${i}">${i}</option>`).join('');
 $('data-hex').maxLength=sim.flash?sim.bpc*2:2;$('data-hex').value=sim.targetHex;$('row').value=sim.row;$('col').value=sim.col;$('bank').value=sim.bank;
 $('word-size').textContent=sim.flash?`${8*sim.bpc}-BIT CELL WINDOW`:'8-BIT WORD';
 $('input-note').textContent=sim.flash?'한 WL의 8개 셀 표본입니다. MLC 이상은 여러 논리 페이지의 상태를 함께 표현합니다.':'목표 데이터를 입력하고 ‘쓰기’ 동작을 재생하세요.';
 $('signal-graph-title').textContent=sim.flash?'THRESHOLD DISTRIBUTION':'SIGNAL TIMING';
 $('signal-graph-title').nextElementSibling.textContent=sim.flash?'정규화 Vt · 예시 분포':'시간축 정규화 · 설명용';
 $('layer').value=state.layer;
 if(scene?.mode==='software')$('scene-note').textContent+=' · 소프트웨어 3D';
 buildNav();buildOperations();choosePart(defaultParts[sim.type]);rebuild(true);circuitCamera?.setType(sim.type);render();R.i18n.apply();
}
function selectType(type,updateHash=true){if(!validTypes.includes(type)||type===sim.type)return;sim.selectType(type);elapsed=0;state.layer=3;if(updateHash){try{history.replaceState(null,'','#'+type);}catch(_){location.hash=type;}}updateProfile();}
function setView(view){state.view=view;$('viewport').dataset.view=view;document.querySelectorAll('[data-view]').forEach(b=>{let active=b.dataset.view===view;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});
 $('webgl-container').hidden=view!=='structure';$('circuit-view').hidden=view!=='circuit';$('array-view').hidden=view!=='array';$('view-hint').hidden=view!=='structure';
 document.querySelector('.model-controls').hidden=view!=='structure';document.querySelector('.visual-legend').hidden=view!=='structure';
 ['labels-toggle','snapshot-button','rotate-toggle'].forEach(id=>$(id).disabled=view!=='structure');$('reset-camera').disabled=view==='array';$('circuit-tools').hidden=view!=='circuit';
 if(view==='structure')scene?.resize();if(view==='circuit')circuitCamera?.resize();render();
}
function metric(label,value,unit='',active=false){return `<div class="metric${active?' changed':''}"><span>${esc(label)}</span><b>${esc(value)}</b><small>${esc(unit)}</small></div>`;}
function displayBits(v,bpc){return v===null?'X'.repeat(bpc):v.toString(2).padStart(bpc,'0');}
function pack(values,bpc){if(!values||values.includes(null))return null;return values.reduce((n,v)=>n*(1<<bpc)+v,0);}
function hexOf(values,bpc){let value=pack(values,bpc);return value===null?'X'.repeat(bpc*2):value.toString(16).toUpperCase().padStart(bpc*2,'0');}
function decodedText(values,bpc){let value=pack(values,bpc);if(value===null)return t('저장 정보의 유효성을 보장할 수 없습니다.');const bytes=Array.from({length:bpc},(_,i)=>(value>>>(8*(bpc-1-i)))&255);
 let utf8;try{utf8=new TextDecoder('utf-8',{fatal:true}).decode(new Uint8Array(bytes));if(/[\x00-\x1f\x7f]/.test(utf8))utf8=t('제어 문자 포함');else utf8=`“${utf8}”`;}catch(_){utf8=t('단독 UTF-8 문자로 해석 불가');}
 return `DEC ${value.toLocaleString('en-US')} · UTF-8 ${utf8}`;
}
function renderData(){
 const bpc=sim.flash?sim.bpc:1,values=sim.rowValues(),q=sim.signals();
 $('data-address').textContent=`${sim.flash?'BLOCK':'B'}${sim.bank} / ${sim.flash?'WL':'R'}${sim.row}`;
 $('bit-strip').innerHTML=values.map((v,i)=>`<button class="bit-cell${v?' high':''}${i===sim.col?' selected':''}${sim.flash?' flash':''}" data-cell="${i}" aria-label="열 ${i}, ${displayBits(v,bpc)}" style="--fill:${sim.flash?(sim.mem.cells[sim.bank][sim.row][i]+.5)/(1<<bpc):sim.mem.volts[sim.bank][sim.row][i]}">${sim.flash?'<i></i>':''}<strong>${displayBits(v,bpc)}</strong><span>${sim.flash?'S':'b'}${i}</span></button>`).join('');
 $('stored-hex').textContent='0x'+hexOf(values,bpc);const value=pack(values,bpc);$('stored-decimal').textContent=value===null?'UNDEFINED':'DEC '+value.toLocaleString('en-US');
 $('row-state').textContent=sim.cap?(sim.mem.openRows[sim.bank]===sim.row?'ROW OPEN':'ROW CLOSED'):sim.flash?(sim.mem.programmed[sim.bank][sim.row]?'PROGRAMMED':'ERASED'):(sim.mem.power?'LATCH HELD':'UNDEFINED');
 $('cell-state-note').textContent=sim.flash?`${8}개 스트링의 WL${sim.row} 셀 표본 · 실제 페이지 크기와 다름 · 예시 Gray 코드`:'8개 셀의 논리 상태입니다. 셀 선택은 관찰할 열을 바꾸며 데이터를 쓰지 않습니다.';
 const out=sim.mem.output;$('readout-value').textContent=out?'0x'+hexOf(out,bpc):'-';$('readout-status').textContent=out?(sim.op==='write'?'WRITE VERIFIED':'DATA LATCHED'):sim.mem.power?'NOT LATCHED':'POWER OFF';
 $('readout-note').textContent=out?decodedText(out,bpc):t('읽기는 출력 데이터, 쓰기는 모델 내부 검증 결과를 표시합니다.');
 $('power-note').textContent=sim.flash?(sim.mem.power?'전하 상태는 전원 없이도 유지됩니다. 보존 기간은 무한하지 않습니다.':'전원 OFF · 셀 문턱 상태 유지 · 버퍼와 I/O는 정지'):(sim.mem.power?'전원에 의존하는 저장 상태입니다. 전원을 꺼서 차이를 확인하세요.':'전원 OFF · X는 유효성 보장 종료를 뜻하며, 즉각적인 물리 방전을 뜻하지 않습니다.');
}
function renderSequence(){
 $('sequence').style.setProperty('--steps',sim.steps.length);
 $('sequence').innerHTML=sim.steps.map((step,i)=>`<button class="sequence-step${i===sim.index?' active':''}${i<sim.index?' complete':''}" data-step="${i}" aria-label="${i+1}단계: ${esc(step.title)}" aria-current="${i===sim.index?'step':'false'}"><span class="step-num">${i<sim.index?'✓':String(i+1).padStart(2,'0')}</span><span class="step-label">${esc(R.i18n.flowLabel(step.code))}</span></button>`).join('');
 document.querySelectorAll('[data-op]').forEach(b=>{b.classList.toggle('active',b.dataset.op===sim.op);b.setAttribute('aria-pressed',String(b.dataset.op===sim.op));});
 $('play-button').innerHTML=sim.playing?'Ⅱ <span>일시 정지</span>':sim.done?'↺ <span>다시 재생</span>':'▶ <span>동작 재생</span>';
 $('play-button').setAttribute('aria-label',sim.playing?'동작 일시 정지':'동작 재생');$('play-button').disabled=!sim.mem.power;
 $('previous-button').disabled=sim.index===0||!sim.mem.power;$('next-button').disabled=sim.done||!sim.mem.power;
 $('operation-state').textContent=!sim.mem.power?'POWER OFF':sim.playing?'RUNNING':sim.done?'OPERATION COMPLETE':'STEP MODE';
 document.body.classList.toggle('paused',!sim.playing);$('power-toggle').classList.toggle('off',!sim.mem.power);$('power-toggle').setAttribute('aria-pressed',String(sim.mem.power));$('power-toggle').innerHTML=`<i></i>전원 ${sim.mem.power?'ON':'OFF'}`;
 R.i18n.apply(document.querySelector('.operation-panel'));R.i18n.apply($('power-toggle'));
}
function renderArray(){
 let m=sim.mem,flash=sim.flash,bpc=flash?sim.bpc:1;
 $('array-view').innerHTML=`<div class="array-heading"><span>${flash?'한 블록의 WL / 스트링 표본':'행·열 주소로 선택하는 셀 배열'}</span><small>${flash?'8 WL × 8 STRINGS':'8 ROWS × 8 COLUMNS'}</small></div><div class="array-grid"><span></span>${Array.from({length:8},(_,i)=>`<span class="array-axis">${flash?'S':'C'}${i}</span>`).join('')}${m.cells[sim.bank].map((row,r)=>`<span class="array-axis">${flash?'WL':'R'}${r}</span>${row.map((raw,c)=>{let v=flash?R.levelToSymbol(raw,bpc):raw;return `<button class="array-cell${v?' high':''}${r===sim.row?' selected-row':''}${r===sim.row&&c===sim.col?' selected':''}${flash?' flash':''}" data-row="${r}" data-col="${c}" aria-label="행 ${r}, 열 ${c}, 상태 ${displayBits(v,bpc)}" style="--fill:${flash?(raw+.5)/(1<<bpc):m.volts[sim.bank][r][c]}">${displayBits(v,bpc)}</button>`;}).join('')}`).join('')}</div><p class="array-note">${flash?'프로그램은 선택 페이지 표본에, 소거는 이 블록 전체에 적용됩니다.':'행을 바꾸어 다시 읽으면 행 적중과 새 행 접근의 차이를 확인할 수 있습니다.'}</p>`;
}
function render(){
 const p=R.profiles[sim.type],q=sim.signals(),step=sim.step;
 $('stage-code').textContent=sim.mem.power?step.code:'POWER OFF';$('stage-counter').textContent=`${String(sim.index+1).padStart(2,'0')} / ${String(sim.steps.length).padStart(2,'0')}`;
 $('stage-intro').textContent=sim.mem.power?step.title:'';
 $('stage-title').textContent=sim.mem.power?R.i18n.flowLabel(step.code):(sim.flash?'셀 상태는 남고, I/O는 멈춥니다.':'저장 데이터의 유효성이 사라졌습니다.');
 $('stage-detail').textContent=sim.mem.power?step.detail:(sim.flash?'비휘발성 저장층의 상태는 유지되지만 전원이 없는 회로는 읽기·쓰기를 수행할 수 없습니다.':'다시 전원을 켜도 이전 데이터가 자동 복원되지 않습니다. X는 논리 데이터가 정의되지 않았다는 의미입니다.');
 if(sim.flash){$('live-metrics').innerHTML=metric('CELL STATE',sim.activeValue===0?'E':'P'+sim.activeValue,'',true)+metric('Vt · NORMALIZED',q.vt.toFixed(2))+metric('BITS / CELL',sim.bpc,'bit')+metric('BLOCK ERASES',sim.mem.eraseCount[sim.bank],'cycles');}
 else if(sim.type==='SRAM'){$('live-metrics').innerHTML=metric('STORAGE NODE Q',q.bit===null?'X':q.bit,'',true)+metric('COMPLEMENT Q̅',q.bit===null?'X':1-q.bit)+metric('WORD LINE',q.wl,'logic')+metric('BL − BL̅',(q.bl-q.blb).toFixed(2),'V');}
 else {$('live-metrics').innerHTML=metric('CELL VOLTAGE',q.cellVoltage.toFixed(3),'V',true)+metric('BIT LINE',q.bl.toFixed(3),'V')+metric('WORD LINE',q.wl,'logic')+metric('STORED BIT',q.bit===null?'X':q.bit);}
 $('signal-graph').innerHTML=R.signalChart(sim);
 $('vref-value').textContent=sim.readRef.toFixed(2);$('conduct-label').textContent=sim.mem.power?`Vref ${q.conducting?'≥':'<'} Vt → ${q.conducting?'선택 셀 도통 가능':'선택 셀 차단'} · 비선택 셀 통과 조건 가정`:'전원 OFF · 읽기 바이어스가 없어 전류를 감지하지 않습니다.';
 $('refresh-enabled').checked=sim.mem.refreshEnabled;$('age-note').textContent=`가상 경과 ${sim.mem.ageMs} ms · 예시 τ = 40 ms · 실제 장치 사양 아님`;
 $('lanes-preview').innerHTML=Array.from({length:8},(_,i)=>`<i class="${i<state.lanes?'on':''}"></i>`).join('');
 $('row').value=sim.row;$('col').value=sim.col;$('bank').value=sim.bank;
 $('labels-toggle').classList.toggle('active',state.labels);$('labels-toggle').setAttribute('aria-pressed',String(state.labels));
 renderSequence();renderData();if(state.view==='circuit')$('circuit-surface').innerHTML=R.circuit(sim);if(state.view==='array')renderArray();
 if(scene)scene.hideLabels=!state.labels;
 R.i18n.apply();
}
function prepare(op){elapsed=0;document.querySelector('.inspector').scrollTop=0;if(!sim.mem.power){toast('먼저 전원을 켜세요.');return;}if(op==='write')sim.targetHex=$('data-hex').value.trim();if(result(sim.setOperation(op)))render();}
function play(){
 if(!sim.mem.power)return;
 if(sim.playing){sim.playing=false;renderSequence();return;}
 if(sim.done&&!result(sim.restart()))return;
 if(!result({ok:!sim.validate(sim.op),error:sim.validate(sim.op)}))return;
 sim.playing=true;elapsed=0;renderSequence();
}
function address(row=sim.row,col=sim.col,bank=sim.bank){sim.address(bank,row,col);elapsed=0;if(sim.type==='NAND')rebuild();render();}
function openDialog(title,html){$('dialog-title').textContent=title;$('dialog-body').innerHTML=html;R.i18n.apply($('info-dialog'));if(!$('info-dialog').open)$('info-dialog').showModal();}
function showSources(){
 const p=R.profiles[sim.type],sources=R.sources.filter(s=>p.sourceIds.includes(s.id));
 openDialog(`${sim.type} · 근거와 모델 범위`, `<div class="disclaimer-box"><strong>구조 기반 교육 모델입니다.</strong><br>${esc(p.caveat)}<br>3D 형상·색상·층수·배선 수·시간축은 구분과 학습을 위한 표현입니다. SPICE / TCAD / 실제 메모리 컨트롤러 시뮬레이션이 아닙니다.</div><h3>검토 기준</h3><p>확인일: <strong>2026-09-10</strong><br>RAM 참조 리비전: <code>a2c3cbd</code> (2026-09-01)<br>이 앱은 제조 공정·식각 장비·시장 가격을 모델링하지 않습니다.</p><h3>이 화면의 근거 자료</h3>${sources.map(s=>`<div class="source"><a href="${s.url}" target="_blank" rel="noopener noreferrer"><b>${esc(s.label)} ↗</b></a><small>${esc(s.org)}</small><p>${esc(s.note)}</p></div>`).join('')}<h3>계산과 단순화</h3><p>SRAM: 이상적인 안정 상태 전이이며 소자 비율과 read disturb는 계산하지 않습니다. DRAM: 전하 공유는 전하 보존식, 누설은 V(t)=0.5+(V₀−0.5)e^(−t/40ms)로 계산하는 예시입니다. |V−0.5| &lt; 0.035 V에서는 X로 표시합니다. 실제 리텐션·불량률을 예측하는 값이 아닙니다.</p><p>NAND/HBF: 8×8 셀은 물리 페이지·블록의 축소 표본입니다. 문턱 순서, 읽기 비교, 프로그램 및 블록 소거 제약만 실행합니다. Gray 매핑·분포 폭은 예시이고 ECC·FTL·마모 분산·제품별 ISPP는 구현하지 않았습니다. 비휘발성은 무한 보존을 의미하지 않습니다.</p><p>미완료 연산 중 종류·주소를 바꾸면 그 연산은 취소됩니다. 이전 단계로 돌아가면 이번 연산의 시작 상태부터 재연산합니다. 브라우저 새로고침은 교육용 초기 상태를 불러옵니다.</p>`);
}
function showHelp(){openDialog('RAM Lab 사용법',`<p>메모리를 고르고 3D 구조·회로·셀 배열에서 같은 데이터를 관찰하세요.</p><h3>회로 확대와 모바일 조작</h3><p>회로에서는 +/− 버튼, 휠 또는 두 손가락 핀치로 확대하고 드래그로 이동합니다. ‘전체 보기’는 회로 전체를 맞추고, ‘기본 배율’은 글자를 읽기 좋은 크기로 되돌립니다. 좁은 화면의 기본 회로는 100% 배율이며 좌우로 이동해 봅니다.</p><p>언어는 상단의 KR/EN에서 바꿉니다. 입력값·메모리 상태·재생 단계·회로 확대 위치는 유지되며, 언어 선택만 브라우저에 저장됩니다. 상세 설명은 펼쳐 읽고, 작은 화면에서는 셀 배열과 비교표만 내부 스크롤로 탐색합니다.</p><h3>첫 번째 실험 · DRAM 읽기</h3><p>‘읽기’를 선택한 뒤 ‘다음’을 눌러 프리차지, ACT, 전하 공유, 감지, 복원, 출력을 확인하세요. 읽기가 끝나면 행이 열린 상태입니다. 같은 행에서 ‘읽기’를 다시 선택하면 ROW HIT 경로가 나타납니다.</p><h3>두 번째 실험 · 다른 데이터를 저장</h3><p>DATA INPUT에 16진수를 입력합니다. ‘쓰기’를 선택하고 끝까지 재생하면 실제 모델 상태가 바뀝니다. ‘UTF-8 → HEX’는 선택한 워드가 담을 수 있는 첫 바이트들을 사용하며 나머지는 알림으로 명시합니다.</p><h3>세 번째 실험 · 전원과 누설</h3><p>전원 OFF는 SRAM·DRAM·HBM의 데이터를 X로, NAND·HBF는 문턱 상태를 그대로 표시합니다. 실제 즉시 방전을 뜻하지 않습니다. DRAM에서는 자동 리프레시를 끄고 가상 시간을 늘려 읽기 마진이 작아지는 모습을 비교하세요.</p><h3>네 번째 실험 · NAND 페이지와 블록</h3><p>TLC·QLC를 선택하면 셀당 상태 수와 표현 비트가 함께 바뀝니다. 이 변경은 현재 메모리 유형을 초기화합니다. 페이지를 한 번 기록한 뒤 다시 쓰면 차단됩니다. ‘블록 소거’를 끝까지 실행하면 블록의 모든 셀이 E로 돌아옵니다.</p><div class="keygrid"><div><span>재생 / 일시 정지</span><kbd>Space</kbd></div><div><span>이전 / 다음 단계</span><kbd>← / →</kbd></div><div><span>3D 시점 초기화</span><kbd>R</kbd></div><div><span>사용법</span><kbd>?</kbd></div><div><span>카메라 이동</span><kbd>Shift + Drag</kbd></div><div><span>확대 / 축소</span><kbd>Wheel / Pinch</kbd></div><div><span>회로의 확대 / 전체 보기</span><kbd>+ / − / F</kbd></div><div><span>회로의 기본 배율</span><kbd>0 / R</kbd></div></div><p>‘분해’는 모델의 전극·배선 또는 다이 간격을 벌립니다. ‘관찰 다이’는 시각적 관찰만, BANK/ROW/COL은 시뮬레이션의 실제 표본 주소를 바꿉니다. 광점은 전자 궤적이 아닌 진행 방향 표시입니다.</p><p>외부 계정·서버·분석 서비스로 데이터를 전송하지 않습니다. 모든 동작은 브라우저 안에서 수행됩니다. 출처 링크는 별도 탭에서 열립니다.</p>`);}
function showCompare(){openDialog('같은 비트, 서로 다른 저장 방식',`<p>HBM과 DRAM은 같은 저장 원리를, HBF와 NAND도 같은 계열의 저장 원리를 공유합니다. 대역폭·지연·용량·접근 단위를 한 줄의 속도 순서로 합치지 않습니다.</p><div class="comparison-scroll"><table class="comparison"><thead><tr><th>종류</th><th>셀의 물리적 상태</th><th>읽기</th><th>쓰기 / 소거</th><th>전원</th></tr></thead><tbody><tr><td>SRAM</td><td>6T 래치의 상보 논리 전압</td><td>비트라인 차동 감지</td><td>래치 상태 전환</td><td>필요</td></tr><tr><td>DRAM</td><td>1T1C 저장 노드 전압</td><td>전하 공유 → 감지 → 복원</td><td>열린 행의 전압 구동</td><td>전원 + 리프레시</td></tr><tr><td>HBM</td><td>적층 DRAM의 1T1C</td><td>DRAM 접근 + 넓은 병렬 전송</td><td>DRAM과 동일한 셀 동작</td><td>전원 + 리프레시</td></tr><tr><td>HBF</td><td>NAND 전하 저장층</td><td>NAND 센싱 + 병렬 데이터 경로</td><td>프로그램 / 블록 소거. 호스트 제약은 구현별</td><td>비휘발성*</td></tr><tr><td>NAND</td><td>트랩 전하에 따른 Vt</td><td>기준 바이어스와 전류 비교</td><td>페이지 프로그램 / 블록 소거</td><td>비휘발성*</td></tr></tbody></table></div><p>* 보존 기간·내구성은 유한하며 환경과 제품에 의존합니다. HBF의 보존 요구를 장기 저장용 SSD와 같다고 가정하지 않습니다.</p><h3>이 앱의 공통 실험 단위</h3><p>휘발성 셀은 8×8비트 표본, NAND 계열은 8개 WL × 8개 스트링 표본을 사용합니다. 이는 비교를 위한 크기이며 실제 워드·페이지·블록·뱅크 크기를 뜻하지 않습니다.</p><p><a href="${R.repo}/tree/${R.commit}" target="_blank" rel="noopener noreferrer">RAM 원문 및 각 장의 출처 ↗</a></p>`);}
function bind(){
 document.addEventListener('click',e=>{const button=e.target.closest('[data-lang]');if(button)R.i18n.setLanguage(button.dataset.lang);});
 document.addEventListener('ram:languagechange',()=>{
   // This only re-renders presentation. No simulator seek, reset or type change.
   render();R.i18n.apply();
   if(scene){scene.labels.innerHTML='';scene.labelNodes=null;scene.labelLines=null;}
 });
 $('memory-nav').addEventListener('click',e=>{let b=e.target.closest('[data-memory]');if(b)selectType(b.dataset.memory);});
 document.querySelector('.view-tabs').addEventListener('click',e=>{let b=e.target.closest('[data-view]');if(b)setView(b.dataset.view);});
 $('operation-select').addEventListener('click',e=>{let b=e.target.closest('[data-op]');if(b)prepare(b.dataset.op);});
 $('sequence').addEventListener('click',e=>{let b=e.target.closest('[data-step]');if(b){sim.seek(Number(b.dataset.step));elapsed=0;render();}});
 $('play-button').onclick=play;$('next-button').onclick=()=>{sim.playing=false;sim.advance();elapsed=0;render();};$('previous-button').onclick=()=>{sim.seek(sim.index-1);elapsed=0;render();};$('replay-button').onclick=()=>{result(sim.restart());elapsed=0;render();};
 $('row').onchange=()=>address(Number($('row').value));$('col').onchange=()=>address(sim.row,Number($('col').value));$('bank').onchange=()=>address(sim.row,sim.col,Number($('bank').value));
 $('array-view').addEventListener('click',e=>{let b=e.target.closest('[data-row]');if(b)address(Number(b.dataset.row),Number(b.dataset.col));});
 $('bit-strip').addEventListener('click',e=>{let b=e.target.closest('[data-cell]');if(b)address(sim.row,Number(b.dataset.cell));});
 $('speed').onchange=()=>{sim.speed=Number($('speed').value);};
 $('reset-button').onclick=()=>{sim.reset();elapsed=0;render();toast(`${sim.type}의 모든 표본 뱅크를 초기 상태로 되돌렸습니다.`);};
 $('power-toggle').onclick=()=>{sim.power(!sim.mem.power);elapsed=0;render();};
 $('data-hex').addEventListener('input',()=>{
  if(sim.op==='write'&&!sim.done){sim.cancel();sim.base=null;sim.targetHex=$('data-hex').value.trim();sim.setOperation('read');toast('입력 변경으로 미완료 쓰기를 취소했습니다. 새 값으로 쓰기를 선택하세요.');}
  else sim.targetHex=$('data-hex').value.trim();
  let valid=true;try{sim.targetSymbols();}catch(_){valid=false;}
  $('data-hex').parentElement.classList.toggle('invalid',!valid);$('hex-valid').textContent=valid?'HEX':'INVALID';if(sim.op==='read')render();
 });
 $('encode-button').onclick=()=>{let bytes=new TextEncoder().encode($('text-input').value),size=sim.flash?sim.bpc:1;if(!bytes.length){toast('변환할 문자를 입력하세요.');return;}sim.cancel();sim.base=null;sim.targetHex=Array.from(bytes.slice(0,size),b=>b.toString(16).padStart(2,'0')).join('').toUpperCase().padEnd(size*2,'0');$('data-hex').value=sim.targetHex;$('data-hex').parentElement.classList.remove('invalid');$('hex-valid').textContent='HEX';sim.setOperation('read');render();toast(bytes.length>size?`UTF-8 ${bytes.length}바이트 중 첫 ${size}바이트만 로드했습니다. 나머지는 별도 워드가 필요합니다.`:`UTF-8을 0x${sim.targetHex}로 변환했습니다. 남는 공간은 00으로 채웁니다.`);};
 $('bpc').onchange=()=>{sim.format(Number($('bpc').value));updateProfile();toast('셀당 비트 형식이 바뀌어 현재 메모리 유형을 초기화했습니다.');};
 $('vref').oninput=()=>{sim.readRef=Number($('vref').value);render();};
 $('refresh-enabled').onchange=()=>{sim.cancel();sim.mem.refreshEnabled=$('refresh-enabled').checked;sim.base=JSON.parse(JSON.stringify(sim.mem));sim.setOperation('read');render();};
 $('age-button').onclick=()=>{sim.age(20);render();};
 $('lanes').onchange=()=>{state.lanes=sim.lanes=Number($('lanes').value);rebuild();render();};
 $('layer').onchange=()=>{state.layer=Number($('layer').value);rebuild();};
 $('explode').oninput=()=>{state.explode=Number($('explode').value);$('explode-value').textContent=Math.round(state.explode*100)+'%';rebuild();};
 $('cutaway').onchange=()=>{state.cutaway=$('cutaway').checked;rebuild();};
 $('labels-toggle').onclick=()=>{state.labels=!state.labels;render();};
 $('rotate-toggle').onclick=()=>{if(!scene)return;scene.autoRotate=!scene.autoRotate;$('rotate-toggle').setAttribute('aria-pressed',String(scene.autoRotate));$('rotate-toggle').textContent=t(scene.autoRotate?'회전 정지':'자동 회전');};
 $('reset-camera').onclick=()=>{if(state.view==='circuit')circuitCamera?.reset();else scene?.setCamera(sim.type);};
 $('snapshot-button').onclick=()=>{if(!scene?.available){toast('WebGL 장면이 없습니다.');return;}scene.render(sim.signals(),animationTime,0);$('scene').toBlob(blob=>{if(blob){download(`RAM-${sim.type}-${sim.step.code.replace(/\W+/g,'-')}.png`,blob);toast('3D 장면 PNG를 저장했습니다. HTML 주석은 포함되지 않습니다.');}});};
 $('fullscreen-button').onclick=async()=>{
  const card=document.querySelector('.viewer-card');
  try{
   if(document.fullscreenElement)await document.exitFullscreen();
   else if(card.classList.contains('is-expanded')){card.classList.remove('is-expanded');document.body.style.overflow='';}
   else if(card.requestFullscreen){try{await card.requestFullscreen();}catch(_){card.classList.add('is-expanded');document.body.style.overflow='hidden';}}
   else{card.classList.add('is-expanded');document.body.style.overflow='hidden';}
   setTimeout(()=>{scene?.resize();circuitCamera?.resize();},60);
  }catch(_){toast('이 브라우저 환경은 전체 화면을 허용하지 않습니다.');}
 };
 window.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.viewer-card').classList.remove('is-expanded');document.body.style.overflow='';}});

 $('export-button').onclick=()=>{download(`RAM-${sim.type}-state.json`,new Blob([JSON.stringify(sim.snapshot(),null,2)],{type:'application/json'}));toast('현재 모델 상태를 JSON으로 저장했습니다.');};
 $('sources-button').onclick=showSources;$('profile-sources').onclick=showSources;$('help-button').onclick=showHelp;$('compare-button').onclick=showCompare;$('dialog-close').onclick=()=>$('info-dialog').close();
 $('info-dialog').addEventListener('click',e=>{if(e.target===$('info-dialog')){let r=$('info-dialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('info-dialog').close();}});
 $('fallback-circuit').onclick=()=>setView('circuit');
 window.addEventListener('hashchange',()=>{let type=location.hash.slice(1);if(validTypes.includes(type))selectType(type,false);});
 window.addEventListener('keydown',e=>{if(e.target.closest('#circuit-view,#circuit-tools,[data-lang]')||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||$('info-dialog').open)return;if(e.code==='Space'){e.preventDefault();play();}if(e.key==='ArrowRight'){e.preventDefault();sim.playing=false;sim.advance();render();}if(e.key==='ArrowLeft'){e.preventDefault();sim.seek(sim.index-1);render();}if(e.key.toLowerCase()==='r'){if(state.view==='circuit')circuitCamera?.reset();else scene?.setCamera(sim.type);}if(e.key==='?')showHelp();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&sim.playing){sim.playing=false;renderSequence();}});
}
function frame(now){let dt=Math.min((now-lastTime)/1000,.08);lastTime=now;
 if(sim.playing){elapsed+=dt*sim.speed;animationTime+=dt*sim.speed;if(elapsed>=1.55){elapsed=0;sim.advance();render();}}
 if(scene?.available&&state.view==='structure'&&!document.hidden)scene.render(sim.signals(),animationTime,dt);
 requestAnimationFrame(frame);
}
function init(){
 ['row','col','layer'].forEach(id=>$(id).innerHTML=Array.from({length:8},(_,i)=>`<option value="${i}">${id==='layer'?'D':''}${i}</option>`).join(''));
 $('layer').value=state.layer;
 try{scene=new R.Scene($('scene'),$('model-labels'),id=>choosePart(id,true));}catch(e){console.error('3D initialization failed',e);}
 if(!scene?.available){$('webgl-error').hidden=false;$('snapshot-button').disabled=true;}
 circuitCamera=new R.CircuitViewport($('circuit-view'),$('circuit-surface'),$('circuit-zoom-value'));
 $('stage-code').dataset.noI18n='';
 if(innerWidth<760)document.querySelector('.stage-explanation').open=false;
 bind();updateProfile();R.i18n.apply();requestAnimationFrame(frame);
 // Explicit read-only debug/test surface. No network access or hidden storage.
 window.RAMLab={sim,state,get scene(){return scene;},get circuitCamera(){return circuitCamera;},i18n:R.i18n,render,selectType,setView,prepare,showSources};
}
init();
})();

/* Offline, deterministic localization of presentation text.
   The catalogs never touch simulator state, HEX values or user-entered strings.
   Source text is retained per DOM node so toggling languages is reversible. */
(() => {
  'use strict';
  const R=window.RAM, entries=new Map(), records=new WeakMap();
  const clean=s=>String(s).replace(/[\u2013\u2014]/g,'-').replace(/\s+/g,' ').trim();
  let language='ko';
  try { const saved=localStorage.getItem('ram-lab.language');if(saved==='en'||saved==='ko')language=saved; } catch (_) { /* Storage may be disabled for local files. */ }
  const missing=new Set();
  function register(rows) {
    for(const row of rows){
      const [source,ko,en]=row.length===2?[row[0],row[0],row[1]]:row;
      const pair={ko:clean(ko),en:clean(en)};
      entries.set(clean(source),pair);
      // Aliases allow an updated DOM fragment to be re-localized safely.
      if(!entries.has(clean(ko)))entries.set(clean(ko),pair);
      if(!entries.has(clean(en)))entries.set(clean(en),pair);
    }
  }
  register(R.localeEntries||[]);
  function select(ko,en){return language==='en'?en:ko;}
  const patterns=[
    [/^(.*) · 소프트웨어 3D$/,(_,base)=>t(base)+' · '+t('소프트웨어 3D')],
    [/^선택 워드라인 WL(\d+)$/,(_,n)=>select(`선택 WL${n}`,`Selected WL${n}`)],
    [/^NAND 배열 (\d+)$/,(_,n)=>select(`NAND 배열 ${n}`,`NAND array ${n}`)],
    [/^DRAM 뱅크 (\d+)$/,(_,n)=>select(`DRAM 뱅크 ${n}`,`DRAM bank ${n}`)],
    [/^(\d+) representative paths$/,(_,n)=>select(`대표 ${n}개 경로`,`${n} example paths`)],
    [/^(\d+) path(s)?$/,(_,n)=>select(`${n}개 경로`,`${n} path${n==='1'?'':'s'}`)],
    [/^(\d+)-BIT CELL WINDOW$/,(_,n)=>select(`${n}비트 셀 표본`,`${n}-BIT SAMPLE`)],
    [/^열 (\d+), (.+)$/,(_,n,b)=>select(`열 ${n}, ${b}`,`Column ${n}, ${b}`)],
    [/^행 (\d+), 열 (\d+), 상태 (.+)$/,(_,r,c,b)=>select(`행 ${r}, 열 ${c}, 상태 ${b}`,`Row ${r}, column ${c}, state ${b}`)],
    [/^(\d+)단계: (.+)$/,(_,n,title)=>select(`${n}단계: ${title}`,`Stage ${n}: ${t(title)}`)],
    [/^8개 스트링의 WL(\d+) 셀 표본 · 실제 페이지 크기와 다름 · 예시 Gray 코드$/,(_,r)=>select(`WL${r} · 8개 스트링 표본 · 예시 Gray 코드`,`WL${r} · 8 string samples · example Gray code`)],
    [/^가상 경과 ([\d.]+) ms · 예시 τ = 40 ms · 실제 장치 사양 아님$/,(_,ms)=>select(`가상 ${ms} ms · 예시 τ = 40 ms`,`Virtual ${ms} ms · example τ = 40 ms`)],
    [/^Vref (≥|<) Vt → (선택 셀 도통 가능|선택 셀 차단) · 비선택 셀 통과 조건 가정$/,(_,op,result)=>select(`Vref ${op} Vt → ${op==='≥'?'도통 가능':'차단'}`,`Vref ${op} Vt → ${op==='≥'?'conducting':'blocked'}`)],
    [/^(SRAM|DRAM|HBM|HBF|NAND)의 모든 표본 뱅크를 초기 상태로 되돌렸습니다\.$/,(_,name)=>select(`${name}의 모든 표본 뱅크를 초기화했습니다.`,`Reset every sampled ${name} bank.`)],
    [/^UTF-8 (\d+)바이트 중 첫 (\d+)바이트만 로드했습니다\. 나머지는 별도 워드가 필요합니다\.$/,(_,total,size)=>select(`UTF-8 ${total}바이트 중 ${size}바이트를 로드했습니다. 나머지는 별도 워드가 필요합니다.`,`Loaded the first ${size} of ${total} UTF-8 bytes. Remaining bytes need another word.`)],
    [/^UTF-8을 0x([\dA-F]+)로 변환했습니다\. 남는 공간은 00으로 채웁니다\.$/,(_,hex)=>select(`UTF-8 → 0x${hex}. 남는 공간은 00으로 채웁니다.`,`UTF-8 → 0x${hex}. Unused bytes are padded with 00.`)],
    [/^16진수를 1~(\d+)자리로 입력하세요\.$/,(_,n)=>select(`16진수를 1~${n}자리로 입력하세요.`,`Enter 1-${n} hexadecimal digits.`)],
    [/^(SRAM|DRAM|HBM|HBF|NAND) · 근거와 모델 범위$/,(_,name)=>select(`${name} · 근거와 모델 범위`,`${name} · sources and model scope`)],
    [/^(HBF NAND|HBM DRAM) 배열에서 버퍼와 제어 로직을 거쳐 가속기로 이어지는 병렬 데이터 경로$/,(_,name)=>select(`${name} 배열에서 가속기로 이어지는 병렬 데이터 경로`,`Parallel paths from ${name} arrays through buffers and control logic to the accelerator`)],
    [/^(\d+)개 문턱 전압 상태와 읽기 기준\. 현재 셀의 정규화 문턱은 ([\d.]+)이며 읽기 기준은 ([\d.]+)입니다\.$/,(_,n,vt,ref)=>select(`${n}개 문턱 상태. 현재 Vt ${vt}, Vref ${ref}.`,`${n} threshold states. Current normalized Vt ${vt}; Vref ${ref}.`)]
  ];
  function t(value) {
    const raw=String(value ?? ''),key=clean(raw);
    if(!key)return raw;
    const pair=entries.get(key);
    let translated;
    if(pair)translated=pair[language];
    else {
      for(const [pattern,format] of patterns){const match=key.match(pattern);if(match){translated=format(...match);break;}}
    }
    if(translated===undefined){
      translated=key;
      if(language==='en'&&/[가-힣]/.test(key)&&!/^DEC [\d,]+ · UTF-8 /.test(key))missing.add(key);
    }
    const before=raw.match(/^\s*/)[0],after=raw.match(/\s*$/)[0];
    return before+translated+after;
  }
  function localizeRecord(node,key,value,setter){
    let map=records.get(node);if(!map){map=new Map();records.set(node,map);}
    const last=map.get(key),source=last&&last.output===value?last.source:value;
    const output=t(source);
    if(output!==value)setter(output);
    map.set(key,{source,output});
  }
  function excluded(el){return !el||el.closest('script,style,noscript,[data-no-i18n],[data-user-output]');}
  function apply(root=document.body){
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      if(!excluded(node.parentElement)&&node.nodeValue.trim())localizeRecord(node,'text',node.nodeValue,v=>{node.nodeValue=v;});
    }
    const elements=[...(root.nodeType===1?[root]:[]),...root.querySelectorAll('[title],[aria-label],[placeholder]')];
    for(const el of elements){
      if(excluded(el))continue;
      for(const key of ['title','aria-label','placeholder'])if(el.hasAttribute(key))localizeRecord(el,key,el.getAttribute(key),v=>el.setAttribute(key,v));
    }
    document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
  }
  function setLanguage(next){
    if(!['ko','en'].includes(next)||next===language)return;
    language=next;document.documentElement.lang=next;
    try{localStorage.setItem('ram-lab.language',next);}catch(_){}
    document.dispatchEvent(new CustomEvent('ram:languagechange',{detail:{language:next}}));
    apply();
  }
  function flowLabel(code){const pair=R.flowLabels[code];return pair?pair[language==='en'?1:0]:code;}
  R.i18n={t,apply,setLanguage,register,flowLabel,select,get language(){return language;},missing};
  document.documentElement.lang=language;
})();

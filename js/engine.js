/* RAM Lab · dependency-free WebGL2 scene renderer. MIT. */
(() => {
'use strict';
const R = window.RAM = window.RAM || {};
const V = {
 add:(a,b)=>a.map((x,i)=>x+b[i]), sub:(a,b)=>a.map((x,i)=>x-b[i]),
 dot:(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),
 cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
 norm:a=>{const n=Math.hypot(...a)||1;return a.map(x=>x/n);},
};
const M = {
 identity:()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 mul:(a,b)=>{let o=Array(16).fill(0);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o;},
 look:(e,t)=>{let z=V.norm(V.sub(e,t)),x=V.norm(V.cross([0,1,0],z)),y=V.cross(z,x);return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-V.dot(x,e),-V.dot(y,e),-V.dot(z,e),1];},
 perspective:(f,a,n,far)=>{let s=1/Math.tan(f/2);return [s/a,0,0,0,0,s,0,0,0,0,(far+n)/(n-far),-1,0,0,2*far*n/(n-far),0];},
 transform:(p,s)=>[s[0],0,0,0,0,s[1],0,0,0,0,s[2],0,p[0],p[1],p[2],1],
 point:(m,p)=>{let v=[...p,1];return Array.from({length:4},(_,r)=>v.reduce((s,x,i)=>s+m[i*4+r]*x,0));},
};
function hex(h){if(Array.isArray(h))return h;h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255);}
function buildGeo(kind, opts={}) {
 let p=[],n=[];
 const tri=(a,b,c,na,nb=na,nc=na)=>{p.push(...a,...b,...c);n.push(...na,...nb,...nc);};
 const quad=(a,b,c,d,no)=>{tri(a,b,c,no);tri(a,c,d,no);};
 if(kind==='box'){
  const q=.5;
  quad([-q,-q,q],[q,-q,q],[q,q,q],[-q,q,q],[0,0,1]);
  quad([q,-q,-q],[-q,-q,-q],[-q,q,-q],[q,q,-q],[0,0,-1]);
  quad([q,-q,q],[q,-q,-q],[q,q,-q],[q,q,q],[1,0,0]);
  quad([-q,-q,-q],[-q,-q,q],[-q,q,q],[-q,q,-q],[-1,0,0]);
  quad([-q,q,q],[q,q,q],[q,q,-q],[-q,q,-q],[0,1,0]);
  quad([-q,-q,-q],[q,-q,-q],[q,-q,q],[-q,-q,q],[0,-1,0]);
 } else if(kind==='sphere') {
  let U=opts.low?8:20,W=opts.low?6:12;const pt=(a,b)=>[Math.sin(b)*Math.cos(a)*.5,Math.cos(b)*.5,Math.sin(b)*Math.sin(a)*.5];
  for(let j=0;j<W;j++)for(let i=0;i<U;i++){
   let a=pt(i/U*2*Math.PI,j/W*Math.PI),b=pt((i+1)/U*2*Math.PI,j/W*Math.PI),c=pt((i+1)/U*2*Math.PI,(j+1)/W*Math.PI),d=pt(i/U*2*Math.PI,(j+1)/W*Math.PI);
   tri(a,b,c,V.norm(a),V.norm(b),V.norm(c));tri(a,c,d,V.norm(a),V.norm(c),V.norm(d));
  }
 } else {
  const seg=opts.low?12:48, inner=opts.inner||0, start=opts.start||0,span=opts.span||Math.PI*2;
  const pt=(r,a,y)=>[r*Math.cos(a),y,r*Math.sin(a)];
  for(let i=0;i<seg;i++){
   let a=start+span*i/seg,b=start+span*(i+1)/seg,na=[Math.cos(a),0,Math.sin(a)],nb=[Math.cos(b),0,Math.sin(b)];
   let A=pt(.5,a,-.5),B=pt(.5,b,-.5),C=pt(.5,b,.5),D=pt(.5,a,.5);
   tri(A,B,C,na,nb,nb);tri(A,C,D,na,nb,na);
   let E=pt(inner*.5,a,-.5),F=pt(inner*.5,b,-.5),G=pt(inner*.5,b,.5),H=pt(inner*.5,a,.5);
   quad(D,C,G,H,[0,1,0]);quad(B,A,E,F,[0,-1,0]);
   if(inner){tri(F,E,H,nb.map(x=>-x),na.map(x=>-x),na.map(x=>-x));tri(F,H,G,nb.map(x=>-x),na.map(x=>-x),nb.map(x=>-x));}
  }
  if(span<Math.PI*2-.01){for(const [a,sign] of [[start,-1],[start+span,1]])quad(pt(.5,a,-.5),pt(.5,a,.5),pt(inner*.5,a,.5),pt(inner*.5,a,-.5),[-Math.sin(a)*sign,0,Math.cos(a)*sign]);}
 }
 return {positions:new Float32Array(p),normals:new Float32Array(n),count:p.length/3};
}
class Scene {
 constructor(canvas,labelLayer,onSelect){
  this.canvas=canvas;this.labels=labelLayer;this.onSelect=onSelect;this.meshes=[];this.tags=[];this.paths=[];this.geo=new Map();this.lastLabels=0;this.selected=null;
  this.yaw=.63;this.pitch=.60;this.distance=15;this.target=[0,1,0];this.autoRotate=false;this.drag=false;this.available=false;
  const gl=canvas.getContext('webgl2',{antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
  if(!gl){
   this.ctx=canvas.getContext('2d',{alpha:false});
   if(!this.ctx)return;
   this.mode='software';this.available=true;this.bindInput();
   this.ro=new ResizeObserver(()=>this.resize());this.ro.observe(canvas.parentElement);this.resize();return;
  }
  this.mode='webgl2';this.gl=gl;this.available=true;
  const vs=`#version 300 es
  layout(location=0) in vec3 aP;layout(location=1) in vec3 aN;
  uniform mat4 uModel;uniform mat4 uVP;out vec3 vP;out vec3 vN;
  void main(){vec4 w=uModel*vec4(aP,1.);vP=w.xyz;vN=normalize(transpose(inverse(mat3(uModel)))*aN);gl_Position=uVP*w;}`;
  const fs=`#version 300 es
  precision highp float;in vec3 vP;in vec3 vN;uniform vec4 uColor;uniform vec3 uEye;uniform float uGlow;uniform float uGrid;out vec4 outColor;
  void main(){vec3 N=normalize(vN);if(!gl_FrontFacing)N=-N;
   vec3 L=normalize(vec3(-.45,.85,.55)),L2=normalize(vec3(.7,.35,-.5));vec3 E=normalize(uEye-vP);
   float diff=max(dot(N,L),0.);float rim=pow(1.-max(dot(N,E),0.),3.);float spec=pow(max(dot(N,normalize(L+E)),0.),65.);
   vec3 color=uColor.rgb*(.35+.67*diff+.24*max(dot(N,L2),0.))+vec3(.65,.78,.85)*spec*.25+vec3(.19,.33,.35)*rim*.26+uColor.rgb*uGlow*.65;
   if(uGrid>0.){vec2 s=vP.xz;vec2 q=abs(fract(s-.5)-.5)/fwidth(s);float line=1.-min(min(q.x,q.y),1.);float fade=1.-smoothstep(2.,14.,length(s));color=mix(vec3(.039,.057,.069),vec3(.075,.105,.12),line*fade);}
   float fog=smoothstep(21.,48.,length(uEye-vP));color=mix(color,vec3(.040,.055,.064),fog);outColor=vec4(color,uColor.a);
  }`;
  const compile=(type,code)=>{let sh=gl.createShader(type);gl.shaderSource(sh,code);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh;};
  this.program=gl.createProgram();gl.attachShader(this.program,compile(gl.VERTEX_SHADER,vs));gl.attachShader(this.program,compile(gl.FRAGMENT_SHADER,fs));gl.linkProgram(this.program);
  if(!gl.getProgramParameter(this.program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(this.program));
  this.u={};['Model','VP','Color','Eye','Glow','Grid'].forEach(x=>this.u[x]=gl.getUniformLocation(this.program,'u'+x));
  gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  this.bindInput();this.ro=new ResizeObserver(()=>this.resize());this.ro.observe(canvas.parentElement);this.resize();
 }
 resize(){if(!this.available)return;let r=this.canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,this.mode==='software'?1.25:1.6);this.width=r.width;this.height=r.height;let w=Math.round(r.width*d),h=Math.round(r.height*d);if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}if(this.gl)this.gl.viewport(0,0,w,h);this.ratio=d;}
 bindInput(){
  let last=null,origin=null,pointers=new Map(),pinch=0;
  this.canvas.addEventListener('pointerdown',e=>{this.canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);last=[e.clientX,e.clientY];origin=last;this.drag=true;this.autoRotate=false;});
  this.canvas.addEventListener('pointermove',e=>{
   if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,[e.clientX,e.clientY]);
   if(pointers.size===2){let a=[...pointers.values()],d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);if(pinch)this.distance=Math.max(5,Math.min(38,this.distance*pinch/d));pinch=d;return;}
   if(!last){last=[e.clientX,e.clientY];return;}
   let dx=e.clientX-last[0],dy=e.clientY-last[1];if(e.shiftKey||e.buttons===2){this.target[0]-=dx*.012;this.target[1]+=dy*.012;}else{this.yaw-=dx*.008;this.pitch=Math.max(.08,Math.min(1.48,this.pitch+dy*.006));}last=[e.clientX,e.clientY];
  });
  const end=e=>{if(origin&&Math.hypot(e.clientX-origin[0],e.clientY-origin[1])<6)this.pick(e);pointers.delete(e.pointerId);pinch=0;this.drag=false;last=null;origin=null;};
  this.canvas.addEventListener('pointerup',end);this.canvas.addEventListener('pointercancel',()=>{pointers.clear();last=null;origin=null;pinch=0;this.drag=false;});
  this.canvas.addEventListener('wheel',e=>{e.preventDefault();this.distance=Math.max(5,Math.min(38,this.distance*Math.exp(e.deltaY*.001)));},{passive:false});
  this.canvas.addEventListener('contextmenu',e=>e.preventDefault());
 }
 geometry(kind,opts={}){if(this.mode==='software')opts={...opts,low:true};let key=kind+JSON.stringify(opts);if(this.geo.has(key))return this.geo.get(key);let g=buildGeo(kind,opts),gl=this.gl;if(!gl){this.geo.set(key,g);return g;}g.vao=gl.createVertexArray();gl.bindVertexArray(g.vao);
  [g.positions,g.normals].forEach((a,i)=>{let b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,a,gl.STATIC_DRAW);gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,3,gl.FLOAT,false,0,0);});this.geo.set(key,g);return g;}
 add(kind,pos,size,color,extra={}){let mesh={kind,pos:[...pos],size:[...size],color:hex(color),alpha:1,glow:0,...extra};mesh.original=[...mesh.color];this.meshes.push(mesh);return mesh;}
 box(p,s,c,o={}){return this.add('box',p,s,c,o);} cyl(p,s,c,o={}){return this.add('cylinder',p,s,c,o);} sphere(p,s,c,o={}){return this.add('sphere',p,s,c,o);}
 wire(points,color,tag='',radius=.035){let meshes=[];for(let i=1;i<points.length;i++){let a=points[i-1],b=points[i],Y=V.norm(V.sub(b,a)),len=Math.hypot(...V.sub(b,a));if(!len)continue;let X=V.norm(V.cross(Math.abs(Y[1])>.9?[1,0,0]:[0,1,0],Y)),Z=V.cross(X,Y),p=a.map((x,j)=>(x+b[j])/2);let mat=[...X.map(x=>x*radius*2),0,...Y.map(x=>x*len),0,...Z.map(x=>x*radius*2),0,...p,1];meshes.push(this.cyl(p,[1,1,1],color,{matrix:mat,tag}));}return meshes;}
 label(id,name,pos,sub=''){this.tags.push({id,name,pos,sub});}
 pulse(points,tag,color='#9cffe2',count=3){for(let i=0;i<count;i++)this.paths.push({points,tag,phase:i/count,mesh:this.sphere(points[0],[.11,.11,.11],color,{glow:1.8,hidden:true})});}
 clear(){this.revision=(this.revision||0)+1;this.meshes=[];this.paths=[];this.tags=[];this.labels.innerHTML='';this.labelNodes=null;this.labelLines=null;this.selected=null;}
 setCamera(type){const presets={DRAM:[.67,.55,12,[0,1.7,0]],SRAM:[.52,.74,12.7,[0,.7,0]],HBM:[.48,.57,14.6,[0,1.1,0]],HBF:[.55,.56,15.2,[0,1.4,0]],NAND:[.62,.48,12.5,[0,1.8,0]]};[this.yaw,this.pitch,this.distance,this.target]=presets[type];this.target=[...this.target];}
 project(p){if(!this.vp)return null;let v=M.point(this.vp,p);if(v[3]<=0)return null;return [(v[0]/v[3]*.5+.5)*this.width,(-v[1]/v[3]*.5+.5)*this.height,v[2]/v[3]];}
 pick(e){let r=this.canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;let best=null,dist=75;for(let t of this.tags){let p=this.project(t.pos);if(p){let d=Math.hypot(p[0]-x,p[1]-y);if(d<dist){dist=d;best=t;}}}if(best)this.onSelect(best.id);}
 updateLabels(){
  if(this.hideLabels){this.labels.innerHTML='';this.labelNodes=null;this.labelLines=null;return;}
  if(!this.labelNodes||this.labelNodes.length!==this.tags.length){
   this.labels.innerHTML='';this.labelLines=document.createElementNS('http://www.w3.org/2000/svg','svg');
   this.labelLines.setAttribute('class','label-leaders');this.labelLines.setAttribute('aria-hidden','true');this.labels.append(this.labelLines);
   this.labelNodes=this.tags.map(tag=>{const b=document.createElement('button');b.className='model-label';b.dataset.part=tag.id;
    const dot=document.createElement('i'),text=document.createElement('span');text.textContent=window.RAM.i18n?.t(tag.name)||tag.name;b.append(dot,text);b.title=window.RAM.i18n?.t(tag.sub||tag.name)||(tag.sub||tag.name);b.onclick=()=>this.onSelect(tag.id);this.labels.append(b);return b;});
  }
  const w=this.width,h=this.height,items=this.tags.map((tag,i)=>({tag,el:this.labelNodes[i],p:this.project(tag.pos)}));
  items.forEach(item=>item.el.style.display=item.p&&item.p[0]>0&&item.p[0]<w&&item.p[1]>0&&item.p[1]<h?'':'none');
  const visible=items.filter(item=>item.el.style.display!=='none').sort((a,b)=>a.p[0]-b.p[0]);
  let lines='';const split=Math.ceil(visible.length/2);
  [visible.slice(0,split),visible.slice(split)].forEach((side,which)=>{
   side.sort((a,b)=>a.p[1]-b.p[1]);const gap=w<500?43:50;
   let previous=68;
   side.forEach((item,i)=>{const {tag,el,p}=item,ew=el.offsetWidth,eh=el.offsetHeight;
    const low=72+i*gap,high=h-56-(side.length-i)*gap;
    let y=Math.max(previous+gap,Math.max(low,Math.min(high,p[1]-eh/2)));previous=y;
    y=Math.min(y,h-eh-52);const x=which?w-ew-16:16;
    el.style.transform=`translate(${x}px,${y}px)`;el.classList.toggle('chosen',this.selected===tag.id);
    const sx=which?x:x+ew,sy=y+eh/2,mx=which?Math.min(sx-18,p[0]+25):Math.max(sx+18,p[0]-25);
    const selected=this.selected===tag.id;
    lines+=`<path d="M${sx},${sy} L${mx},${sy} L${p[0]},${p[1]}" class="${selected?'selected':''}"/><circle cx="${p[0]}" cy="${p[1]}" r="${selected?2.4:1.8}"/>`;
   });
  });
  this.labelLines.setAttribute('viewBox',`0 0 ${w} ${h}`);this.labelLines.innerHTML=lines;
 }
 renderSoftware(state,eye,active){
  // Painter-sorted, low-poly Canvas fallback. The same scene and camera are used.
  // No physical model is changed when GPU acceleration is unavailable.
  const ctx=this.ctx,w=this.width,h=this.height,d=this.ratio||1;
  ctx.setTransform(d,0,0,d,0,0);ctx.globalAlpha=1;ctx.fillStyle='#0a1014';ctx.fillRect(0,0,w,h);
  const gradient=ctx.createRadialGradient(w*.5,h*.48,0,w*.5,h*.48,w*.65);
  gradient.addColorStop(0,'#14232a');gradient.addColorStop(1,'#0a1116');ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
  // World-space ground grid, deliberately subordinate to the device geometry.
  ctx.strokeStyle='#22343d';ctx.lineWidth=.55;ctx.globalAlpha=.55;
  for(let i=-12;i<=12;i++)for(let axis=0;axis<2;axis++){
   const a=this.project(axis?[i,-.5,-12]:[-12,-.5,i]),b=this.project(axis?[i,-.5,12]:[12,-.5,i]);
   if(a&&b){ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}
  }
  ctx.globalAlpha=1;
  const triangles=[],light=V.norm([-.45,.85,.55]),light2=V.norm([.7,.35,-.5]);
  for(const m of this.meshes){
   if(m.dynamic)m.dynamic(m,state,0);if(m.hidden||m.grid)continue;
   const geo=this.geometry(m.kind,m.geo||{}),mat=m.matrix||M.transform(m.pos,m.size),vp=M.mul(this.vp,mat),verts=geo.positions,norms=geo.normals;
   let glow=m.glow||0;if(m.tag&&active.includes(m.tag)&&state.power)glow=Math.max(glow,.5);if(m.part===this.selected)glow=Math.max(glow,.2);
   const color=m.tag&&active.includes(m.tag)&&state.power&&m.activeColor?hex(m.activeColor):m.color;
   const ax=[mat[0],mat[1],mat[2]],ay=[mat[4],mat[5],mat[6]],az=[mat[8],mat[9],mat[10]];
   const al=V.dot(ax,ax)||1,bl=V.dot(ay,ay)||1,cl=V.dot(az,az)||1;
   for(let k=0;k<verts.length;k+=9){
    let pts=[],depth=0,valid=true;
    for(let j=0;j<9;j+=3){let v=M.point(vp,[verts[k+j],verts[k+j+1],verts[k+j+2]]);if(v[3]<=.1){valid=false;break;}pts.push([(v[0]/v[3]*.5+.5)*w,(-v[1]/v[3]*.5+.5)*h,v[2]/v[3]]);depth+=v[2]/v[3];}
    if(!valid)continue;
    if(pts.every(p=>p[0]<-2)||pts.every(p=>p[0]>w+2)||pts.every(p=>p[1]<-2)||pts.every(p=>p[1]>h+2))continue;
    let nx=(norms[k]+norms[k+3]+norms[k+6])/3,ny=(norms[k+1]+norms[k+4]+norms[k+7])/3,nz=(norms[k+2]+norms[k+5]+norms[k+8])/3;
    let normal=V.norm(ax.map((v,i)=>v*nx/al+ay[i]*ny/bl+az[i]*nz/cl));
    const diffuse=.37+.66*Math.max(V.dot(normal,light),0)+.20*Math.max(V.dot(normal,light2),0)+glow*.42;
    const rgb=color.map(v=>Math.min(255,Math.round(v*diffuse*255)));
    triangles.push({p:pts,z:depth/3,rgb,fill:`rgb(${rgb.join(',')})`,alpha:m.alpha});
   }
  }
  // Software Z-buffer prevents interpenetrating plates from painting through
  // one another; painter ordering alone is insufficient for a stacked device.
  const pw=this.canvas.width,ph=this.canvas.height,image=ctx.getImageData(0,0,pw,ph),pixels=image.data;
  if(!this.depthBuffer||this.depthBuffer.length!==pw*ph)this.depthBuffer=new Float32Array(pw*ph);
  const depth=this.depthBuffer;depth.fill(Infinity);
  const raster=(tri,opaque)=>{
   const a=tri.p[0],b=tri.p[1],c=tri.p[2];
   const ax=a[0]*d,ay=a[1]*d,bx=b[0]*d,by=b[1]*d,cx=c[0]*d,cy=c[1]*d;
   const den=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy);if(Math.abs(den)<.015)return;
   const xmin=Math.max(0,Math.floor(Math.min(ax,bx,cx))),xmax=Math.min(pw-1,Math.ceil(Math.max(ax,bx,cx)));
   const ymin=Math.max(0,Math.floor(Math.min(ay,by,cy))),ymax=Math.min(ph-1,Math.ceil(Math.max(ay,by,cy)));
   const iDen=1/den,uDx=(by-cy)*iDen,vDx=(cy-ay)*iDen,uDy=(cx-bx)*iDen,vDy=(ax-cx)*iDen;
   let u0=((by-cy)*(xmin+.5-cx)+(cx-bx)*(ymin+.5-cy))*iDen;
   let v0=((cy-ay)*(xmin+.5-cx)+(ax-cx)*(ymin+.5-cy))*iDen;
   const da=a[2]-c[2],db=b[2]-c[2],alpha=tri.alpha,inv=1-alpha,rgb=tri.rgb;
   for(let y=ymin;y<=ymax;y++,u0+=uDy,v0+=vDy){let u=u0,v=v0,p=y*pw+xmin;
    for(let x=xmin;x<=xmax;x++,p++,u+=uDx,v+=vDx){if(u<-.000001||v<-.000001||u+v>1.000001)continue;const z=c[2]+u*da+v*db;if(z>depth[p]+.0000001)continue;
     const k=p*4;if(opaque){depth[p]=z;pixels[k]=rgb[0];pixels[k+1]=rgb[1];pixels[k+2]=rgb[2];}
     else{pixels[k]=pixels[k]*inv+rgb[0]*alpha;pixels[k+1]=pixels[k+1]*inv+rgb[1]*alpha;pixels[k+2]=pixels[k+2]*inv+rgb[2]*alpha;}
    }
   }
  };
  triangles.filter(t=>t.alpha===1).forEach(t=>raster(t,true));
  triangles.filter(t=>t.alpha<1).sort((a,b)=>b.z-a.z).forEach(t=>raster(t,false));
  ctx.putImageData(image,0,0);
  ctx.globalAlpha=1;
 }
 render(state,t=0,dt=0){
  if(!this.available||!this.width||!this.height)return;
  if(this.mode==='software'){const now=performance.now();if(this.lastPaint&&now-this.lastPaint<80)return;const key=[this.width,this.height,this.yaw,this.pitch,this.distance,...this.target,t,this.revision,this.selected,this.hideLabels,JSON.stringify(state)].join('|');if(!this.autoRotate&&this.lastPaintKey===key)return;this.lastPaintKey=key;this.lastPaint=now;}
  if(this.autoRotate&&!this.drag)this.yaw+=dt*.15;
  let eye=V.add(this.target,[this.distance*Math.sin(this.yaw)*Math.cos(this.pitch),this.distance*Math.sin(this.pitch),this.distance*Math.cos(this.yaw)*Math.cos(this.pitch)]);
  this.vp=M.mul(M.perspective(.66,this.width/this.height,.1,120),M.look(eye,this.target));
  const active=state.activeTags||[];
  for(let path of this.paths){path.mesh.hidden=!state.power||!active.includes(path.tag);let f=(t*.38+path.phase)%1;if(state.operation==='write'&&['tsv','lanes'].includes(path.tag))f=1-f;f=Math.min(f,.999999);let scaled=f*(path.points.length-1),i=Math.floor(scaled),q=scaled-i;path.mesh.pos=path.points[i].map((v,j)=>v*(1-q)+path.points[i+1][j]*q);}
  if(this.mode==='software'){this.renderSoftware(state,eye,active);}else{
  const gl=this.gl;gl.clearColor(.04,.055,.064,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(this.program);gl.uniformMatrix4fv(this.u.VP,false,this.vp);gl.uniform3fv(this.u.Eye,eye);
  let transparent=[];
  const draw=m=>{
   if(m.dynamic)m.dynamic(m,state,t);if(m.hidden)return;
   let g=this.geometry(m.kind,m.geo||{}),col=m.color,glow=m.glow;
   if(m.tag&&active.includes(m.tag)&&state.power){glow=Math.max(glow,.65);col=m.activeColor?hex(m.activeColor):col;}
   if(m.part&&this.selected===m.part)glow=Math.max(glow,.35);
   gl.bindVertexArray(g.vao);gl.uniformMatrix4fv(this.u.Model,false,m.matrix||M.transform(m.pos,m.size));gl.uniform4fv(this.u.Color,[...col,m.alpha]);gl.uniform1f(this.u.Glow,glow);gl.uniform1f(this.u.Grid,m.grid?1:0);gl.drawArrays(gl.TRIANGLES,0,g.count);
  };
  gl.depthMask(true);for(let m of this.meshes){if(m.alpha<1)transparent.push(m);else draw(m);}
  transparent.sort((a,b)=>Math.hypot(...V.sub(b.pos,eye))-Math.hypot(...V.sub(a.pos,eye)));gl.depthMask(false);transparent.forEach(draw);gl.depthMask(true);
  }
  this.updateLabels();
 }
}
R.Scene=Scene;R.math={V,M,hex};
})();

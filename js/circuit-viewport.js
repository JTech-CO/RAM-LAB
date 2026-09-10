/* Independent 2D camera. Model steps replace only SVG content, not this camera.
   Pointer Events cover mouse, pen and touch; no runtime dependency or CDN. */
(() => {
  'use strict';
  const R = window.RAM;
  class CircuitViewport {
    constructor(container, surface, output) {
      this.container = container;
      this.surface = surface;
      this.output = output;
      this.scale = 1;
      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.height = 0;
      this.type = null;
      this.cameras = new Map();
      this.pointers = new Map();
      this.minScale = 0.25;
      this.maxScale = 4;
      this.fitted = false;
      this.initialized = false;
      this.bind();
      this.observer = new ResizeObserver(() => this.resize());
      this.observer.observe(container);
    }
    resize() {
      const w = this.container.clientWidth, h = this.container.clientHeight;
      if (!w || !h) return;
      const dx = (w - this.width) / 2, dy = (h - this.height) / 2;
      this.width = w; this.height = h;
      if (!this.initialized) { this.initialized = true; this.reset(); }
      else if (this.fitted) this.fit();
      else { this.x += dx; this.y += dy; this.apply(); }
    }
    setType(type) {
      if (this.type === type) return;
      if (this.type && this.initialized && this.width > 0 && this.height > 0) this.cameras.set(this.type, {scale:this.scale,x:this.x,y:this.y,fitted:this.fitted,width:this.width,height:this.height});
      this.type = type;
      const saved = this.cameras.get(type);
      if (saved && saved.width > 0 && saved.height > 0) {
        this.scale = saved.scale;
        this.x = saved.x + (this.width - saved.width) / 2;
        this.y = saved.y + (this.height - saved.height) / 2;
        this.fitted = saved.fitted;
        if(this.fitted) this.fit(); else this.apply();
      } else this.reset();
    }
    reset() {
      if (!this.width || !this.height) return;
      const fit = Math.min((this.width - 24) / 860, (this.height - 24) / 430);
      // Never make the default schematic unreadably small on a phone.
      // The explicit "Fit" control still provides a full-circuit overview.
      this.scale = fit >= 0.75 ? Math.min(1, fit) : 1;
      this.fitted = false;
      this.x = (this.width - 860 * this.scale) / 2;
      this.y = (this.height - 430 * this.scale) / 2;
      this.apply();
    }
    fit() {
      if (!this.width || !this.height) return;
      this.scale = Math.max(this.minScale, Math.min(this.maxScale, (this.width - 24) / 860, (this.height - 24) / 430));
      this.x = (this.width - 860 * this.scale) / 2;
      this.y = (this.height - 430 * this.scale) / 2;
      this.fitted = true;
      this.apply();
    }
    zoom(factor, cx = this.width / 2, cy = this.height / 2) {
      if (!Number.isFinite(factor) || factor <= 0) return;
      const next = Math.max(this.minScale, Math.min(this.maxScale, this.scale * factor));
      const ratio = next / this.scale;
      this.x = cx - (cx - this.x) * ratio;
      this.y = cy - (cy - this.y) * ratio;
      this.scale = next; this.fitted = false; this.apply();
    }
    pan(dx, dy) { this.x += dx; this.y += dy; this.fitted = false; this.apply(); }
    apply() {
      // Keep at least a small piece of the diagram in reach after long drags.
      const margin = 65;
      this.x = Math.min(this.width - margin, Math.max(margin - 860*this.scale, this.x));
      this.y = Math.min(this.height - margin, Math.max(margin - 430*this.scale, this.y));
      this.surface.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
      this.container.dataset.zoom = this.scale.toFixed(5);
      this.container.dataset.panX = this.x.toFixed(3);
      this.container.dataset.panY = this.y.toFixed(3);
      this.output.value = Math.round(this.scale * 100) + '%';
      this.output.textContent = this.output.value;
      document.getElementById('circuit-zoom-out').disabled = this.scale <= this.minScale + 0.00001;
      document.getElementById('circuit-zoom-in').disabled = this.scale >= this.maxScale - 0.00001;
    }
    local(p) {
      const rect = this.container.getBoundingClientRect();
      return {x:p.clientX-rect.left,y:p.clientY-rect.top};
    }
    bind() {
      const el = this.container;
      el.addEventListener('wheel', e => {
        e.preventDefault();
        const p = this.local(e), delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? this.height : 1);
        this.zoom(Math.exp(-Math.max(-120, Math.min(120, delta)) * 0.0025), p.x, p.y);
      }, {passive:false});
      el.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.preventDefault(); el.focus({preventScroll:true});
        el.setPointerCapture(e.pointerId);
        this.pointers.set(e.pointerId, this.local(e));
        el.classList.add('is-dragging');
      });
      el.addEventListener('pointermove', e => {
        if (!this.pointers.has(e.pointerId)) return;
        const old = [...this.pointers.values()], previous = this.pointers.get(e.pointerId), point = this.local(e);
        this.pointers.set(e.pointerId, point);
        const next = [...this.pointers.values()];
        if (next.length === 1) this.pan(point.x-previous.x, point.y-previous.y);
        else if (next.length === 2) {
          const distance = a => Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y);
          const center = a => ({x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2});
          const a=center(old),b=center(next),d=distance(old);
          if(d>2) this.zoom(distance(next)/d,a.x,a.y);
          this.pan(b.x-a.x,b.y-a.y);
        }
      });
      const end = e => {
        this.pointers.delete(e.pointerId);
        if(el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        if (!this.pointers.size) el.classList.remove('is-dragging');
      };
      el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
      el.addEventListener('lostpointercapture',e=>{this.pointers.delete(e.pointerId);if(!this.pointers.size)el.classList.remove('is-dragging');});
      el.addEventListener('keydown', e => {
        const actions = {'+':()=>this.zoom(1.2),'=':()=>this.zoom(1.2),'-':()=>this.zoom(1/1.2),'0':()=>this.reset(),'f':()=>this.fit(),'r':()=>this.reset(),ArrowLeft:()=>this.pan(40,0),ArrowRight:()=>this.pan(-40,0),ArrowUp:()=>this.pan(0,40),ArrowDown:()=>this.pan(0,-40)};
        const action = actions[e.key] || actions[e.key.toLowerCase()];
        if (action) { e.preventDefault(); e.stopPropagation(); action(); }
      });
      document.getElementById('circuit-zoom-in').onclick=()=>this.zoom(1.2);
      document.getElementById('circuit-zoom-out').onclick=()=>this.zoom(1/1.2);
      document.getElementById('circuit-fit').onclick=()=>this.fit();
      document.getElementById('circuit-reset').onclick=()=>this.reset();
    }
  }
  R.CircuitViewport = CircuitViewport;
})();

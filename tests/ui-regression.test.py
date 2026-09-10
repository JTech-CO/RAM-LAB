"""v1.1 UI regressions. Python + Playwright; builds and executes the portable app.

Screens are emulated Chromium viewports, not physical-device certifications.
The isolated document uses set_content because hosted/file navigation may be
restricted by the runner. Storage preference tests use a localStorage fixture.
"""
from pathlib import Path
import json
import math
import os
import shutil
import subprocess
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'tests' / 'results'
OUT.mkdir(exist_ok=True)
subprocess.run(['node', 'scripts/build-portable.cjs'], cwd=ROOT, check=True, capture_output=True)
HTML = (ROOT / 'RAM-Lab-Standalone.html').read_text()
results, errors = [], []

def check(name, value, detail=None):
    result = {'test': name, 'passed': bool(value)}
    if detail is not None:
        result['detail'] = detail
    results.append(result)
    print(('PASS ' if value else 'FAIL ') + name, flush=True)
    if not value:
        raise AssertionError(f'{name}: {detail}')

def cam(page):
    return page.evaluate('({scale:RAMLab.circuitCamera.scale,x:RAMLab.circuitCamera.x,y:RAMLab.circuitCamera.y})')

def equal_camera(a, b):
    return all(abs(a[k] - b[k]) < .01 for k in a)

FONT_AUDIT = """() => {
 const bad=[]; const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let n; while(n=walker.nextNode()) {
   const p=n.parentElement;
   if(!n.textContent.trim()||!p||p.closest('script,style,svg,noscript,[hidden]'))continue;
   if(!p.getClientRects().length||getComputedStyle(p).visibility==='hidden')continue;
   const d=p.closest('details:not([open])');if(d&&!p.closest('summary'))continue;
   const size=parseFloat(getComputedStyle(p).fontSize);
   if(size<11.99)bad.push({text:n.textContent.trim().slice(0,40),size});
 }
 return bad;
}"""
with sync_playwright() as pw:
    exe = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium')
    options = {'headless': True, 'args': ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-angle=swiftshader']}
    if exe:
        options['executable_path'] = exe
    browser = pw.chromium.launch(**options)
    page = browser.new_page(viewport={'width': 1536, 'height': 1100}, device_scale_factor=1)
    page.set_default_timeout(7000)
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.set_content(HTML, wait_until='load')
    page.wait_for_function('!!window.RAMLab')
    renderer = page.evaluate('RAMLab.scene.mode')
    check('KR is the default without a stored preference', page.get_attribute('html', 'lang') == 'ko')
    check('Desktop detailed stage explanation starts expanded', page.locator('.stage-explanation').evaluate('(e)=>e.open'))
    check('Learning detail panels are collapsed, with summaries retained', page.locator('.learning-detail[open]').count() == 0 and bool(page.locator('#data-summary').inner_text()))
    page.locator('.stage-explanation > summary').click()
    check('Detailed stage explanation can collapse', not page.locator('.stage-explanation').evaluate('(e)=>e.open'))
    page.locator('.stage-explanation > summary').click()

    # Regression: switching type before the first circuit view must not cache
    # a zero-sized camera and restore it with a half-screen offset.
    page.evaluate("RAMLab.selectType('SRAM');RAMLab.selectType('DRAM');RAMLab.setView('circuit')")
    page.wait_for_timeout(150)
    centered = page.evaluate('''()=>{const c=RAMLab.circuitCamera;return Math.abs(c.x-(c.width-860*c.scale)/2)<1 && Math.abs(c.y-(c.height-430*c.scale)/2)<1}''')
    check('First circuit is centered after switching types while hidden', centered)
    before = cam(page)
    page.locator('#circuit-zoom-in').click()
    check('Circuit + zooms in', cam(page)['scale'] > before['scale'])
    page.locator('#circuit-zoom-out').click()
    check('Circuit - returns to the preceding scale', equal_camera(cam(page), before))
    box = page.locator('#circuit-view').bounding_box()
    page.mouse.move(box['x']+box['width']*.6, box['y']+box['height']*.5)
    page.mouse.wheel(0, -110)
    page.wait_for_timeout(120)
    check('Wheel zoom changes the circuit camera', cam(page)['scale'] > before['scale'])
    before = cam(page)
    page.mouse.down()
    page.mouse.move(box['x']+box['width']*.6+52, box['y']+box['height']*.5+27, steps=6)
    page.mouse.up()
    check('Dragging pans the circuit', abs(cam(page)['x']-before['x']) > 40)
    before = cam(page)
    page.locator('#circuit-view').focus()
    page.keyboard.press('+')
    check('Keyboard + zooms the circuit, not the 3D camera', cam(page)['scale'] > before['scale'])
    before = cam(page)
    page.keyboard.press('ArrowRight')
    check('Arrow keys pan when the circuit has focus', cam(page)['x'] < before['x'])
    page.evaluate('RAMLab.circuitCamera.zoom(100)')
    check('Circuit maximum is 400%', math.isclose(cam(page)['scale'], 4) and page.locator('#circuit-zoom-in').is_disabled())
    page.evaluate('RAMLab.circuitCamera.zoom(.0001)')
    check('Circuit minimum is 25%', math.isclose(cam(page)['scale'], .25) and page.locator('#circuit-zoom-out').is_disabled())
    page.locator('#circuit-reset').click()
    page.locator('#circuit-zoom-in').click()
    page.evaluate('RAMLab.circuitCamera.pan(21,16)')
    before = cam(page)
    page.locator('#next-button').click()
    check('Stage advance preserves circuit zoom and pan', equal_camera(before, cam(page)))
    page.locator('#data-hex').fill('3C')
    state = page.evaluate('JSON.stringify({m:RAMLab.sim.memories,index:RAMLab.sim.index,bank:RAMLab.sim.bank,row:RAMLab.sim.row,col:RAMLab.sim.col,op:RAMLab.sim.op})')
    page.locator('[data-lang="en"]').first.click()
    check('EN switches html language and selected button', page.get_attribute('html','lang') == 'en' and page.locator('[data-lang="en"]').first.get_attribute('aria-pressed') == 'true')
    check('Language switch preserves model, operation and address', page.evaluate('JSON.stringify({m:RAMLab.sim.memories,index:RAMLab.sim.index,bank:RAMLab.sim.bank,row:RAMLab.sim.row,col:RAMLab.sim.col,op:RAMLab.sim.op})') == state)
    check('Language switch preserves HEX input and circuit camera', page.locator('#data-hex').input_value() == '3C' and equal_camera(before,cam(page)))
    page.evaluate("RAMLab.selectType('NAND');RAMLab.selectType('DRAM')")
    check('Each memory type retains its own circuit camera', equal_camera(before,cam(page)))
    page.locator('#circuit-fit').click()
    fit = page.evaluate('''()=>{const c=RAMLab.circuitCamera;return 860*c.scale <= c.width+.1 && 430*c.scale<=c.height+.1}''')
    check('Fit shows the whole circuit within the current panel', fit)
    page.locator('#circuit-reset').click()

    # All five types, including dynamic labels, power-off copy, all operation
    # stages, all part explanations, source dialogs and NAND bit densities.
    page.evaluate('RAMLab.i18n.missing.clear()')
    for typ in ['SRAM','DRAM','HBM','HBF','NAND']:
        page.evaluate('(typ)=>RAMLab.selectType(typ)',typ)
        ops=page.locator('[data-op]').evaluate_all('(els)=>els.map(e=>e.dataset.op)')
        for op in ops:
            page.evaluate('''op=>{RAMLab.sim.reset();RAMLab.sim.setOperation(op);for(let i=0;i<RAMLab.sim.steps.length;i++){RAMLab.sim.seek(i);RAMLab.render();}}''',op)
        for view in ['structure','circuit','array']:
            page.evaluate('(view)=>RAMLab.setView(view)',view)
        page.evaluate('RAMLab.sim.power(false);RAMLab.render();RAMLab.sim.power(true);RAMLab.render();RAMLab.showSources()')
        check(f'{typ}: source dialog is English without em dashes', page.locator('#dialog-body').evaluate('(e)=>!/[가-힣\u2014]/.test(e.innerText)'))
        page.locator('[data-lang="ko"]').last.click()
        check(f'{typ}: dialog language switch also updates existing text', bool(page.locator('#dialog-body').evaluate('(e)=>/[가-힣]/.test(e.innerText)')))
        page.locator('[data-lang="en"]').last.click()
        page.locator('#dialog-close').click()
        check(f'{typ}: flow captions contain keywords, not full sentences',page.locator('.step-label').evaluate_all('(els)=>els.every(e=>e.textContent.trim().length<=25 && e.textContent.trim().split(/\s+/).length<=3)'))
    for bpc in ['1','2','3','4']:
        page.locator('#bpc').select_option(bpc)
        page.evaluate('RAMLab.render()')
    for button in ['help-button','compare-button']:
        page.locator('#'+button).click()
        check(f'{button}: all dialog text is translated',page.locator('#dialog-body').evaluate('(e)=>!/[가-힣\u2014]/.test(e.innerText)'))
        page.locator('#dialog-close').click()
    check('No untranslated dynamic Korean strings across audited English screens',page.evaluate('RAMLab.i18n.missing.size')==0,page.evaluate('[...RAMLab.i18n.missing]'))
    page.locator('#bpc').select_option('3')
    page.locator('#text-input').fill('한')
    page.locator('#encode-button').click()
    page.locator('[data-op="write"]').click()
    page.evaluate('RAMLab.sim.seek(RAMLab.sim.steps.length-1);RAMLab.render()')
    check('English UI preserves user-authored Korean UTF-8 data', '한' in page.locator('#readout-note').inner_text() and page.locator('#stored-hex').inner_text()=='0xED959C')
    page.locator('[data-lang="ko"]').first.click()
    check('KR switch preserves stored data and readout', '한' in page.locator('#readout-note').inner_text() and page.locator('#stored-hex').inner_text()=='0xED959C')
    page.locator('[data-memory="DRAM"]').click()
    page.locator('#reset-button').click()
    page.evaluate("RAMLab.setView('structure')")
    for lang in ['ko','en']:
        page.evaluate('(lang)=>RAMLab.i18n.setLanguage(lang)',lang)
        for width in [320,360,390,600,768,834,1024,1280,1536]:
            page.set_viewport_size({'width':width,'height':1000})
            page.wait_for_timeout(70)
            check(f'{lang} {width}px: no page-wide horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
            bad = page.evaluate(FONT_AUDIT)
            check(f'{lang} {width}px: visible UI text is at least 12px',not bad,bad if bad else None)
        check(f'{lang}: visible app contains no em dash',page.evaluate('!document.body.innerText.includes("\\u2014")'))
    page.evaluate("RAMLab.i18n.setLanguage('ko')")
    page.wait_for_timeout(200)
    page.screenshot(path=str(OUT/'v1.1-desktop-kr.png'),full_page=True)
    page.evaluate("RAMLab.i18n.setLanguage('en')")
    page.wait_for_timeout(100)
    page.screenshot(path=str(OUT/'v1.1-desktop-en.png'),full_page=True)

    # New phone session rather than resized desktop: concise default state.
    mobile = browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
    mobile.on('pageerror', lambda e: errors.append(str(e)))
    mobile.set_content(HTML,wait_until='load')
    mobile.wait_for_function('!!window.RAMLab')
    check('Phone stage detail starts collapsed with a visible summary',not mobile.locator('.stage-explanation').evaluate('(e)=>e.open') and mobile.locator('.stage-explanation > summary').is_visible())
    check('Phone 3D labels start off to avoid covering the model',not mobile.evaluate('RAMLab.state.labels'))
    mobile.wait_for_timeout(200)
    mobile.screenshot(path=str(OUT/'v1.1-mobile-kr.png'),full_page=True)
    mobile.locator('[data-lang="en"]').first.click()
    mobile.locator('[data-view="circuit"]').click()
    check('Phone circuit defaults to a readable 100% scale',math.isclose(cam(mobile)['scale'],1))
    box=mobile.locator('#circuit-view').bounding_box()
    cx=box['x']+box['width']/2; cy=min(box['y']+box['height']*.5,740)
    cdp=mobile.context.new_cdp_session(mobile)
    def touches(kind,d):
        cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[] if kind=='touchEnd' else [{'id':1,'x':cx-d,'y':cy,'radiusX':5,'radiusY':5},{'id':2,'x':cx+d,'y':cy,'radiusX':5,'radiusY':5}]})
    before=cam(mobile)
    touches('touchStart',45)
    for d in [52,60,70,82]:
        touches('touchMove',d)
        mobile.wait_for_timeout(25)
    touches('touchEnd',0)
    check('Two-finger touchscreen pinch zooms the circuit',cam(mobile)['scale']>before['scale']*1.3)
    check('Touch gesture completion clears captured pointers',mobile.evaluate('RAMLab.circuitCamera.pointers.size')==0)
    mobile.locator('#circuit-fit').click()
    check('Phone Fit gives a complete overview at a smaller scale',cam(mobile)['scale']<.6)
    mobile.locator('#circuit-reset').click()
    check('Phone reset returns to 100%, not tiny fit-to-screen text',math.isclose(cam(mobile)['scale'],1))
    mobile.locator('.viewer-card').screenshot(path=str(OUT/'v1.1-mobile-circuit-en.png'))
    # Force only the platform capability to be unavailable; app fallback is real.
    mobile.evaluate('document.querySelector(".viewer-card").requestFullscreen=undefined')
    mobile.locator('#fullscreen-button').click()
    check('Mobile supports expanded viewer without the native Fullscreen API',mobile.locator('.viewer-card').evaluate('(e)=>e.classList.contains("is-expanded")'))
    mobile.keyboard.press('Escape')
    check('Escape exits the expanded-view fallback',not mobile.locator('.viewer-card').evaluate('(e)=>e.classList.contains("is-expanded")'))
    mobile.locator('[data-view="array"]').click()
    check('Phone cell array scrolls inside its panel rather than the page',mobile.locator('#array-view').evaluate('(e)=>e.scrollWidth>e.clientWidth') and mobile.evaluate('document.documentElement.scrollWidth<=innerWidth'))
    mobile.locator('#compare-button').click()
    check('Phone comparison table scrolls inside the dialog',mobile.locator('.comparison-scroll').evaluate('(e)=>e.scrollWidth>e.clientWidth'))
    mobile.close()

    # Deterministic preference fixture checks persistence and denied-storage
    # handling without claiming that file:// localStorage was tested here.
    fixture="""<script>window.__saved={'ram-lab.language':'en'};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>window.__saved[k]||null,setItem:(k,v)=>window.__saved[k]=String(v)}});</script>"""
    stored=browser.new_page(viewport={'width':1024,'height':900})
    stored.on('pageerror',lambda e:errors.append(str(e)))
    stored.set_content(HTML.replace('<head>','<head>'+fixture,1),wait_until='load')
    stored.wait_for_function('!!window.RAMLab')
    check('Previously saved English preference is read at startup (storage fixture)',stored.get_attribute('html','lang')=='en')
    stored.locator('[data-lang="ko"]').first.click()
    check('KR selection writes only the language preference (storage fixture)',stored.evaluate('JSON.stringify(window.__saved)')=='{"ram-lab.language":"ko"}')
    stored.close()
    denied="""<script>Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('Blocked','SecurityError')}});</script>"""
    private=browser.new_page()
    private.on('pageerror',lambda e:errors.append(str(e)))
    private.set_content(HTML.replace('<head>','<head>'+denied,1),wait_until='load')
    private.wait_for_function('!!window.RAMLab')
    private.locator('[data-lang="en"]').first.click()
    check('Language switching still works when storage is denied',private.get_attribute('html','lang')=='en')
    private.close()
    check('No uncaught JavaScript errors in revised UI regression suite',not errors,errors if errors else None)
    report={'reviewDate':'2026-09-10','runner':'Chromium / Playwright; portable HTML via set_content','renderer':renderer,'scopeNote':'Viewport emulation, not physical phones/tablets. Pinch uses CDP touch events. Storage uses fixtures. Native WebGL, file URL / hosted navigation, Safari and Firefox are not validated.','passed':sum(r['passed'] for r in results),'total':len(results),'errors':errors,'cases':results}
    (OUT/'ui-regression-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    browser.close()
print(json.dumps({'passed':len(results),'renderer':renderer}))

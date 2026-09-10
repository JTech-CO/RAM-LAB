"""Browser smoke tests for the built portable app. Optional: Python + Playwright.
Loads the document with set_content, avoiding dependencies on a local HTTP server.
This tests browser execution/rendering, not file:// policy or hosted navigation.
"""
from pathlib import Path
import json, os, shutil, subprocess
from playwright.sync_api import sync_playwright
ROOT = Path(__file__).resolve().parents[1]
subprocess.run(['node', 'scripts/build-portable.cjs'], cwd=ROOT, check=True, capture_output=True)
HTML = (ROOT / 'RAM-Lab-Standalone.html').read_text()
OUT = ROOT / 'tests' / 'results'; OUT.mkdir(exist_ok=True)
results=[]; errors=[]
def check(name, value):
    passed=bool(value); results.append({'test':name,'passed':passed}); print(('PASS ' if passed else 'FAIL ')+name, flush=True)
    if not passed: raise AssertionError(name)
def finish(page):
    for _ in range(15):
        if page.evaluate('RAMLab.sim.done'):return
        page.locator('#next-button').click()
    raise AssertionError('Operation did not finish')
with sync_playwright() as p:
    exe=os.getenv('CHROMIUM_PATH') or shutil.which('chromium')
    kwargs={'headless':True,'args':['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-dev-shm-usage']}
    if exe:kwargs['executable_path']=exe
    browser=p.chromium.launch(**kwargs)
    page=browser.new_page(viewport={'width':1536,'height':1100},device_scale_factor=1)
    page.set_default_timeout(6000); page.on('pageerror',lambda e:errors.append(str(e)))
    page.set_content(HTML,wait_until='load');page.wait_for_function('!!window.RAMLab')
    renderer=page.evaluate('RAMLab.scene.mode')
    check('App initialized; 3D renderer available',page.evaluate('RAMLab.scene.available'))
    for name in ['DRAM','SRAM','HBM','HBF','NAND']:
        page.locator(f'[data-memory="{name}"]').click();page.wait_for_timeout(130)
        check(f'{name}: model meshes and displayed profile',page.evaluate(f'RAMLab.sim.type==="{name}" && RAMLab.scene.meshes.length>20'))
        page.locator('[data-view="circuit"]').click()
        check(f'{name}: circuit SVG',page.locator('#circuit-view svg').count()==1)
        page.locator('[data-view="array"]').click()
        check(f'{name}: 8 × 8 interactive cells',page.locator('.array-cell').count()==64)
        page.locator('[data-view="structure"]').click()
    page.locator('[data-memory="SRAM"]').click()
    page.locator('#data-hex').fill('3C');page.locator('[data-op="write"]').click();finish(page)
    check('SRAM write reaches actual model and display',page.locator('#stored-hex').inner_text()=='0x3C')
    page.locator('#power-toggle').click()
    check('SRAM power off invalidates data',page.locator('#stored-hex').inner_text()=='0xXX')
    page.locator('#power-toggle').click()
    check('SRAM power on does not restore lost data',page.locator('#stored-hex').inner_text()=='0xXX')
    page.locator('[data-memory="DRAM"]').click();page.locator('[data-op="read"]').click();finish(page)
    page.locator('[data-op="read"]').click()
    check('DRAM row-hit shortcut is visible',page.locator('#stage-code').inner_text()=='ROW HIT')
    page.locator('#refresh-enabled').uncheck(force=True)
    for _ in range(6):page.locator('#age-button').click()
    check('DRAM leak loses read margin with refresh off',page.locator('#stored-hex').inner_text()=='0xXX')
    page.locator('#reset-button').click()
    check('Reset returns defined DRAM state',page.locator('#stored-hex').inner_text()=='0xEB')
    page.locator('[data-memory="NAND"]').click();page.locator('#bpc').select_option('3')
    page.locator('#text-input').fill('한');page.locator('#encode-button').click()
    check('Korean UTF-8 data encoding',page.locator('#data-hex').input_value()=='ED959C')
    page.locator('[data-op="write"]').click();finish(page)
    check('TLC storage and UTF-8 interpretation round-trip',page.locator('#stored-hex').inner_text()=='0xED959C' and '한' in page.locator('#readout-note').inner_text())
    page.locator('[data-op="write"]').click()
    check('Same-page program blocked in UI','이미 프로그램' in page.locator('#toast').inner_text())
    page.locator('#power-toggle').click();check('NAND retains state without power',page.locator('#stored-hex').inner_text()=='0xED959C');page.locator('#power-toggle').click()
    page.locator('#vref').fill('0');page.locator('#vref').dispatch_event('input')
    check('Low comparator reference blocks cell',not page.evaluate('RAMLab.sim.signals().conducting'))
    page.locator('#vref').fill('1');page.locator('#vref').dispatch_event('input')
    check('High comparator reference passes cell',page.evaluate('RAMLab.sim.signals().conducting'))
    page.locator('[data-op="erase"]').click();finish(page)
    check('Block erase returns all TLC bits to one',page.locator('#stored-hex').inner_text()=='0xFFFFFF')
    page.locator('[data-view="array"]').click();page.locator('[data-row="5"][data-col="6"]').click()
    check('Array click updates row and column',page.evaluate('RAMLab.sim.row===5 && RAMLab.sim.col===6'))
    page.locator('[data-view="structure"]').click()
    old=page.evaluate('RAMLab.scene.meshes.filter(m=>m.kind==="cylinder")[0].size[1]')
    page.locator('#explode').fill('1');page.locator('#explode').dispatch_event('input')
    check('Exploded model changes geometry',page.evaluate('RAMLab.scene.meshes.filter(m=>m.kind==="cylinder")[0].size[1]')!=old)
    page.locator('#explode').fill('0');page.locator('#explode').dispatch_event('input')
    # Native link navigation is intentionally not exercised; validate exported payload.
    page.evaluate('window.__blobs=[];window.__createURL=URL.createObjectURL;URL.createObjectURL=b=>{window.__blobs.push(b);return window.__createURL(b)};HTMLAnchorElement.prototype.click=function(){}')
    page.locator('#export-button').click()
    check('JSON export contains current schema',page.evaluate('async()=>JSON.parse(await window.__blobs[0].text()).schema==="ram-lab.session.v1"'))
    page.locator('#snapshot-button').click();page.wait_for_timeout(200)
    check('PNG export creates a nonempty image',page.evaluate('window.__blobs.some(b=>b.type==="image/png" && b.size>5000)'))
    page.locator('#help-button').click();check('Help dialog opens',page.locator('#info-dialog').evaluate('(e)=>e.open'));page.locator('#dialog-close').click()
    page.locator('#profile-sources').click();check('Sources include primary references',page.locator('#dialog-body .source').count()>=3);page.locator('#dialog-close').click()
    page.locator('#compare-button').click();check('Five-layer comparison is complete',page.locator('#dialog-body tbody tr').count()==5);page.locator('#dialog-close').click()
    page.locator('[data-memory="DRAM"]').click();page.locator('#reset-button').click();page.locator('[data-op="read"]').click()
    page.locator('#speed').select_option('4');page.locator('#play-button').click();page.wait_for_timeout(1000)
    check('Timed playback advances stages',page.evaluate('RAMLab.sim.index>0'))
    if page.evaluate('RAMLab.sim.playing'):page.locator('#play-button').click()
    check('Pause stops automatic advancement',not page.evaluate('RAMLab.sim.playing'))
    page.locator('#data-hex').fill('ZZ');page.locator('[data-op="write"]').click();check('Invalid hex is rejected',page.locator('#hex-valid').inner_text()=='INVALID')
    page.locator('#data-hex').fill('A6')
    page.locator('#reset-button').click();page.locator('[data-op="read"]').click()
    page.wait_for_timeout(150);page.screenshot(path=str(OUT/'desktop.png'),full_page=True)
    check('Desktop has no horizontal page overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
    for width in [390,768,1024]:
        page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(150)
        check(f'{width}px layout has no page overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        if width==390:page.screenshot(path=str(OUT/'mobile.png'),full_page=True)
    check('No uncaught JavaScript errors',len(errors)==0)
    report={'reviewDate':'2026-09-10','runner':'Chromium via Playwright, set_content portable document','renderer':renderer,'scopeNote':'No live hosting, file URL navigation, native WebGL, Safari, Firefox, or physical GPU timing validation. Exports validate Blob payloads; link navigation is not exercised.','passed':sum(r['passed'] for r in results),'total':len(results),'errors':errors,'cases':results}
    (OUT/'browser-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    browser.close()
print(json.dumps({'passed':len(results),'renderer':renderer},ensure_ascii=False))

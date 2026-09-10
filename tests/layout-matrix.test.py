"""Layout-only matrix: 2 languages x 7 viewport sizes x 5 memories x 3 views.
Run separately from behavioral tests. No real-device claim is implied.
"""
from pathlib import Path
import json, os, shutil, subprocess
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
subprocess.run(['node','scripts/build-portable.cjs'],cwd=root,check=True,capture_output=True)
results=[]
with sync_playwright() as p:
 exe=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium')
 options={'executable_path':exe} if exe else {}
 b=p.chromium.launch(**options,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-angle=swiftshader'])
 page=b.new_page(viewport={'width':1536,'height':1080});page.set_content((root/'RAM-Lab-Standalone.html').read_text());page.wait_for_function('!!window.RAMLab')
 for lang in ['ko','en']:
  page.evaluate('(lang)=>RAMLab.i18n.setLanguage(lang)',lang)
  for size in [(320,740),(390,844),(768,1024),(834,1194),(1024,768),(844,390),(1280,540)]:
   page.set_viewport_size({'width':size[0],'height':size[1]})
   for typ in ['SRAM','DRAM','HBM','HBF','NAND']:
    page.evaluate('(t)=>RAMLab.selectType(t)',typ)
    if typ in ['HBF','NAND']:page.locator('#bpc').select_option('4')
    for view in ['structure','circuit','array']:
     page.evaluate('(view)=>RAMLab.setView(view)',view)
     page.wait_for_timeout(20)
     ok=page.evaluate('document.documentElement.scrollWidth<=innerWidth')
     results.append({'lang':lang,'size':size,'type':typ,'view':view,'passed':ok})
     if not ok:print('OVERFLOW',results[-1])
 print('TOTAL',len(results),'FAIL',sum(not r['passed'] for r in results))
 (root/'tests/results/layout-matrix.json').write_text(json.dumps({'scope':'Chromium viewport emulation; page-wide horizontal overflow only','total':len(results),'passed':sum(r['passed'] for r in results),'cases':results},indent=2))
 b.close()

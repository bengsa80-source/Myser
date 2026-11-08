from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1000})
 errors=[];failed=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('response',lambda r:failed.append(str(r.status)+' '+r.url) if r.status>=400 else None)
 page.goto('http://localhost:3001');page.evaluate('localStorage.clear()');page.reload()
 assert page.locator('#role-screen').is_visible() and not page.locator('#app-shell').is_visible()
 assert page.locator('.language-select').first.locator('option').count()==27
 assert page.evaluate('Object.values(NUQA_TRANSLATIONS).every(d=>Object.keys(d).length===84)')
 missing=page.evaluate('''()=>[...document.querySelectorAll('[data-i18n]')].map(e=>e.dataset.i18n).filter(k=>!NUQA_TRANSLATIONS.ar[k])''');assert not missing,missing
 page.evaluate('document.fonts.ready');page.screenshot(path=str(R/'entry-desktop.png'),full_page=True)
 # Complete translations and responsive role screens for all languages.
 for code in page.evaluate('Object.keys(NUQA_TRANSLATIONS)'):
  page.evaluate('(code)=>applyLanguage(code)',code)
  assert page.locator('html').get_attribute('lang')==code
  assert page.locator('html').get_attribute('dir')==('rtl' if code in ['ar','ur','fa'] else 'ltr')
  assert page.locator('#welcome-title').inner_text()==page.evaluate('t("welcome")')
  for width in [390,1440]:
   page.set_viewport_size({'width':width,'height':900})
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),('entry overflow',code,width)
  for role in ['officer','worker','person']:
   page.locator(f'[data-enter-role={role}]').click()
   page.set_viewport_size({'width':390,'height':900})
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),('app overflow',code,role,page.evaluate('document.documentElement.scrollWidth'))
   assert page.locator('#monitor').is_visible()==(role=='officer')
   assert page.locator('#tasks').is_visible()==(role=='worker')
   page.locator('#change-role').click()
  print('locale passed:',code,flush=True)
 # Person reports and browser persistence.
 page.evaluate('applyLanguage("en")')
 page.locator('[data-enter-role=person]').click()
 assert not page.locator('.advance').count()
 page.locator('.hero [data-report]').click();page.locator('[name=type]').select_option('تراكم مخلفات')
 page.locator('[name=location]').fill('Test district');page.locator('textarea[name=description]').fill('Demo report')
 page.locator('button[type=submit]').click();assert page.locator('tbody#rows tr').count()==4
 page.reload();assert page.locator('#role-screen').is_visible();assert page.locator('.language-select').first.input_value()=='en'
 # Worker handles report and submits it for officer review.
 page.locator('[data-enter-role=worker]').click()
 task=page.locator('.task-card').filter(has_text='Test district')
 task.get_by_role('button',name='Start work').click();task.get_by_role('button',name='Confirm task completion').click()
 assert 'Awaiting review' in task.inner_text() and task.locator('button').count()==0
 page.locator('#change-role').click();page.locator('[data-enter-role=officer]').click()
 row=page.locator('#rows tr').filter(has_text='Test district');row.get_by_role('button',name='Verify and close',exact=False).click();assert 'Closed' in row.inner_text()
 # Camera alerts and simulation controls.
 page.locator('#scan-toggle').click();assert page.locator('#scan-toggle').get_attribute('aria-pressed')=='false'
 page.locator('#scan-toggle').click();page.locator('[data-event=full]').click();assert page.locator('[data-event=full]').is_disabled();assert page.locator('#review-count').inner_text()=='01'
 # Vehicle simulation records one fictional plate, survives reload, and pauses.
 page.locator('#traffic-toggle').click();assert page.locator('#simulate-litter').is_disabled();page.locator('#traffic-toggle').click()
 page.locator('#simulate-litter').click();page.wait_for_function('document.querySelector("#violation-count").textContent==="1"')
 assert 'DEMO-001' in page.locator('#violation-rows').inner_text()
 page.reload();page.locator('[data-enter-role=officer]').click();assert page.locator('#violation-count').inner_text()=='1';assert page.locator('[data-event=full]').is_disabled()
 page.locator('#simulate-litter').click();page.wait_for_function('document.querySelector("#violation-count").textContent==="2"');assert page.locator('#violation-rows tr').count()==2
 page.set_viewport_size({'width':1440,'height':1000});page.evaluate('document.fonts.ready');page.locator('#vehicles').screenshot(path=str(R/'vehicles-desktop.png'))
 page.evaluate('applyLanguage("ar")');page.set_viewport_size({'width':390,'height':844});page.locator('#vehicles').screenshot(path=str(R/'vehicles-mobile.png'))
 page.locator('#change-role').click();page.screenshot(path=str(R/'entry-mobile.png'),full_page=True)
 # Safe rendering for user-supplied content.
 page.locator('[data-enter-role=person]').click();page.locator('.hero [data-report]').click();page.locator('[name=type]').select_option('تراكم مخلفات');page.locator('[name=location]').fill('<img src=x onerror=alert(1)>');page.locator('textarea[name=description]').fill('Safe text');page.locator('button[type=submit]').click();assert page.locator('#rows img').count()==0
 # The standalone build will be checked separately, without browser storage.
 assert not errors,errors
 assert not failed,failed
 print('PASS: all 27 languages, RTL/LTR, mobile layouts, role routing, reports, worker/officer workflow, persistence, waste alerts and vehicle violations. No browser errors or missing assets.')
 b.close()

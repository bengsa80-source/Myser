from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import re,base64,mimetypes
R=Path(__file__).resolve().parents[1]
def data_uri(path):
 mime={'.woff':'font/woff','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png'}.get(path.suffix,mimetypes.guess_type(str(path))[0] or 'application/octet-stream')
 return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()
html=(R/'index.html').read_text()
logo=(R/'assets/logo.svg').read_text()
image=re.search(r'<image[^>]+/>',logo).group(0)
html=html.replace('<body>','<body><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><symbol id="nuqa-logo" viewBox="460 590 290 315">'+image+'</symbol></svg>')
html=re.sub(r'<img class="brand-logo"[^>]+>', '<svg class="brand-logo" role="img" aria-label="نقا NUQA" viewBox="0 0 290 315"><use href="#nuqa-logo" width="290" height="315"></use></svg>',html)
for stylesheet in ['fonts.css','style.css']:
 css=(R/stylesheet).read_text()
 css=re.sub(r'url\((assets/[^)]+)\)',lambda m:'url('+data_uri(R/m.group(1))+')',css)
 html=html.replace('<link rel="stylesheet" href="'+stylesheet+'">','<style>'+css+'</style>')
html=re.sub(r'src="(assets/[^\"]+)"',lambda m:'src="'+data_uri(R/m.group(1))+'"',html)
for script in ['translations.js','i18n.js','app.js','monitor.js','vehicles.js']:
 html=html.replace('<script src="'+script+'"></script>','<script>'+(R/script).read_text()+'</script>')
for name in ['nuqa-open.html','nuqa-updated.html']:(R.parent/name).write_text(html)
with ZipFile(R.parent/'nuqa-website.zip','w',ZIP_DEFLATED) as z:
 for path in R.rglob('*'):
  if not path.is_file() or path.suffix=='.pyc' or 'ppt-media' in path.parts:continue
  if path.parent==R and path.suffix=='.png':continue
  z.write(path,Path('nuqa-site')/path.relative_to(R))
print('Standalone site:',len(html.encode()),'bytes')

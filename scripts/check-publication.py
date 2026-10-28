"""Check the built site's public routes, metadata, links and quotation marks."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
from collections import defaultdict
import xml.etree.ElementTree as ET
import json, re
root=Path(__file__).resolve().parents[1]; build=root/'build'
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.canonical=[];self.description=[];self.robots=[];self.links=[];self.ids=set();self.title='';self.h1=0;self.in_title=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if tag=='title':self.in_title=True
  if tag=='h1':self.h1+=1
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='meta' and a.get('name')=='description':self.description.append(a.get('content'))
  if tag=='meta' and a.get('name')=='robots':self.robots.append(a.get('content',''))
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
 def handle_data(self,data):
  if self.in_title:self.title+=data
pages={}
for f in build.rglob('*.html'):
 p=Page();p.feed(f.read_text());pages[f]=p
issues=[];public=[]
urls=[n.text for n in ET.parse(build/'sitemap.xml').getroot().iter() if n.tag.endswith('}loc')]
def resolve(path):
 local=build/unquote(path).lstrip('/')
 for f in [local,local/'index.html',Path(str(local)+'.html')]:
  if f.is_file():return f
 return None
for url in urls:
 f=resolve(urlparse(url).path)
 if f not in pages:issues.append('Sitemap route missing: '+url);continue
 p=pages[f];public.append((url,p))
 if p.canonical!=[url]:issues.append('Canonical mismatch: '+url)
 if any('noindex' in v for v in p.robots):issues.append('Public route noindex: '+url)
 if p.h1!=1:issues.append('Expected one H1: '+url)
 if len(p.description)!=1 or not p.description[0]:issues.append('Missing or duplicate description: '+url)
for field in ['title','description']:
 values=defaultdict(list)
 for url,p in public:values[str(getattr(p,field))].append(url)
 for value,dupes in values.items():
  if len(dupes)>1:issues.append('Duplicate '+field+': '+str(dupes))
checked_links=0
for file,p in pages.items():
 if file.name=='404.html':continue
 for href in p.links:
  u=urlparse(href)
  if u.scheme or u.netloc or not u.path.startswith('/'):continue
  target=resolve(u.path);checked_links+=1
  if not target:issues.append('Broken local link: '+str(file.relative_to(build))+' -> '+href)
  elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:
   issues.append('Broken local anchor: '+str(file.relative_to(build))+' -> '+href)
for f,p in pages.items():
 path=f.relative_to(build)
 if str(path).startswith(('notes/','playbooks/','workbench/','saved/','search/')):
  if not any('noindex' in v for v in p.robots):issues.append('Utility or alias missing noindex: '+str(path))
for path in list((root/'src').rglob('*.mdx'))+list((root/'src').rglob('*.js'))+list((root/'src').rglob('*.mjs'))+list((root/'static/downloads').glob('*.md')):
 if re.search('[“”]',path.read_text()):issues.append('Curly double quote: '+str(path.relative_to(root)))
assert (build/'CNAME').read_text().strip()=='mysmartnotes.com'
assert 'Sitemap: https://mysmartnotes.com/sitemap.xml' in (build/'robots.txt').read_text()
result={'html_pages':len(pages),'public_sitemap_urls':len(urls),'local_links_checked':checked_links,'issues':issues}
(root/'review').mkdir(exist_ok=True);(root/'review/publication-check.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result,indent=2))
raise SystemExit(bool(issues))

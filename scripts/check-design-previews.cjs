const fs = require('node:fs');
const vm = require('node:vm');
for (const name of ['index.html', '01-local-visibility.html', '02-mediterranean-collage.html', '03-lime-studio.html', '04-moving-mark.html', '05-local-pop.html']) {
 const html = fs.readFileSync('public/designs/' + name, 'utf8');
 for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
 const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
 if (new Set(ids).size !== ids.length) throw Error('Duplicate IDs');
 for (const anchor of html.matchAll(/href="#([^"]+)"/g)) if (!ids.includes(anchor[1])) throw Error('Missing anchor: ' + anchor[1]);
 if (/<[^>]+class="eyebrow"/.test(html)) throw Error('Section label found');
 if (!html.includes('lang="ru"')) throw Error('Wrong language');
 if (name !== 'index.html') {
  const section = html.match(/<section id="revision"[\s\S]*?<\/section>/)?.[0] || '';
  if ([...section.matchAll(/<input\b/g)].length !== 1) throw Error('Company search must have exactly one input');
  if (!section.includes('role="search"') || !section.includes('audit-example')) throw Error('Missing search or example report');
 }
 if (name === '04-moving-mark.html') {
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
  const sectionIds = [...main.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map(m => m[1]);
  if (sectionIds.at(-1) !== 'preguntas' || main.indexOf('id="revision"') > main.indexOf('id="preguntas"')) throw Error('Company search must remain before FAQ');
  if (main.includes('class="closing"')) throw Error('Redundant final CTA');
 }
 for (const link of html.matchAll(/(?:src|href)="([^"/:#]+\.html)"/g)) if (!fs.existsSync('public/designs/' + link[1])) throw Error('Missing page');
 console.log(name + ': syntax, anchors, language and section label checks passed');
}

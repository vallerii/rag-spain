const fs=require('node:fs');
const file='public/designs/05-local-pop.html';
let html=fs.readFileSync(file,'utf8');
const pill=html.match(/<span class="icon-pill">[\s\S]*?<\/span>/)[0];
html=html.replace(pill,'').replace('<h1>Станьте<br>','<h1>Станьте '+pill+'<br>');
html=html.replace('Светлый архитектурный интерьер с лестницей','Специалист разрабатывает архитектурный план за рабочим столом');
html=html.replace('</head>','<style>@media(min-width:701px){.channel-panel:has(details[open]) .panel-copy{max-height:calc(100svh - 150px);overflow-y:auto;padding-right:12px;scrollbar-width:thin}}@media(max-width:700px){.hero h1 .icon-pill{vertical-align:middle;margin-left:6px}}</style></head>');
fs.writeFileSync(file,html);

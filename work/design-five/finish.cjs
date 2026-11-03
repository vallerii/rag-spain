const fs=require('node:fs');
const file='public/designs/05-local-pop.html';let html=fs.readFileSync(file,'utf8');
html=html.replace("journey.style.setProperty('--travel',travel+'px');","journey.style.setProperty('--travel',travel+'px');if(mobile.matches)state(Math.round(track.scrollLeft/Math.max(1,track.clientWidth)));");
html=html.replace("track.scrollTo({left:index*track.clientWidth,behavior:reduce.matches?'instant':'smooth'})","track.scrollTo({left:index*track.clientWidth,behavior:reduce.matches?'instant':'smooth'});journey.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'})");
html=html.replace('</head>','<style>@media(max-width:700px){.channel-journey{padding-bottom:0}.journey-sticky{display:flex;flex-direction:column}.journey-track{order:1}.journey-controls{order:0;position:relative;left:auto;right:auto;bottom:auto;padding:18px 7%;background:#f9f7ec}}</style></head>');
fs.writeFileSync(file,html);

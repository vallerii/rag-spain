const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('public/designs/04-moving-mark.html','utf8');
const script=html.slice(html.indexOf('const reduceMotion='),html.indexOf('</script>',html.indexOf('const reduceMotion=')));
for(const hz of [60,120]){
 let sy=0,time=0,id=0;const queue=new Map(),events={};
 const pin={offsetWidth:90,offsetHeight:115,style:{},dataset:{},classList:{add(){}}};
 const positions=[{top:100,x:1300,y:300},{top:850,x:130,y:1250},{top:1700,x:1100,y:1900}];
 const anchors=positions.map((p,index)=>({dataset:{turn:String(index*10)},getBoundingClientRect:()=>({left:p.x-45,top:p.y-sy-55,width:90,height:110}),closest:selector=>selector==='section'?{getBoundingClientRect:()=>({top:p.top-sy})}:null}));
 const window={innerWidth:1500,innerHeight:900,get scrollY(){return sy},matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener:(name,cb)=>events[name]=cb};
 const document={body:{},fonts:{ready:{then(){}}},documentElement:{scrollHeight:4000,classList:{add(){}}},querySelector:s=>s==='.travelling-pin'?pin:{style:{}},querySelectorAll:s=>s==='[data-pin-stop]'?anchors:[]};
 const context=vm.createContext({window,document,Math,IntersectionObserver:class{observe(){}},ResizeObserver:class{observe(){}},requestAnimationFrame:cb=>{queue.set(++id,cb);return id}});
 vm.runInContext(script,context);
 function frames(count){const samples=[];for(let i=0;i<count;i++){time+=1000/hz;const next=[...queue.values()];queue.clear();next.forEach(fn=>fn(time));const coords=pin.style.transform.match(/translate3d\(([-\d.]+)px,([-\d.]+)px/);samples.push({x:Number(coords[1]),y:Number(coords[2]),visibility:pin.style.visibility,station:pin.dataset.station})}return samples}
 frames(3);
 assert.equal(pin.dataset.station,'0');
 sy=600;events.scroll();const forward=frames(hz);
 assert.equal(pin.dataset.station,'1');
 assert(forward.every(s=>s.visibility==='visible'));
 assert(Math.abs(forward.at(-1).x-(130-45))<1,'Must settle at the left anchor');
 assert(forward.every((s,i)=>!i||s.x<=forward[i-1].x+.01),'No horizontal jumps back to the right');
 // Jitter around the nominal boundary must not retrigger the flight.
 for(const scroll of [219,221,218,222,220]){sy=scroll;events.scroll();frames(2);assert.equal(pin.dataset.station,'1')}
 sy=1950;events.scroll();const end=frames(hz);assert.equal(pin.dataset.station,'2');
 assert(end.at(-1).y < 0, 'Final pin must scroll with its section rather than cling to the viewport');
 sy=0;events.scroll();const reverse=frames(hz);assert.equal(pin.dataset.station,'0');assert(reverse.every(s=>s.visibility==='visible'));
 console.log(hz+' Hz: settles at screenshot-4 position, stays visible, follows a monotonic path, resists threshold jitter, and reverses smoothly.');
}

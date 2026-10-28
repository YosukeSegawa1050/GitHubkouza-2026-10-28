/* Scroll-scrubbed SVG details: no timers, autoplay, or wheel interception. */
(() => {
 const panels=[...document.querySelectorAll('.panel')];
 const dots=[...document.querySelectorAll('[data-survey-dot]')];
 const lines=[...document.querySelectorAll('[data-code-line]')];
 const map=document.querySelector('[data-globe-map]');
 const meridians=document.querySelector('[data-globe-meridians]');
 const clamp=x=>Math.max(0,Math.min(1,x));
 function render(index,raw){
  // Initial breathing room, then a long final-state reading hold.
  const p=clamp((raw-.08)/.64),panel=panels[index],key=panel?.dataset.visual;
  if(panel)panel.querySelectorAll('[data-reveal-piece]').forEach((piece,i,all)=>{piece.style.opacity=String(.2+.8*clamp(p*1.5-i/(all.length||1)*.5));});
  if(key==='survey'){
   const lit=Math.round(97*p);
   dots.forEach((dot,i)=>{dot.setAttribute('fill',i<lit?'#397e75':'#D8DECE');dot.dataset.lit=String(i<lit);});
  }
  if(key==='japan'){
   if(map)map.setAttribute('transform',`translate(${-240*(1-p)} 0)`);
   if(meridians)meridians.setAttribute('transform',`translate(${-60*(1-p)} 0)`);
  }
  if(key==='code'){
   lines.forEach((line,i)=>{
    const text=line.dataset.codeLine, amount=clamp(p*lines.length-i);
    line.textContent=text.slice(0,Math.ceil(text.length*amount));
   });
  }
 }
 window.AtlasMotion={render,finishAll(){panels.forEach((_,i)=>render(i,1));}};
})();

/* Native scrolling. Focus and direct links remain usable in both layouts. */
(() => {
 const body=document.body, track=document.querySelector('.track'), frame=document.querySelector('.frame');
 const panels=[...document.querySelectorAll('.panel')], links=[...document.querySelectorAll('nav a')];
 const nav=document.querySelector('nav');
 // One scroll segment per article; no six-item assumptions.
 track.style.setProperty('--scroll-length',`${panels.length*110}vh`);
 const mode=document.querySelector('#mode'), counter=document.querySelector('.counter'), bar=document.querySelector('.bar i');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'), compact=matchMedia('(max-width: 999px), (max-height: 699px)');
 let userStatic=false, active=-1, ticking=false, initialized=false, localProgress=.12;
 let lastWidth=innerWidth,lastHeight=innerHeight;
 const headings=panels.map(panel=>panel.querySelector('h2')||panel);
 headings.forEach(heading=>heading.setAttribute('tabindex','-1'));
 const isEnhanced=()=>body.classList.contains('enhanced');
 const bounded=index=>Math.max(0,Math.min(panels.length-1,index));
 function focusHeading(index){headings[index].focus({preventScroll:true});}
 function keepNavItemVisible(link){
  if(!nav||!link||nav.clientHeight<=0||nav.scrollHeight<=nav.clientHeight)return;
  const box=nav.getBoundingClientRect(),item=link.getBoundingClientRect(),pad=8;
  // Adjust only the navigation scroller, never the document scroll position.
  if(item.top<box.top+pad)nav.scrollTop-=box.top+pad-item.top;
  else if(item.bottom>box.bottom-pad)nav.scrollTop+=item.bottom-box.bottom+pad;
 }
 nav?.addEventListener('focusin',event=>{const link=event.target.closest('a');if(link)keepNavItemVisible(link);});
 function select(index,focusTarget=false){
  index=bounded(index);
  const changed=active!==index;
  // Move an existing panel focus before making its former panel inert/hidden.
  const movePanelFocus=isEnhanced()&&active!==index&&panels.some(panel=>panel.contains(document.activeElement));
  const target=panels[index];target.inert=false;target.removeAttribute('aria-hidden');
  target.classList.add('active');
  if(focusTarget||movePanelFocus)focusHeading(index);
  if(active!==index)localProgress=.12;
  active=index;
  panels.forEach((panel,i)=>{
   const selected=i===index,hidden=isEnhanced()&&!selected;
   panel.classList.toggle('active',selected);panel.inert=hidden;
   if(hidden)panel.setAttribute('aria-hidden','true');else panel.removeAttribute('aria-hidden');
  });
  links.forEach(link=>link.hash==='#'+target.id?link.setAttribute('aria-current','true'):link.removeAttribute('aria-current'));
  if(changed&&(!nav?.contains(document.activeElement)||focusTarget))keepNavItemVisible(links.find(link=>link.hash==='#'+target.id));
  counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(panels.length).padStart(2,'0')}`;
  bar.style.width=`${(index+1)/panels.length*100}%`;
 }
 function scrollDistance(){return Math.max(1,track.offsetHeight-frame.offsetHeight-28);}
 function update(){
  ticking=false;
  if(isEnhanced()){
   const progress=Math.max(0,Math.min(.999999,(-track.getBoundingClientRect().top+24)/scrollDistance()));
   const position=progress*panels.length,index=Math.floor(position);
   select(index);
   localProgress=position-index;
   window.AtlasMotion?.render(index,localProgress);
  }else{
   window.AtlasMotion?.finishAll();
   // The counter and current item also follow normal reading in the fallback.
   let index=0;const readingLine=Math.min(innerHeight*.3,160);
   panels.forEach((panel,i)=>{if(panel.getBoundingClientRect().top<=readingLine)index=i;});
   select(index);
  }
 }
 function requestUpdate(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
 function jump(index,focusTarget=false,fraction=.12){
  index=bounded(index);
  // Reveal the requested article before focusing it or asking the browser to scroll.
  select(index,focusTarget);
  localProgress=Math.max(0,Math.min(.999999,fraction));
  if(isEnhanced()){
   const top=window.scrollY+track.getBoundingClientRect().top-24;
   window.scrollTo({top:Math.max(0,top+(index+localProgress)/panels.length*scrollDistance()),behavior:'auto'});
   window.AtlasMotion?.render(index,localProgress);
  }else {window.AtlasMotion?.finishAll();panels[index].scrollIntoView({behavior:'auto',block:'start'});}
 }
 function setup(preserve=false){
  const previous=Math.max(0,active), previousProgress=localProgress;
  let enhanced=!reduced.matches&&!compact.matches&&!userStatic,overflow=false;
  const panelHasFocus=panels.some(panel=>panel.contains(document.activeElement));
  body.classList.toggle('enhanced',enhanced);body.classList.toggle('flow',!enhanced);
  // Font enlargement / zoom can overflow even above the width-height breakpoint.
  // Read actual layout only; zero dimensions in a non-layout test are not overflow.
  if(enhanced&&panels.some(panel=>panel.clientHeight>0&&panel.scrollHeight>panel.clientHeight+2)){
   overflow=true;enhanced=false;body.classList.remove('enhanced');body.classList.add('flow');
  }
  mode.setAttribute('aria-pressed',String(!enhanced));
  mode.textContent=enhanced?'一覧表示に切り替え':'固定フレームに切り替え';
  mode.disabled=reduced.matches||compact.matches||overflow;
  if(mode.disabled)mode.textContent=overflow?'内容が収まる一覧表示':'読みやすい一覧表示';
  // Do not reset the reader to item 1 when viewport or OS settings change.
  if(initialized&&preserve)jump(previous,panelHasFocus,previousProgress);else update();
  initialized=true;
 }
 function indexFromHash(hash){return panels.findIndex(panel=>'#'+panel.id===hash);}
 // Include the skip link, not just the sidebar links. Native hash scrolling
 // cannot identify the scroll interval of absolutely positioned sticky panels.
 document.querySelectorAll('a[href^="#"]').forEach(link=>{
  const index=indexFromHash(link.hash);if(index<0)return;
  link.addEventListener('click',event=>{
   if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   event.preventDefault();
   if(location.hash!==link.hash){try{history.pushState(null,'',link.hash);}catch(_){/* Offline history policy must not block navigation. */}}
   jump(index,true);
  });
 });
 window.addEventListener('hashchange',()=>{const index=indexFromHash(location.hash);if(index>=0)jump(index,true);else requestUpdate();});
 mode.addEventListener('click',()=>{userStatic=!userStatic;setup(true);});
 window.addEventListener('scroll',requestUpdate,{passive:true});
 window.addEventListener('resize',()=>{
  if(innerWidth===lastWidth&&innerHeight===lastHeight)return;
  lastWidth=innerWidth;lastHeight=innerHeight;setup(true);
 });
 reduced.addEventListener('change',()=>setup(true));compact.addEventListener('change',()=>setup(true));
 setup();
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>setup(true));
 const initial=indexFromHash(location.hash);if(initial>=0)jump(initial);
})();

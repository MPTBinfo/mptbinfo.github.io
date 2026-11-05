(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const prefix = 'mptb-narmada-review-2026-';
  const docs = [
    { title:'Official Meeting Agenda', tag:'PDF · 1 PAGE', icon:'PDF', subtitle:'Six meeting agenda items · 05 November 2026', path:'documents/MPTB_Official_Meeting_Agenda_05Nov2026.pdf', preview:true },
    { title:'Arthmitra Proposal · Master Deck', tag:'PDF · 56 PAGES', icon:'PDF', subtitle:'“From Maikal’s waters to Sarhi’s wild” · Sept 2026', path:'documents/Proponent_Master_Deck_September_2026.pdf', preview:true },
    { title:'MPTB Project Examination Note', tag:'PDF · 8 PAGES', icon:'PDF', subtitle:'Technical, legal, asset, approval and action-point review', path:'documents/MPTB_Project_Examination_Note_05Nov2026.pdf', preview:true },
    { title:'Proposal Summary', tag:'PDF · 1 PAGE', icon:'PDF', subtitle:'Executive proposal, major assets and requested support', path:'documents/Project_Proposal_Summary.pdf', preview:true },
    { title:'MPTB Examination Note · Editable', tag:'DOCX · ORIGINAL', icon:'DOC', subtitle:'Original Word document for internal review and editing', path:'documents/MPTB_Project_Examination_Note_05Nov2026.docx', preview:false },
    { title:'Google Earth · Cinematic Circuit', tag:'KMZ · GEOSPATIAL', icon:'KMZ', subtitle:'Route linework, places, imagery and 30% concept overlays', path:'documents/Narmada_Cruise_Google_Earth_Cinematic.kmz', preview:false },
    { title:'Executive Earth Meeting Kit', tag:'ZIP · ORIGINAL', icon:'ZIP', subtitle:'Two Earth presentations, preview image and presenter guide', path:'documents/Narmada_Executive_Earth_Meeting_Kit.zip', preview:false },
    { title:'Illustrated Route Preview', tag:'PNG · VISUAL', icon:'PNG', subtitle:'Maikal–Payli–Tintni–Sarhi schematic overview', path:'documents/Narmada_Illustrated_Route_Preview.png', preview:false }
  ];
  const docGrid = $('#docGrid');
  docs.forEach(d => {
    const card = document.createElement('article'); card.className='doc-card';
    card.innerHTML = `<div class="doc-top"><div class="file-icon">${d.icon}</div><span class="file-tag">${d.tag}</span></div><h3>${d.title}</h3><p>${d.subtitle}</p><div class="doc-actions">${d.preview?'<button class="doc-btn primary preview-btn">◱ &nbsp; View file</button>':''}<a class="doc-btn" href="${d.path}" download>↓ &nbsp; Download</a>${!d.preview?`<a class="doc-btn" href="${d.path}" target="_blank" rel="noopener">↗ &nbsp; Open</a>`:''}</div>`;
    card.querySelector('.preview-btn')?.addEventListener('click', () => openDocument(d));
    docGrid.appendChild(card);
  });
  function openDocument(d) {
    $('#viewerTitle').textContent=d.title;
    const url=new URL(d.path,location.href).href;
    $('#documentFrame').src=url+'#toolbar=1&navpanes=0';
    $('#viewerDownload').href=url;$('#viewerOpenNew').href=url;
    $('#documentDialog').showModal();
  }
  function closeDoc(){ $('#documentDialog').close();$('#documentFrame').src='about:blank'; }
  $('#closeViewer').addEventListener('click',closeDoc);
  $('#documentDialog').addEventListener('click',e=>{if(e.target===$('#documentDialog'))closeDoc();});
  $('#documentDialog').addEventListener('close',()=>$('#documentFrame').src='about:blank');
  $$('.gallery-thumb').forEach(b=>b.addEventListener('click',()=>{ $('#lightboxTitle').textContent=b.dataset.title;$('#lightboxImage').src=b.dataset.img;$('#imageDialog').showModal(); }));
  $('#closeLightbox').addEventListener('click',()=>$('#imageDialog').close());
  $('#imageDialog').addEventListener('click',e=>{if(e.target===$('#imageDialog'))$('#imageDialog').close();});
  $('#printPage').addEventListener('click',()=>window.print());
  $('#menuToggle').addEventListener('click',()=>{$('#sidebar').classList.toggle('open');});
  $$('.nav-link').forEach(a=>a.addEventListener('click',()=>{$('#sidebar').classList.remove('open');}));
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){$$('.nav-link').forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id));}})},{rootMargin:'-110px 0px -65% 0px'});
    $$('.panel-anchor').forEach(el=>io.observe(el));
  }
  const requirements = [
    'Signed proposal, LLP registration/profile and authorised signatory credentials',
    'Detailed Project Report with site-wise drawings, scope, phasing and implementation schedule',
    'Full signed WAPCOS study, annexures, hydrographic survey and seasonal navigation limits',
    'Geo-referenced route with coordinates, chainage and confirmed landing sites',
    'Reconciliation of 67 km / 90 km / digitized water-route descriptions',
    'One final vessel fleet plan, certified capacity, battery and charging specifications',
    'Vessel-specific passenger safety, rescue, emergency, crew and insurance plans',
    'Land schedule: khasra / survey numbers, area, title, possession and intended use',
    'Site-specific forest, wildlife, environment and pollution applicability assessments',
    'Project capex, source of funds, investor credentials, viability and concession terms',
    'Current asset custody, existing contracts, availability and condition of MPT properties',
    'Written details and roles of proposed hospitality / operating partners'
  ];
  const storedFlags = (()=>{try{return JSON.parse(localStorage.getItem(prefix+'requirements'))||{}}catch{return {}}})();
  requirements.forEach((label,i)=>{
    const li=document.createElement('label');li.className='req-item';
    const box=document.createElement('input');box.type='checkbox';box.checked=!!storedFlags[i];
    const span=document.createElement('span');span.textContent=label;
    li.append(box,span);li.classList.toggle('checked',box.checked);
    box.addEventListener('change',()=>{storedFlags[i]=box.checked;localStorage.setItem(prefix+'requirements',JSON.stringify(storedFlags));li.classList.toggle('checked',box.checked);});
    $('#requirementsList').appendChild(li);
  });
  ['discussionNotes','directionsNotes'].forEach(id=>{
    const el=$('#'+id);el.value=localStorage.getItem(prefix+id)||'';
    el.addEventListener('input',()=>localStorage.setItem(prefix+id,el.value));
  });
  $('#resetNotes').addEventListener('click',()=>{if(!confirm('Clear the notes and checklist stored in this browser?'))return;['discussionNotes','directionsNotes'].forEach(id=>{$('#'+id).value='';localStorage.removeItem(prefix+id)});Object.keys(storedFlags).forEach(k=>delete storedFlags[k]);localStorage.removeItem(prefix+'requirements');$$('.req-item input').forEach(x=>{x.checked=false;x.closest('.req-item').classList.remove('checked')});});
  $('#exportNotes').addEventListener('click',()=>{
    const text=`MPTB — PROPOSED NARMADA CRUISE & ECO-TOURISM CIRCUIT\nMEETING NOTE · 05 NOVEMBER 2026 · 01:00 PM · MPTB BHOPAL\n\nPROJECT PROPONENT: Shri Ashish Mahawar, Arthmitra Advisors LLP\nSTATUS: Working draft prepared locally; requires verification and formal adoption.\n\nDISCUSSION NOTES\n${$('#discussionNotes').value||'(None recorded)'}\n\nDIRECTIONS / NEXT STEPS\n${$('#directionsNotes').value||'(None recorded)'}\n\nDOCUMENTS DISCUSSED (LOCAL CHECKLIST ONLY)\n${requirements.map((x,i)=>`${storedFlags[i]?'[x]':'[ ]'} ${x}`).join('\n')}\n\nDISCLAIMER: Checklist marks do not represent government approvals. This document is a personal/local draft, not signed official minutes.\n`;
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.download='MPTB_Narmada_Cruise_Meeting_Note_05Nov2026.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  });


  // LOCAL VECTOR ATLAS.  The geometry below is derived from the supplied original KMZ.
  // No Leaflet, tile server, API token, third-party geocoding or network fetch is required.
  const geo = window.CIRCUIT_ROUTE;
  const host = $('#liveMap');
  if(!geo || !Array.isArray(geo.features) || geo.features.length!==3){
    host.innerHTML='<div class="map-fallback">Source route data could not be loaded. Please verify route-data.js.</div>';
    return;
  }
  const features=geo.features;
  const raw=features.flatMap(f=>f.geometry.coordinates);
  const xs=raw.map(c=>c[0]),ys=raw.map(c=>c[1]);
  const minx=Math.min(...xs),maxx=Math.max(...xs),miny=Math.min(...ys),maxy=Math.max(...ys);
  const W=1040,H=650,pad=76,scale=Math.min((W-2*pad)/(maxx-minx),(H-2*pad)/(maxy-miny));
  const left=(W-(maxx-minx)*scale)/2,below=(H-(maxy-miny)*scale)/2;
  const xy=c=>[left+(c[0]-minx)*scale,H-below-(c[1]-miny)*scale];
  const path=f=>f.geometry.coordinates.map((p,i)=>{const c=xy(p);return (i?'L':'M')+c[0].toFixed(2)+','+c[1].toFixed(2)}).join('');
  const segmentPaths=features.map(path);
  const routeStops=[
    {key:'maikal',name:'Maikal / Bargi',sub:'MPT resort and existing jetty; proposed cruise boarding',i:0,f:0,kind:'embarkation'},
    {key:'payli',name:'Payli',sub:'Proposed guest house / waterside tourism halt',i:0,f:1,kind:'water'},
    {key:'harduli',name:'Harduli · 40 ha',sub:'Approx. 40 hectares proposed for resort development; precise site coordinates pending',i:1,f:.04,kind:'concept'},
    {key:'oldpayli',name:'Old Payli Island',sub:'Island tourism proposal; plotted location is indicative',i:1,f:.16,kind:'concept'},
    {key:'lanka',name:'Lanka Island',sub:'Island tourism proposal; plotted location is indicative',i:1,f:.47,kind:'concept'},
    {key:'tintni',name:'Tintni',sub:'Proposed landing point and road transfer; suitable jetty subject to verification',i:1,f:1,kind:'water'},
    {key:'sarhi',name:'Sarhi / Kanha',sub:'MPT Jungle Resort Sarhi and proposed onward road connectivity',i:2,f:1,kind:'road'},
  ];
  const pointAt=(segment,fraction)=>{
    const line=features[segment].geometry.coordinates;
    const num=Math.max(0,Math.min(line.length-1,fraction*(line.length-1))),i=Math.floor(num),v=num-i;
    const a=line[i],b=line[Math.min(i+1,line.length-1)];return [a[0]+(b[0]-a[0])*v,a[1]+(b[1]-a[1])*v];
  };
  const pointXY=stop=>xy(pointAt(stop.i,stop.f));
  const pinShape=routeStops.map((p,i)=>{
    const [x,y]=pointXY(p);
    const label=p.name.replace(/&/g,'&amp;');
    return `<g class="atlas-stop" data-stop="${p.key}" tabindex="0" role="button" aria-label="${label}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><circle r="18" fill="${p.kind==='concept'?'#e3ad68':'#5ed6dc'}" opacity=".18"/><circle r="8" stroke="#102638" stroke-width="3" fill="${p.kind==='concept'?'#e3ad68':'#7ef0ee'}"/><text y="-23" text-anchor="middle">${label}</text></g>`;
  }).join('');
  const contours=Array.from({length:15},(_,i)=>`<path d="M ${-120+i*80} 0 Q ${160+i*38} ${70+i*17} ${110+i*45} 230 T ${400+i*48} 680" fill="none" stroke="#789e98" stroke-opacity=".16"/>`).join('');
  host.innerHTML=`<div class="atlas-stage" id="atlasStage"><svg id="atlasSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-label="Local GIS cruise and road route map">
  <defs><pattern id="atlasGrid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="#6b9b97" stroke-opacity=".13"/></pattern><filter id="atlasGlow"><feGaussianBlur stdDeviation="5"/></filter></defs>
  <g id="atlasTransform"><rect width="${W}" height="${H}" fill="url(#atlasGrid)"/>
  <g id="atlasTerrain">${contours}<path d="${segmentPaths[0]} ${segmentPaths[1]}" stroke="#235f6c" stroke-opacity=".23" stroke-width="33" fill="none" stroke-linecap="round"/></g>
  <g id="atlasIllustration"></g><g id="atlasPhoto"></g>
  <g id="atlasWater">${[0,1].map(i=>`<path d="${segmentPaths[i]}" fill="none" stroke="#0bdde3" stroke-width="16" opacity=".16" filter="url(#atlasGlow)"/><path d="${segmentPaths[i]}" fill="none" stroke="#54dfe8" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</g>
  <g id="atlasRoad"><path d="${segmentPaths[2]}" fill="none" stroke="#f1b06c" stroke-width="14" opacity=".18" filter="url(#atlasGlow)"/><path d="${segmentPaths[2]}" fill="none" stroke="#ffbd75" stroke-width="4" stroke-dasharray="9 8" stroke-linecap="round"/></g>
  <g id="atlasStops">${pinShape}</g><g id="atlasVehicle"></g></g>
  </svg><div class="atlas-compass">N <span>↑</span></div><div class="atlas-scale">GEOREFERENCED KMZ LINEWORK <b>•</b> SCHEMATIC TERRAIN</div><div class="atlas-zoom"><button id="atlasPlus" aria-label="Zoom in">+</button><button id="atlasMinus" aria-label="Zoom out">−</button><button id="atlasFit" aria-label="Fit map">⌖</button></div><div class="atlas-info" id="atlasInfo">Select a location to review asset connectivity</div></div>`;
  let zoom=1,shift=[0,0],drag=null;
  const svg=$('#atlasSVG'),transform=$('#atlasTransform');
  const updateTransform=()=>transform.setAttribute('transform',`translate(${shift[0]} ${shift[1]}) translate(${W/2} ${H/2}) scale(${zoom}) translate(${-W/2} ${-H/2})`);
  const setZoom=f=>{zoom=Math.max(1,Math.min(5,zoom*f));updateTransform()};
  $('#atlasPlus').onclick=()=>setZoom(1.25);$('#atlasMinus').onclick=()=>setZoom(.8);
  const fit=()=>{zoom=1;shift=[0,0];updateTransform()};$('#atlasFit').onclick=fit;$('#fitMap').onclick=fit;
  svg.addEventListener('wheel',e=>{e.preventDefault();setZoom(e.deltaY<0?1.14:.875)},{passive:false});
  svg.addEventListener('pointerdown',e=>{drag=[e.clientX,e.clientY,shift[0],shift[1]];svg.setPointerCapture(e.pointerId)});
  svg.addEventListener('pointermove',e=>{if(!drag)return;const ratio=W/svg.getBoundingClientRect().width;shift=[drag[2]+(e.clientX-drag[0])*ratio,drag[3]+(e.clientY-drag[1])*ratio];updateTransform()});
  const endDrag=()=>drag=null;svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);
  const selectStop=key=>{
    const stop=routeStops.find(s=>s.key===key);if(!stop)return;
    $$('.atlas-stop').forEach(e=>e.classList.toggle('selected',e.dataset.stop===key));
    $$('.waypoint').forEach(e=>e.classList.toggle('selected',e.dataset.point===key));
    const text=stop.kind==='concept'?'CONCEPTUAL LOCATION · FIELD VERIFICATION REQUIRED':'PROPOSED CONNECTION · FOR DISCUSSION ONLY';
    $('#atlasInfo').innerHTML=`<strong>${stop.name}</strong><span>${stop.sub}</span><small>${text}</small>`;
    zoom=Math.max(1.22,zoom);const [x,y]=pointXY(stop);shift=[(W/2-x)*zoom,(H/2-y)*zoom];updateTransform();
  };
  $$('.atlas-stop').forEach(el=>{el.onclick=()=>selectStop(el.dataset.stop);el.addEventListener('keydown',e=>{if(e.key==='Enter')selectStop(el.dataset.stop)})});
  $$('.waypoint').forEach(el=>el.onclick=()=>selectStop(el.dataset.point));
  $('#waterLayer').onchange=e=>$('#atlasWater').style.display=e.target.checked?'':'none';
  $('#roadLayer').onchange=e=>$('#atlasRoad').style.display=e.target.checked?'':'none';
  const illustration=$('#atlasIllustration'),photo=$('#atlasPhoto');
  // The illustrative image overlay is fitted to the source's approximate georeferenced bounds,
  // rather than precisely to surveyed asset footprints.
  const northWest=xy([79.842878,23.0171]);const southEast=xy([80.7738027,22.334046]);
  const w=southEast[0]-northWest[0],h=southEast[1]-northWest[1];
  const putImage=(target,src)=>{const im=document.createElementNS('http://www.w3.org/2000/svg','image');im.setAttribute('href',src);im.setAttribute('x',northWest[0]);im.setAttribute('y',northWest[1]);im.setAttribute('width',w);im.setAttribute('height',h);im.setAttribute('preserveAspectRatio','none');im.setAttribute('opacity','.3');target.append(im)};
  putImage(illustration,'assets/Geo_Illustration_Transparent.png');putImage(photo,'assets/Geo_Concept_Photos_Transparent.png');
  $('#illustrationLayer').onchange=e=>{illustration.style.display=e.target.checked?'':'none'};
  $('#photoLayer').onchange=e=>{photo.style.display=e.target.checked?'':'none'};
  illustration.style.display='none';photo.style.display='none';
  $$('.mode-btn').forEach(btn=>btn.onclick=()=>{
    $$('.mode-btn').forEach(x=>x.classList.toggle('selected',x===btn));
    host.dataset.theme=btn.dataset.layer;
    $('#atlasTerrain').style.display=btn.dataset.layer==='street'?'none':'';
  });
  let playing=false,raf=0,t0=0;
  const mover=$('#atlasVehicle'),animateButton=$('#animateRoute');
  const totalCoords=features.flatMap((f,i)=>i?f.geometry.coordinates.slice(1):f.geometry.coordinates);
  const endPlay=()=>{playing=false;cancelAnimationFrame(raf);animateButton.textContent='▷   Follow circuit'};
  animateButton.onclick=()=>{
    if(playing){endPlay();return}
    playing=true;t0=performance.now();animateButton.textContent='■   Pause route';
    const draw=now=>{
      if(!playing)return;
      const fraction=((now-t0)%32000)/32000;
      const idx=Math.min(totalCoords.length-1,Math.floor(fraction*(totalCoords.length-1)));
      const [x,y]=xy(totalCoords[idx]);
      mover.innerHTML=`<circle cx="${x}" cy="${y}" r="21" fill="#20d9e5" opacity=".18"/><circle cx="${x}" cy="${y}" r="10" stroke="white" stroke-width="3" fill="${idx>=590?'#efb472':'#32d9e6'}"/><text x="${x}" y="${y-22}" text-anchor="middle" font-size="13" fill="white" font-weight="bold" paint-order="stroke" stroke="#103046" stroke-width="3">${idx>=590?'ROAD':'CRUISE'}</text>`;
      raf=requestAnimationFrame(draw);
    };raf=requestAnimationFrame(draw);
  };
  window.addEventListener('pagehide',endPlay);
  selectStop('maikal');fit();
})();

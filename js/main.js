/* Priyesh Singh | AI/ML Portfolio: interactions (nav, skills orbit, certificates wheel, chat, contact form, resume download) */
(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// tilt + lens
document.querySelectorAll('.card,.photo').forEach(function(c){
 c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
  if(!reduce)c.style.transform='rotateY('+x*12+'deg) rotateX('+(-y*12)+'deg)'});
 c.addEventListener('pointerleave',function(){c.style.transform='';c.style.setProperty('--mx','-400px');c.style.setProperty('--my','-400px')});
});
// role scramble
var roles=['AI Enthusiast · Aspiring Developer','Prompt engineering','Data science student','Machine Learning Practitioner'],ri=0,re=document.getElementById('role'),G='ABCDEFGHJKLMNPQRSTUVWXYZ<>/{}01';
function scr(w){if(reduce){re.textContent=w;return}var k=0;(function s(){k++;var o='';for(var i=0;i<w.length;i++)o+=(i<k/1.1||w[i]==' ')?w[i]:G[Math.random()*G.length|0];re.textContent=o;if(k<w.length*1.1+2)setTimeout(s,30)})()}
scr(roles[0]);setInterval(function(){ri=(ri+1)%roles.length;scr(roles[ri])},2800);
// scroll bar + active nav
var hint=document.querySelector('.hint'),bar=document.getElementById('bar'),links=[].slice.call(document.querySelectorAll('nav a:not(.cta)'));
addEventListener('scroll',function(){var m=document.documentElement.scrollHeight-innerHeight;bar.style.width=(m>0?scrollY/m*100:0)+'%';if(hint)hint.style.opacity=scrollY>innerHeight*.6?1:0},{passive:true});
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(function(s){so.observe(s)});
// count-up
var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var t=+e.target.dataset.c,s=e.target.dataset.s||'',k=0;
 (function s2(){k++;e.target.textContent=Math.round(t*Math.min(1,k/(reduce?1:40)))+(k>=(reduce?1:40)?s:'');if(k<(reduce?1:40))requestAnimationFrame(s2)})()})},{threshold:.6});
document.querySelectorAll('[data-c]').forEach(function(n){co.observe(n)});
// screenshot lightbox
var lb=document.getElementById('lbx');
function openImg(src,alt,note){var big=lb.querySelector('img'),nn=document.getElementById('lbn');big.src=src;big.alt=alt||'';nn.hidden=!note;nn.textContent=note||'';lb.classList.add('show')}
function openShot(s){var im=s.querySelector('img');if(im)openImg(im.src,im.alt)}
document.querySelectorAll('.shot,.cert').forEach(function(s){s.addEventListener('click',function(){openShot(s)});s.addEventListener('keydown',function(e){if(e.key=='Enter'||e.key==' '){e.preventDefault();openShot(s)}})});
lb.addEventListener('click',function(){lb.classList.remove('show')});
addEventListener('keydown',function(e){if(e.key=='Escape')lb.classList.remove('show')});
// project accordion
document.querySelectorAll('.proj>button').forEach(function(b){b.addEventListener('click',function(){var p=b.parentNode,o=p.classList.toggle('open');b.setAttribute('aria-expanded',o)})});
// chat (scripted answers from the resume, no network)
var K=[[['project','built','nutri','cyber','threat'],'Two main projects: NutriGuide, an AI nutrition assistant on IBM watsonx.ai with a Streamlit interface, and an ML-based cybersecurity threat detection system with a real-time alert dashboard. Open the Work section for details.'],
[['skill','tech','stack','language','python','tools'],'Python, Java, C and R; Generative AI, prompt engineering, IBM watsonx.ai and scikit-learn; Streamlit, HTML/CSS, MySQL, Git/GitHub and IBM Cloud; plus data structures, OOP, computer networks and operating systems.'],
[['intern','ibm','experience','work'],'Priyesh completed the IBM SkillsBuild AI & Cloud Technologies internship (June to July 2026), where he built and deployed NutriGuide on watsonx.ai.'],
[['study','educat','college','universit','cgpa','degree','school','12th','10th','board','cbse'],'B.Tech in Computer Science (AI & Data Science) at Poornima University, 2024 to 2028, with an 8.00 CGPA through four semesters. Class 12th at M.H.S College, Patna, Bihar (72%). Class 10th at J.D. Public School, Bangra, Saran, Bihar (CBSE).'],
[['cert'],'Six certificates: Oracle Certified Generative AI Professional, Oracle Certified AI Foundations Associate, Google Cloud Career Launchpad (Data Analytics), HackerRank SQL (Basic), the Edunet/IBM SkillsBuild internship in Emerging Technologies, and the NPTEL Elite certificate in Environmental Planning and Management (IIT Roorkee, 81%).'],
[['contact','hire','email','reach','linkedin','github'],'Email priyesh666singh@gmail.com, or find him on LinkedIn and GitHub as Priyesh666 (links in the Contact section).']];
var chat=document.getElementById('chat'),fab=document.getElementById('fab'),msgs=document.getElementById('msgs'),qs=document.getElementById('qs'),ci2=document.getElementById('ci');
function add(t,c){var d=document.createElement('div');d.className='m '+c;d.textContent=t;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
function ask(q){add(q,'u');var l=q.toLowerCase(),a='I can answer questions about Priyesh\'s projects, skills, internship, education, certifications and contact details. Try one of the buttons.';
 K.some(function(k){return k[0].some(function(w){return l.indexOf(w)>-1})&&(a=k[1],true)});setTimeout(function(){add(a,'b')},reduce?0:350)}
add('Hi! I\'m a scripted assistant for this portfolio. What would you like to know?','b');
['What has he built?','Which skills?','Internship','Contact'].forEach(function(q){var b=document.createElement('button');b.type='button';b.textContent=q;b.onclick=function(){ask(q)};qs.appendChild(b)});
fab.onclick=function(){setChat(!chat.classList.contains('show'))};
function setChat(o){chat.classList.toggle('show',o);fab.setAttribute('aria-expanded',o)}
chat.querySelector('.cx').onclick=function(){setChat(false);fab.focus()};
document.addEventListener('pointerdown',function(e){if(chat.classList.contains('show')&&!chat.contains(e.target)&&!fab.contains(e.target))setChat(false)},true);
document.addEventListener('keydown',function(e){if(e.key=='Escape'&&chat.classList.contains('show')){setChat(false);fab.focus()}});
document.getElementById('cf').onsubmit=function(e){e.preventDefault();var v=ci2.value.trim();if(v){ask(v);ci2.value=''}};
// ghost silhouette, cursor glow, hero scroll
var gh=document.getElementById('ghost'),glow=document.getElementById('glow'),hl=document.getElementById('hl'),pw=document.querySelector('.pw');
gh.style.backgroundImage='url('+document.querySelector('.photo img').src+')';
addEventListener('pointermove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
 gh.style.setProperty('--gx',(-x*60)+'px');gh.style.setProperty('--gy',(-y*40)+'px');
 glow.style.setProperty('--x',e.clientX+'px');glow.style.setProperty('--y',e.clientY+'px')});
function hs(){var p=Math.min(1,scrollY/(innerHeight*.9));hl.style.transform='translateY('+(-p*70)+'px)';hl.style.opacity=1-p*1.15;
 pw.style.transform='translateY('+(-p*120)+'px) scale('+(1-p*.14)+')';pw.style.opacity=1-p*1.1}
if(!reduce){addEventListener('scroll',hs,{passive:true});hs()}
// scroll reveals + drifting ghost words
var secs=[].slice.call(document.querySelectorAll('.sec'));
function gp(){secs.forEach(function(s){var r=s.getBoundingClientRect();s.style.setProperty('--gx',((r.top-innerHeight*.5)*-.3)+'px')})}
if(!reduce){addEventListener('scroll',gp,{passive:true});gp();
 var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{threshold:.12});
 document.querySelectorAll('.sec h2,.st,.card,.proj,.orb,.mq,.tlw,.two>div,.ct h2,.ct p,.ct .btns').forEach(function(el){
  var i=[].indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',(i%4)*.1+'s');el.classList.add(el.tagName=='H2'?'rvh':'rv');ro.observe(el)});
 // magnetic buttons
 document.querySelectorAll('.btn,.fab').forEach(function(b){
  b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});
  b.addEventListener('pointerleave',function(){b.style.transform=''})})}
// contact form and resume download
function toast(t){var d=document.createElement('div');d.className='toast';d.setAttribute('role','status');d.textContent=t;document.body.appendChild(d);setTimeout(function(){d.remove()},4200)}
var RESUME_URL='assets/Priyesh_Singh_Resume.pdf';
document.querySelectorAll('.dl').forEach(function(b){b.addEventListener('click',function(){var a=document.createElement('a');a.href=RESUME_URL;a.download='Priyesh_Singh_Resume.pdf';document.body.appendChild(a);a.click();a.remove();toast('Resume downloading.')})});
var fm=document.getElementById('fm'),fnote=document.getElementById('fnote');
function copyText(t){if(navigator.clipboard&&navigator.clipboard.writeText){return navigator.clipboard.writeText(t)}
 var x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy')}catch(e){}x.remove();return Promise.resolve()}
var FORM_KEY='07e80460-ccba-41a6-86ff-23905cd72e2f'; // Web3Forms access key: paste it here so "Send message" emails you directly when the page is on your own hosting
var sendBtn=fm.querySelector('button[type=submit]'),SUB='';
function fallback(n,m,body){
 var sub='Portfolio message from '+n,enc=encodeURIComponent,to='priyesh666singh@gmail.com';
 var a=document.getElementById('mailgo');a.href='mailto:'+to+'?subject='+enc(sub)+'&body='+enc(body);a.click();
 var g='https://mail.google.com/mail/?view=cm&fs=1&to='+enc(to)+'&su='+enc(sub)+'&body='+enc(body);
 fnote.innerHTML='Opening your email app. If nothing opens, <a class="lnk" href="'+g+'" target="_blank" rel="noopener">open Gmail</a> or <button type="button" class="lnk" id="cp">copy the message</button> and send it to '+to+'.';
 document.getElementById('cp').onclick=function(){copyText(body).then(function(){toast('Message copied.')})}}
fm.addEventListener('submit',function(e){e.preventDefault();
 var n=document.getElementById('fn').value.trim(),m=document.getElementById('fe').value.trim(),t=document.getElementById('fmsg').value.trim();
 if(!n||!/^\S+@\S+\.\S+$/.test(m)||!t){fnote.textContent='Please enter your name, a valid email and a message.';return}
 var body=t+'\n\nFrom: '+n+' ('+m+')';
 if(!FORM_KEY){fallback(n,m,body);return}
 sendBtn.disabled=true;fnote.textContent='Sending...';
 fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:FORM_KEY,name:n,email:m,message:t,subject:'Portfolio message from '+n})})
 .then(function(r){return r.json()}).then(function(j){if(!j.success)throw 0;fnote.textContent='Message sent. Thank you, I will reply soon.';fm.reset();toast('Message sent.')})
 .catch(function(){fnote.textContent='Could not send it automatically.';fallback(n,m,body)})
 .then(function(){sendBtn.disabled=false})});
if(typeof ro!=='undefined'&&ro){fm.classList.add('rv');ro.observe(fm)}
// certificates revolving around the hub (auto-spin, hover to pause, drag to spin)
(function(){var bd=document.getElementById('crb'),cs=[].slice.call(bd.querySelectorAll('.cc')),hub=document.getElementById('crh'),h=document.getElementById('crht'),o=document.getElementById('crho'),t=document.getElementById('cft'),g=document.getElementById('cfo'),d=document.getElementById('cfd2'),nn=document.getElementById('cfn2'),box=document.getElementById('cfi');
var H0=h.textContent,O0=o.textContent,N0=nn.textContent;
function show(c){h.textContent=c.dataset.t;o.textContent=c.dataset.o;t.textContent=c.dataset.t;g.textContent=c.dataset.o;d.textContent=c.dataset.d;nn.textContent=c.dataset.n;box.classList.remove('in');void box.offsetWidth;box.classList.add('in')}
function reset(){h.textContent=H0;o.textContent=O0;t.textContent='';g.textContent='';d.textContent='';nn.textContent=N0}
var rot=0,vel=0,base=(typeof reduce!=='undefined'&&reduce)?0:7,hold=0,drag=false,moved=false,suppress=false,vis=true,last=performance.now();
function pause(on){hold+=on?1:-1;if(hold<0)hold=0}
cs.forEach(function(c){c.addEventListener('pointerenter',function(){show(c);pause(true)});c.addEventListener('pointerleave',function(){reset();pause(false)});
 c.addEventListener('focus',function(){show(c);pause(true)});c.addEventListener('blur',function(){reset();pause(false)});
 c.addEventListener('click',function(){if(suppress){suppress=false;return}openShot(c)});
 c.addEventListener('keydown',function(e){if(e.key=='Enter'||e.key==' '){e.preventDefault();openShot(c)}})});
hub.addEventListener('pointerenter',function(){pause(true)});hub.addEventListener('pointerleave',function(){pause(false)});
// drag to spin around the hub
var sx=0,sy=0,pa=0,pt=0,down=false,pid=null;
function ang(e){var r=bd.getBoundingClientRect();return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))*180/Math.PI}
bd.addEventListener('pointerdown',function(e){if(e.button>0)return;down=true;moved=false;sx=e.clientX;sy=e.clientY;pa=ang(e);pt=performance.now();pid=e.pointerId});
addEventListener('pointermove',function(e){if(!down)return;
 if(!drag){if(Math.hypot(e.clientX-sx,e.clientY-sy)<8)return;drag=true;moved=true;bd.classList.add('drag');try{bd.setPointerCapture(pid)}catch(x){}}
 var a=ang(e),dl=a-pa;if(dl>180)dl-=360;if(dl<-180)dl+=360;var now=performance.now(),dt=Math.max(.008,(now-pt)/1000);
 rot+=dl;vel=Math.max(-240,Math.min(240,dl/dt));pa=a;pt=now});
function up(){if(!down)return;down=false;if(drag){drag=false;suppress=moved;setTimeout(function(){suppress=false},60)}bd.classList.remove('drag')}
addEventListener('pointerup',up);addEventListener('pointercancel',up);
if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(bd);
function tick(now){var dt=Math.min(.05,(now-last)/1000);last=now;
 if(vis&&!drag){var target=(hold>0||document.hidden)?0:base;vel+=(target-vel)*Math.min(1,dt*(hold>0?5:1.6));rot+=vel*dt}
 if(vis)bd.style.setProperty('--rot',(rot%360)+'deg');requestAnimationFrame(tick)}
requestAnimationFrame(tick);
})();
// skills orbit and marquees
function P(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'}
var SK=[['Java','#f89820','#b8400c',P('<path d="M5 10h11v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 11h1.5a2 2 0 0 1 0 4H16"/><path d="M8 3c-1 1.5 1 2.5 0 4M12 3c-1 1.5 1 2.5 0 4"/>')],
['C','#6d7ce0','#27348b',P('<path d="M12 2l8.5 5v10L12 22l-8.5-5V7z"/><path d="M15.5 9.5a4 4 0 1 0 0 5"/>')],
['R','#4a90e2','#1e4f9c','<svg viewBox="0 0 24 24"><text x="12" y="17" text-anchor="middle" fill="#fff" font-size="15" font-weight="800" font-family="Anton,Impact,sans-serif">R</text></svg>'],
['MySQL','#13b5d6','#00566b',P('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>')],
['Git and GitHub','#f26b4a','#9c2412',P('<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="9" r="2"/><path d="M6 8v8M16 9h-3a5 5 0 0 0-5 5"/>')],
['Streamlit','#ff5c7a','#a31d4b',P('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>')],
['IBM watsonx.ai','#4d90ff','#0530ad',P('<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="1.6"/><circle cx="19" cy="6" r="1.6"/><circle cx="5" cy="18" r="1.6"/><circle cx="19" cy="18" r="1.6"/><path d="M6.4 7l3.8 3.4M17.6 7l-3.8 3.4M6.4 17l3.8-3.4M17.6 17l-3.8-3.4"/>')],
['HTML and CSS','#ff8a4d','#c2410c',P('<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>')],
['scikit-learn','#fbb040','#2f6f9f',P('<circle cx="7" cy="16" r="1.6"/><circle cx="11" cy="11" r="1.6"/><circle cx="16" cy="14" r="1.6"/><circle cx="18" cy="7" r="1.6"/><path d="M4 20h16M4 20V4"/>')],
['Generative AI','#b784ff','#5b21b6',P('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16v4M17 18h4"/>')],
['IBM Cloud','#2fa8f5','#0043ce',P('<path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 10a4 4 0 0 1 0 8z"/>')],
['Computer Networks','#2dd4bf','#0f766e',P('<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5M12 12l6 5"/>')],
['Operating Systems','#94a3b8','#334155',P('<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/><path d="M7 9l3 2-3 2M12 13h4"/>')]];
var PY=['Python','#3b82f6','#f2b705','<svg viewBox="0 0 24 24"><text x="12" y="16.5" text-anchor="middle" fill="#fff" font-size="11" font-weight="800" font-family="Anton,Impact,sans-serif">PY</text></svg>'];
function tile(s){return '<span class="ti" style="--c1:'+s[1]+';--c2:'+s[2]+'" data-n="'+s[0]+'">'+s[3]+'</span>'}
SK.unshift(PY);
var rings=[['r1',SK.slice(0,4)],['r2',SK.slice(4)]];
function lay(){rings.forEach(function(r){var el=document.getElementById(r[0]);el.style.setProperty('--r',(el.offsetWidth/2)+'px')})}
rings.forEach(function(r){var el=document.getElementById(r[0]);el.innerHTML=r[1].map(function(s,i){return '<div class="ot" style="--a:'+(i*360/r[1].length)+'deg">'+tile(s)+'</div>'}).join('')});
lay();addEventListener('resize',lay);
var pills=SK.map(function(s){return '<div class="mp">'+tile(s)+s[0]+'</div>'}).join('');
document.querySelector('#mq1 .tr').innerHTML=pills+pills;
var tx=['Prompt engineering','Generative AI','Machine learning','Model integration','Data structures','Object-oriented programming','Computer networks','Operating systems','Data visualization','Streamlit apps'].map(function(t){return '<div class="mp">'+t+'</div>'}).join('');
document.querySelector('#mq2 .tr').innerHTML=tx+tx;
var hh=document.getElementById('hh'),orb=document.getElementById('orb');
orb.addEventListener('pointerover',function(e){var t=e.target.closest('.ti');if(t)hh.textContent=t.dataset.n});
orb.addEventListener('pointerout',function(e){if(e.target.closest('.ti'))hh.textContent='Skills'});
document.querySelectorAll('.card').forEach(function(c){c.querySelectorAll('.chip').forEach(function(ch,i){ch.style.setProperty('--k',i)})});
})();

/* Animated 3D neural-network background (needs three.js, loaded from CDN in index.html) */
(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(typeof THREE==='undefined')return;
var canvas=document.getElementById('c'),renderer;
try{renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true})}catch(e){return}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,100),group=new THREE.Group();scene.add(group);
function size(){renderer.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',size);size();

// network: layers of nodes along z
var counts=[8,12,12,12,8,4],GAP=3,nodes=[],layerOf=[];
counts.forEach(function(n,l){for(var i=0;i<n;i++){var a=Math.random()*6.283,r=Math.sqrt(Math.random())*(l==counts.length-1?1.6:4.6);
 nodes.push(new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r,-l*GAP));layerOf.push(l)}});
var edges=[];
for(var i=0;i<nodes.length;i++){var cand=[];for(var j=0;j<nodes.length;j++)if(layerOf[j]==layerOf[i]+1)cand.push(j);
 cand.sort(function(a,b){return nodes[i].distanceTo(nodes[a])-nodes[i].distanceTo(nodes[b])});
 cand.slice(0,3).forEach(function(j){edges.push([i,j])})}
var N=nodes.length,E=edges.length;

function circleTex(){var s=64,c=document.createElement('canvas');c.width=c.height=s;var g=c.getContext('2d'),gr=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
 gr.addColorStop(0,'#fff');gr.addColorStop(.35,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,s,s);return new THREE.CanvasTexture(c)}
var pPos=new Float32Array(N*3),pCol=new Float32Array(N*3);
nodes.forEach(function(v,i){pPos.set([v.x,v.y,v.z],i*3)});
var pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pPos,3));pg.setAttribute('color',new THREE.BufferAttribute(pCol,3));
var pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.55,map:circleTex(),vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
group.add(pts);
var lPos=new Float32Array(E*6),lCol=new Float32Array(E*6);
edges.forEach(function(e,k){lPos.set([nodes[e[0]].x,nodes[e[0]].y,nodes[e[0]].z,nodes[e[1]].x,nodes[e[1]].y,nodes[e[1]].z],k*6)});
var lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.BufferAttribute(lPos,3));lg.setAttribute('color',new THREE.BufferAttribute(lCol,3));
group.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})));
scene.add(cam);var EM=150,eg=new THREE.BufferGeometry(),ep=new Float32Array(EM*3),es=new Float32Array(EM);
for(var q=0;q<EM;q++){ep[q*3]=(Math.random()-.5)*22;ep[q*3+1]=(Math.random()-.5)*13;ep[q*3+2]=-3-Math.random()*16;es[q]=.3+Math.random()*.9}
eg.setAttribute('position',new THREE.BufferAttribute(ep,3));
cam.add(new THREE.Points(eg,new THREE.PointsMaterial({size:.17,color:0xff8a1f,map:circleTex(),transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending})));

var base=new THREE.Color(0x5a3416),cyan=new THREE.Color(0xff8a1f),amber=new THREE.Color(0xffd27a),tmp=new THREE.Color(),act=new Float32Array(N);
var mouse={x:0,y:0,on:false},passes=0,clickT=-99,nEl=document.getElementById('n'),scrollP=0;
addEventListener('pointermove',function(e){mouse.x=e.clientX/innerWidth*2-1;mouse.y=-(e.clientY/innerHeight*2-1);mouse.on=true});
addEventListener('pointerdown',function(e){if(e.target.closest('a,button,.card,.photo,.stage,.proj,.chat,.fab,header,.lb,.cc,.crh'))return;clickT=clock.getElapsedTime();passes++;if(nEl)nEl.textContent=passes});
function onScroll(){var h=document.documentElement.scrollHeight-innerHeight;scrollP=h>0?scrollY/h:0}
addEventListener('scroll',onScroll,{passive:true});onScroll();

var clock=new THREE.Clock(),v=new THREE.Vector3(),camZ=8,spin=0;
function frame(){
 var t=clock.getElapsedTime(),sp=reduce?.3:1;
 var cyc=counts.length+3,front=((t*1.4*sp)%cyc)-1,cf=(t-clickT)*5;
 var tz=8-scrollP*(GAP*(counts.length-1)+6);camZ+=(tz-camZ)*.06;cam.position.set(mouse.x*.9,mouse.y*.6,camZ);
 cam.lookAt(mouse.x*.6,mouse.y*.4,camZ-10);
 spin+=(mouse.x*.35-spin)*.05;group.rotation.y=spin+Math.sin(t*.15*sp)*.08;
 for(var i=0;i<N;i++){var l=layerOf[i],a=Math.exp(-Math.pow(l-front,2)*1.4)*.8,b=cf>=0&&cf<cyc?Math.exp(-Math.pow(l-cf,2)*1.2):0;
  v.copy(nodes[i]);group.localToWorld(v);v.project(cam);
  var m=mouse.on&&v.z<1?Math.exp(-((v.x-mouse.x)*(v.x-mouse.x)*innerWidth/innerHeight+(v.y-mouse.y)*(v.y-mouse.y))*28):0;
  act[i]=Math.min(1,a+m+b);
  tmp.copy(base).lerp(cyan,Math.min(1,a+m)).lerp(amber,Math.min(1,b));
  var k=.35+act[i]*.9;pCol[i*3]=tmp.r*k;pCol[i*3+1]=tmp.g*k;pCol[i*3+2]=tmp.b*k}
 for(var j=0;j<E;j++){var e=edges[j],s=(act[e[0]]+act[e[1]])/2,c2=tmp.copy(base).lerp(cyan,s).lerp(amber,Math.max(0,s-.8)*2),kk=.25+s*1.1;
  for(var q=0;q<2;q++){lCol[j*6+q*3]=c2.r*kk;lCol[j*6+q*3+1]=c2.g*kk;lCol[j*6+q*3+2]=c2.b*kk}}
 pg.attributes.color.needsUpdate=true;lg.attributes.color.needsUpdate=true;
 for(var q=0;q<EM;q++){ep[q*3+1]+=es[q]*.012*sp;ep[q*3]+=Math.sin(t*.8+q)*.003;if(ep[q*3+1]>6.6)ep[q*3+1]=-6.6}eg.attributes.position.needsUpdate=true;
 renderer.render(scene,cam);requestAnimationFrame(frame)}
frame();
})();

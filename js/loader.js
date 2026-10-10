/* Page loader, split-letter heading and intro timing */
(function(){var ld=document.getElementById('ld'),b=document.body,red=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('h1').forEach(function(h){var i=0;h.setAttribute('aria-label',h.textContent);
 (function sp(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType==3){var f=document.createDocumentFragment();c.textContent.split('').forEach(function(ch){var s=document.createElement('span');s.className='ch';s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i++);s.textContent=ch;f.appendChild(s)});c.replaceWith(f)}else if(c.nodeType==1)sp(c)})})(h)});
function done(){if(done.d)return;done.d=1;ld.classList.add('out');setTimeout(function(){b.classList.add('go');b.style.overflow=''},380);setTimeout(function(){ld.remove()},1300)}
if(red){done();return}
b.style.overflow='hidden';var t0=performance.now(),lp=document.getElementById('lp'),lb=document.getElementById('lb');
(function s(t){var p=Math.min(1,(t-t0)/1500);lp.textContent=Math.round(p*100)+'%';lb.style.width=p*100+'%';if(p<1)requestAnimationFrame(s);else setTimeout(done,250)})(t0);
setTimeout(done,4500);
})();

(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
d.addEventListener('DOMContentLoaded',function(){
 /* nav */
 var b=$('.menu-btn'),n=$('#nav');
 if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
 var h=$('.site-header');function sc(){h&&h.classList.toggle('scrolled',window.scrollY>20)}sc();window.addEventListener('scroll',sc,{passive:true});
 /* reveal */
 var els=$$('.reveal');
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
 /* tabs */
 $$('.tabs').forEach(function(t){$$('button',t).forEach(function(bt){bt.addEventListener('click',function(){var box=t.parentNode;$$('button',t).forEach(function(x){x.setAttribute('aria-selected',x===bt)});$$('.panel',box).forEach(function(p){p.classList.toggle('on',p.getAttribute('data-panel')===bt.getAttribute('data-tab'))})})})});
 /* hero parallax */
 var hero=$('.hero');if(hero&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){hero.addEventListener('mousemove',function(e){var x=(e.clientX/window.innerWidth-.5),y=(e.clientY/window.innerHeight-.5);$$('.orb',hero).forEach(function(o,i){o.style.translate=(x*(30+i*20))+'px '+(y*(30+i*20))+'px'});$$('.chip',hero).forEach(function(c,i){c.style.translate=(x*-(14+i*6))+'px '+(y*-(14+i*6))+'px'})})}
 /* checklists */
 var groups={};$$('[data-ck]').forEach(function(c){var k=c.getAttribute('data-ck'),g=k.split('-')[0];(groups[g]=groups[g]||[]).push(c);if(ls('tkb-'+k)==='1'){c.checked=true}c.addEventListener('change',function(){ls('tkb-'+k,c.checked?'1':'0');upd(g)})});
 function upd(g){var a=groups[g],n=a.filter(function(c){return c.checked}).length;a.forEach(function(c){c.closest('li').classList.toggle('done',c.checked)});var p=$('[data-prog="'+g+'"]');if(p)p.style.width=(n/a.length*100)+'%'}
 Object.keys(groups).forEach(upd);
 /* calculator */
 var cp=$('#k-people');if(cp){var ids=['people','streams','calls','games'];function calc(){var v={};ids.forEach(function(i){v[i]=+$('#k-'+i).value;$('#o-'+i).textContent=v[i]});var m=10+v.people*10+v.streams*25+v.calls*10+v.games*15+($('#k-uploads').checked?60:0);var tiers=[100,200,300,500,750,1000,2000];var s=tiers.filter(function(t){return t>=m})[0]||2000;$('#calc-out').textContent=(s>=1000?(s/1000)+' Gbps':s+' Mbps');$('#calc-bar').style.width=Math.min(100,s/20)+'%';$('#calc-note').textContent=s<=200?'Comfortable for light to typical use.':s<=500?'Good for busy households.':'Heavy use. Also consider upload speed and a wired backbone.'}ids.forEach(function(i){$('#k-'+i).addEventListener('input',calc)});$('#k-uploads').addEventListener('change',calc);calc()}
 /* legal toc highlight */
 var tl=$$('.toc a[href^="#"]');if(tl.length&&'IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){tl.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-20% 0px -70% 0px'});$$('.lsec').forEach(function(s){so.observe(s)})}
 /* cookie consent */
 var ck=$('#cookie');if(ck){var st=ls('tkb-consent');function save(a,b){ls('tkb-consent',JSON.stringify({analytics:a,advertising:b,t:Date.now()}));ck.hidden=true;window.tkbConsent={analytics:a,advertising:b};if(window.gtag){var g=b?'granted':'denied',n=a?'granted':'denied';gtag('consent','update',{ad_storage:g,ad_user_data:g,ad_personalization:g,analytics_storage:n})}}
  if(!st)ck.hidden=false;else{try{window.tkbConsent=JSON.parse(st)}catch(e){ck.hidden=false}}
  var gpc=navigator.globalPrivacyControl;
  $$('[data-c]',ck).forEach(function(bt){bt.addEventListener('click',function(){var c=bt.getAttribute('data-c');if(c==='all')save(true,!gpc);else if(c==='none')save(false,false);else{var o=$('#cookie-opts');if(o.hidden){o.hidden=false;bt.textContent='Save choices';bt.setAttribute('data-c','save')}}if(c==='save')save($('#c-an').checked,$('#c-ad').checked&&!gpc)})});
  $$('[data-cookie-settings]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();ck.hidden=false;$('#cookie-opts').hidden=false;var mb=$('[data-c=manage]',ck);if(mb){mb.textContent='Save choices';mb.setAttribute('data-c','save')}})})}
});
})();

(function(){
 var SKIP=['/contact/','/privacy/','/terms/','/refund-policy/','/cookie-policy/','/advertising-policy/','/disclosures/'];
 var DELAY=18000;
 function get(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
 function set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}
 if(SKIP.indexOf(location.pathname)>-1||get('tkb-pop'))return;
 document.addEventListener('DOMContentLoaded',function(){
  var pop=document.getElementById('popup');if(!pop)return;
  var card=pop.querySelector('.pop-card'),x=pop.querySelector('.pop-x'),prev=null;
  function busy(){var ck=document.getElementById('cookie'),nav=document.getElementById('nav');return document.hidden||(ck&&!ck.hidden)||(nav&&nav.classList.contains('open'))}
  function close(){set('tkb-pop','1');pop.classList.remove('show');document.body.classList.remove('pop-open');setTimeout(function(){pop.hidden=true},350);document.removeEventListener('keydown',key);if(prev&&prev.focus)prev.focus()}
  function key(e){if(e.key==='Escape'){close();return}if(e.key!=='Tab')return;var f=[].slice.call(card.querySelectorAll('a[href],button')).filter(function(n){return n.offsetParent!==null});if(!f.length)return;var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
  function open(){if(get('tkb-pop'))return;if(busy()){setTimeout(open,2000);return}prev=document.activeElement;pop.hidden=false;document.body.classList.add('pop-open');requestAnimationFrame(function(){requestAnimationFrame(function(){pop.classList.add('show')})});x.focus();document.addEventListener('keydown',key)}
  x.addEventListener('click',close);
  pop.addEventListener('click',function(e){if(e.target===pop)close()});
  pop.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set('tkb-pop','1')})});
  setTimeout(open,DELAY);
 });
})();

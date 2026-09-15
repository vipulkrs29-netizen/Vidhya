const PASSCODE = 'penguin';
const lockScreen = document.getElementById('lockScreen');
const site = document.getElementById('site');
const form = document.getElementById('passForm');
const input = document.getElementById('passcode');
const error = document.getElementById('error');

form.addEventListener('submit', e => {
  e.preventDefault();
  if(input.value.trim().toLowerCase() === PASSCODE.toLowerCase()){
    lockScreen.style.transition='opacity .9s ease, transform .9s ease';
    lockScreen.style.opacity='0'; lockScreen.style.transform='scale(1.02)';
    setTimeout(()=>{lockScreen.classList.add('hidden');site.classList.remove('hidden');startHearts();startReveal();},850);
  }else{
    error.textContent='That’s not our little secret ♡';
    input.value=''; input.focus();
  }
});

function startHearts(){
  const layer=document.querySelector('.heart-layer');
  setInterval(()=>{
    const h=document.createElement('span'); h.className='float-heart'; h.textContent=Math.random()>.18?'♡':'♥';
    h.style.left=(Math.random()*100)+'vw'; h.style.fontSize=(10+Math.random()*15)+'px';
    h.style.animationDuration=(8+Math.random()*8)+'s'; layer.appendChild(h);
    setTimeout(()=>h.remove(),17000);
  },900);
}
function startReveal(){
 const items=document.querySelectorAll('.story-copy,.section-photo,.memory-intro,.memory-grid figure,.ending-inner');
 const ob=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');ob.unobserve(en.target)}}),{threshold:.12});
 items.forEach(el=>{el.classList.add('reveal');ob.observe(el)});
}


// Gentle photo movement while scrolling — kept intentionally subtle.
window.addEventListener('scroll', () => {
  document.querySelectorAll('.section-photo').forEach(photo => {
    const r = photo.getBoundingClientRect();
    const center = window.innerHeight / 2;
    const offset = Math.max(-12, Math.min(12, (center - (r.top + r.height/2)) * 0.018));
    photo.style.transform = `translateY(${offset}px)`;
  });
}, {passive:true});

// === Utility functions ===
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const skins = [
  'https://stageandcinema.com/wp-content/uploads/2024/05/Karambit-Doppler-Lore.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTafQcrz8-algElcwrjwFxK7kJgo-DswfHiXA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNGcqN4s1J1_rMzzqZIikD7wxI0vUjEhW2w&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEqGvrwVPxUG8ywJhj0ndr7EEmifGOJLWng&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR91KDb9Z12-r3RESYCbV3NLJO1HHssUImt0WjeT9DWoeARcZh3IzbfXAWSOw1R-oC4RLY&usqp=CAU',
  
];

// === Navigation ===
$$('.nav-links a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const target = e.target.dataset.target;
    if(target) showPage(target);
  });
});

function showPage(id){
  $$('.page').forEach(p=>p.classList.add('hidden'));
  $('#'+id).classList.remove('hidden');
}

// === Auth ===
const loginForm = $('#loginForm');
const usernameInput = $('#usernameInput');
const profileName = $('#profileName');
const loginNav = $('#loginNav');
const logoutNav = $('#logoutNav');
const logoutBtn = $('#logoutBtn');

function setLoggedIn(user){
  if(user){
    localStorage.setItem('bd_username', user);
    profileName.textContent = user;
    loginNav.classList.add('hidden');
    logoutNav.classList.remove('hidden');
    showPage('rouletteSection');
  }else{
    localStorage.removeItem('bd_username');
    profileName.textContent = '';
    loginNav.classList.remove('hidden');
    logoutNav.classList.add('hidden');
    showPage('loginSection');
  }
}

loginForm.addEventListener('submit', e=>{
  e.preventDefault();
  const user = usernameInput.value.trim();
  if(user) setLoggedIn(user);
});

logoutBtn.addEventListener('click', ()=>setLoggedIn(null));

// === Roulette ===
const wheel = $('#wheel');
const spinBtn = $('#spinBtn');
const resultBox = $('#result');

spinBtn.addEventListener('click', ()=>{
  buildWheel();
  const spins = 720 + Math.random()*360;
  wheel.style.transition = 'transform 3s cubic-bezier(.33,.81,.54,1.02)';
  wheel.style.transform = `rotate(${spins}deg)`;
  // Determine winner (simple shuffle)
  const shuffled = [...skins].sort(()=>0.5-Math.random());
  const winner = shuffled[0];
  setTimeout(()=>{
    wheel.style.transition = '';
    wheel.style.transform = '';
    resultBox.innerHTML = `<img src="${winner}" alt="Winner">`;
    saveWin(winner);
  },3000);
});

function buildWheel(){
  wheel.innerHTML = '';
  const slice = 360 / skins.length;
  skins.forEach((src,i)=>{
    const seg = document.createElement('div');
    seg.className = 'segment';
    seg.style.background = `url(${src}) center/cover`;
    seg.style.transform = `rotate(${slice*i}deg)`;
    wheel.appendChild(seg);
  });
}

// === Profile ===
const wonSkinsBox = $('#wonSkins');
function saveWin(url){
  const wins = JSON.parse(localStorage.getItem('bd_wins')||'[]');
  wins.push(url);
  localStorage.setItem('bd_wins', JSON.stringify(wins));
  renderWins();
}
function renderWins(){
  const wins = JSON.parse(localStorage.getItem('bd_wins')||'[]');
  wonSkinsBox.innerHTML = wins.map(u=>`<img src="${u}" style="max-width:120px;border:2px solid #58a6ff;border-radius:8px;margin:4px;">`).join('');
}

// === Chat ===
const chatForm = $('#chatForm');
const chatInput = $('#chatInput');
const chatLog = $('#chatLog');

chatForm.addEventListener('submit', e=>{
  e.preventDefault();
  const msg = chatInput.value.trim();
  if(!msg) return;
  const user = localStorage.getItem('bd_username')||'Guest';
  const entry = {user, msg, ts: Date.now()};
  const log = JSON.parse(localStorage.getItem('bd_chat')||'[]');
  log.push(entry);
  localStorage.setItem('bd_chat', JSON.stringify(log));
  chatInput.value = '';
  renderChat();
});

function renderChat(){
  const log = JSON.parse(localStorage.getItem('bd_chat')||'[]');
  chatLog.innerHTML = log.slice(-100).map(l=>`<div class="chatMsg"><strong>${l.user}:</strong> ${l.msg}</div>`).join('');
  chatLog.scrollTop = chatLog.scrollHeight;
}

// === Init ===
document.addEventListener('DOMContentLoaded', ()=>{
  const savedUser = localStorage.getItem('bd_username');
  if(savedUser) setLoggedIn(savedUser); else setLoggedIn(null);
  renderChat();
  renderWins();
});

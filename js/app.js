/* ============================================================
   STAT SOCIETY — app.js
   ============================================================ */

// ─── STATE ───────────────────────────────────────────────────
const State = {
  allConfessions: [], filteredConfessions: [],
  currentFilter: 'all', page: 0,
  perPage: CONFIG.CONFESSIONS_PER_PAGE,
};

// ─── FALLBACK CONFESSIONS ────────────────────────────────────
const FALLBACK_CONFESSIONS = [
  { role:'RN', years:'7 yrs', category:'rn', mood:'burnout', text:'Sat in the parking lot 20 minutes before my shift. Scrubs on. Badge clipped. Couldn\'t go in yet.', likes:'4521', comments:'342', time:'2h ago', verified:'true', reddit_url:'' },
  { role:'RN', years:'12 yrs', category:'rn', mood:'angry', text:'They spent $80k on a wellness initiative instead of fixing the staffing ratio that\'s been killing us for 2 years.', likes:'8934', comments:'567', time:'4h ago', verified:'true', reddit_url:'' },
  { role:'Scrub Tech', years:'5 yrs', category:'tech', mood:'dark', text:'Handed the wrong instrument. Surgeon didn\'t say anything. That was somehow worse.', likes:'2847', comments:'156', time:'6h ago', verified:'true', reddit_url:'' },
  { role:'Paramedic', years:'3 yrs', category:'burnout', mood:'dark', text:'Patient asked if I was having a good day. Said "I\'ve had worse." They coded 10 minutes later. I was right.', likes:'1234', comments:'89', time:'8h ago', verified:'false', reddit_url:'' },
  { role:'Physician', years:'15 yrs', category:'md', mood:'burnout', text:'Told my attending I was going to the bathroom. Sat in the stall and cried for 4 minutes. Then went back.', likes:'6789', comments:'423', time:'12h ago', verified:'true', reddit_url:'' },
  { role:'RT', years:'8 yrs', category:'admin', mood:'frustrated', text:'New protocol: document "patient breathing status" every 15 minutes. On ventilated patients. In the ICU.', likes:'2156', comments:'178', time:'1d ago', verified:'true', reddit_url:'' },
];

// ─── FALLBACK ARTICLES ───────────────────────────────────────
const FALLBACK_ARTICLES = [
  { title:'Workplace Violence In Healthcare Is Not Accepted', category:'Opinion', author:'Stat Society', date:'April 2026', summary:'Healthcare workers face violence at work every single day. Admin calls it a known risk. We call it a failure of leadership.', body:'<p>Every shift, somewhere in a hospital, a nurse gets punched. A paramedic gets threatened. A tech gets shoved. And somewhere in a boardroom, an administrator calls it a "known occupational hazard."</p><p>It is not a hazard. It is a failure. A failure of staffing, a failure of policy, and a failure of leadership to protect the people doing the hardest work in the building.</p><h2>The Numbers Don\'t Lie</h2><p>Healthcare workers are five times more likely to experience workplace violence than workers in any other industry. Five times. And the response from most health systems? De-escalation training. As if the problem is that nurses aren\'t being polite enough when someone throws a bedpan at their head.</p><p>The real answer isn\'t training the victims. It\'s consequences for the perpetrators, adequate staffing ratios so workers aren\'t stretched too thin to see danger coming, and leadership that actually shows up on the floor instead of in press releases.</p><h2>What Needs To Change</h2><p>Zero tolerance has to mean zero tolerance — not zero tolerance with seventeen exceptions for "confused patients" and "high-acuity situations." Violence is violence. And the people who show up every day to save lives deserve to go home in the same condition they arrived.</p><p>Until that changes, we\'ll keep talking about it. Loudly. Unfiltered. Because silence is how this keeps happening.</p>', reddit_url:'', published:'true' },
  { title:'The $80K Wellness Initiative That Changed Nothing', category:'Admin Fails', author:'Anonymous MD', date:'March 2026', summary:'They bought standing desks and meditation apps. Meanwhile we\'re running 1:8 ratios on a surgical floor.', body:'<p>Last quarter, our health system announced a $80,000 investment in "staff wellness." There were press releases. There was a ribbon cutting. There were standing desks in the break room and a subscription to a meditation app that exactly zero people have used.</p><p>Meanwhile, the surgical floor has been running 1:8 nurse-to-patient ratios for six months. Incident reports pile up. Staff turnover is at an all-time high. And the people who still show up are doing it on fumes and spite.</p><h2>What Wellness Actually Looks Like</h2><p>Wellness is not a standing desk. Wellness is not a meditation app or a "resilience workshop" or a fruit basket in the lounge. Wellness is being able to take a lunch break. Wellness is not crying in your car before a shift. Wellness is having enough staff on the floor that you can give your patients the care they actually need.</p><p>The math is simple: that $80,000 could have funded two additional nursing positions for a year. Two more humans in scrubs. Two more people to split the load. That would have been wellness.</p><h2>The Real Message</h2><p>When a health system spends $80,000 on optics instead of operations, the message to staff is clear: we see your burnout as a PR problem, not a staffing problem. We would rather manage your perception of your conditions than change your conditions.</p><p>We see you. And we\'re not letting it go quietly.</p>', reddit_url:'', published:'true' },
  { title:'13 Hours On Your Feet And They Want A Survey About Your Experience', category:'Dark Humor', author:'Anonymous RN', date:'March 2026', summary:'Patient satisfaction scores. Because what matters most after a code blue is whether the room was quiet enough.', body:'<p>You just ran a code for forty minutes. You have charting from six hours ago you still haven\'t touched. You haven\'t eaten since 6am. And now, at the end of your thirteenth hour on your feet, the hospital wants you to know that patient satisfaction scores dropped 2% this quarter and could you please make sure you\'re knocking before entering rooms.</p><p>Sure. Absolutely. Right after I finish being a human being.</p><h2>The Survey Industrial Complex</h2><p>There is an entire industry built around making sure patients rate their hospital stay like a hotel experience. Press Ganey. HCAHPS. Scores that affect reimbursement, which affect budgets, which affect staffing, which affects how much time a nurse actually has to knock on a door before entering.</p><p>It is a perfect closed loop of administrative absurdity.</p><h2>What Patients Actually Need</h2><p>Patients do not need a nurse who knocks. They need a nurse who is present — who has enough time and enough bandwidth to actually be there for them. They need a nurse who hasn\'t been awake since 5am and isn\'t managing fourteen other things simultaneously.</p><p>Give nurses the conditions to provide good care. The experience scores will follow. You cannot survey your way to a functional healthcare system. You can only staff your way there.</p>', reddit_url:'', published:'true' },
];

// ─── FALLBACK EPISODES ───────────────────────────────────────
const FALLBACK_EPISODES = [
  { number:'01', title:'The Unfiltered Digital Sanctuary', description:'Why we built Stat Society and what "no corporate warmth" really means.', duration:'24:18', spotify_url:'', apple_url:'', spotify_embed_id:'', status:'live' },
  { number:'02', title:'Admin vs. Reality', description:'The $80k wellness initiative that could\'ve hired 3 nurses.', duration:'', spotify_url:'', apple_url:'', spotify_embed_id:'', status:'coming' },
];

const MOOD_AVATARS = ['🩺','💉','🔬','🫀','🧬','🏥','🧪','💊','🩻','🫁'];
const MOOD_CLASSES = {
  dark:{ bg:'m-dark', bar:'bar-dark' },
  burnout:{ bg:'m-burnout', bar:'bar-burnout' },
  angry:{ bg:'m-angry', bar:'bar-angry' },
  exhausted:{ bg:'m-exhausted', bar:'bar-exhausted' },
  frustrated:{ bg:'m-frustrated', bar:'bar-frustrated' },
};

// ─── CONFESSIONS ─────────────────────────────────────────────
async function loadConfessions() {
  showLoadingState('confessions-loading', true);
  const data = await Sheets.fetchCSV(CONFIG.CONFESSIONS_SHEET_URL);
  State.allConfessions = (data && data.length > 0) ? data : FALLBACK_CONFESSIONS;
  applyFilter(State.currentFilter);
  showLoadingState('confessions-loading', false);
  const el = document.getElementById('confession-hero-count');
  if (el && State.allConfessions.length > 6) el.textContent = State.allConfessions.length.toLocaleString();
}

function applyFilter(filter) {
  State.currentFilter = filter; State.page = 0;
  State.filteredConfessions = filter === 'all'
    ? [...State.allConfessions]
    : State.allConfessions.filter(c => (c.category||'').toLowerCase()===filter || (c.mood||'').toLowerCase()===filter);
  renderConfessions(true);
}

function renderConfessions(reset=false) {
  const grid = document.getElementById('confessions-grid');
  const loadBtn = document.getElementById('load-more');
  if (reset) grid.innerHTML = '';
  const start = State.page * State.perPage;
  const slice = State.filteredConfessions.slice(start, start + State.perPage);
  slice.forEach((c,i) => grid.appendChild(buildConfessionCard(c, start+i)));
  State.page++;
  loadBtn.style.display = State.page * State.perPage < State.filteredConfessions.length ? 'block' : 'none';
}

function buildConfessionCard(c, index) {
  const mood    = (c.mood||'dark').toLowerCase();
  const cls     = MOOD_CLASSES[mood] || MOOD_CLASSES.dark;
  const avatar  = MOOD_AVATARS[index % MOOD_AVATARS.length];
  const likes   = parseInt(c.likes||0).toLocaleString();
  const verified = (c.verified||'').toLowerCase()==='true';
  const redditUrl = c.reddit_url || '';
  const div = document.createElement('div');
  div.className = `ccard ${cls.bg}`;
  div.style.animationDelay = `${(index%6)*0.05}s`;
  div.innerHTML = `
    <div class="ccard-bar ${cls.bar}"></div>
    <div class="ccard-top">
      <div class="ccard-av">${avatar}</div>
      <div style="flex:1">
        <div class="ccard-role">${esc(c.role||'Healthcare Worker')}</div>
        <div class="ccard-time">${c.years?esc(c.years)+' · ':''}${esc(String(c.time||'Recently'))}</div>
      </div>
      ${verified ? '<div class="ccard-v">✓</div>' : ''}
    </div>
    <div class="ccard-txt">"${esc(c.text||c.confession||'')}"</div>
    <div class="ccard-foot">
      <button class="cact" onclick="handleLike(this)">♡ ${likes}</button>
      <button class="cact">💬 ${esc(String(c.comments||0))}</button>
      ${redditUrl
        ? `<a class="cact reddit" href="${esc(redditUrl)}" target="_blank" title="Discuss on Reddit">↗ Reddit</a>`
        : `<a class="cact reddit" href="${CONFIG.REDDIT_BASE_URL}/submit?title=${encodeURIComponent('"'+(c.text||'').substring(0,80)+'..." — '+esc(c.role||'Healthcare Worker'))}" target="_blank" title="Discuss on Reddit">↗ Reddit</a>`
      }
      <span class="cmood">${esc(mood)}</span>
    </div>`;
  return div;
}

function filterConfessions(btn, filter) {
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  applyFilter(filter);
}

function loadMore() { renderConfessions(false); }
setInterval(loadConfessions, CONFIG.CONFESSIONS_REFRESH_MS);

// ─── ARTICLES ─────────────────────────────────────────────────
async function loadArticles() {
  showLoadingState('articles-loading', true);
  const data = await Sheets.fetchCSV(CONFIG.ARTICLES_SHEET_URL);
  const articles = (data && data.length > 0)
    ? data.filter(a => (a.published||'').toLowerCase()==='true')
    : FALLBACK_ARTICLES;
  showLoadingState('articles-loading', false);
  renderArticles(articles);
}

function renderArticles(articles) {
  const grid = document.getElementById('articles-grid');
  grid.innerHTML = '';
  articles.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'article-card';
    div.style.animationDelay = `${i*0.08}s`;
    div.innerHTML = `
      <div class="article-tag"><div class="article-tag-dot"></div>${esc(a.category||'Editorial')}</div>
      <div class="article-title">${esc(a.title||'')}</div>
      <div class="article-summary">${esc(a.summary||'')}</div>
      <div class="article-meta">
        <span class="article-author">${esc(a.author||'Stat Society')} · ${esc(a.date||'')}</span>
        <button class="article-read-btn" onclick="openArticle(${i})">Read →</button>
      </div>`;
    grid.appendChild(div);
  });
  window._articles = articles;
}

function openArticle(index) {
  const a = window._articles[index];
  if (!a) return;
  document.getElementById('modal-tag').textContent = a.category || 'Editorial';
  document.getElementById('modal-title').textContent = a.title || '';
  document.getElementById('modal-meta').textContent = `${a.author||'Stat Society'} · ${a.date||''}`;
  document.getElementById('modal-body').innerHTML = a.body || '';
  document.getElementById('article-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeArticleModal(e) {
  if (e && e.target !== document.getElementById('article-modal') && e.type==='click') return;
  document.getElementById('article-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── PODCAST ──────────────────────────────────────────────────
async function loadEpisodes() {
  const data = await Sheets.fetchCSV(CONFIG.EPISODES_SHEET_URL);
  const episodes = (data && data.length > 0) ? data : FALLBACK_EPISODES;
  renderEpisodes(episodes);

  // update platform links
  if (CONFIG.SPOTIFY_SHOW_URL && !CONFIG.SPOTIFY_SHOW_URL.includes('YOUR_')) {
    document.getElementById('spotify-link').href = CONFIG.SPOTIFY_SHOW_URL;
  }
  if (CONFIG.APPLE_PODCASTS_URL && !CONFIG.APPLE_PODCASTS_URL.includes('YOUR_')) {
    document.getElementById('apple-link').href = CONFIG.APPLE_PODCASTS_URL;
  }
}

function renderEpisodes(episodes) {
  const list = document.getElementById('episodes-list');
  list.innerHTML = '';
  const live = episodes.find(e => (e.status||'').toLowerCase()==='live');
  if (live) {
    document.getElementById('pod-featured-title').textContent = live.title || '';
    document.getElementById('pod-featured-host').textContent = `EP. ${live.number||'01'} · ${live.duration||''}`;
    if (live.spotify_embed_id && live.spotify_embed_id !== '') {
      document.getElementById('spotify-embed').src =
        `https://open.spotify.com/embed/episode/${live.spotify_embed_id}?utm_source=generator&theme=0`;
    }
  }
  episodes.forEach(ep => {
    const isLive = (ep.status||'').toLowerCase()==='live';
    const isComing = (ep.status||'').toLowerCase()==='coming';
    const row = document.createElement(isLive&&ep.spotify_url ? 'a' : 'div');
    row.className = `ep-row${isComing?' locked':''}`;
    if (isLive && ep.spotify_url) { row.href = ep.spotify_url; row.target = '_blank'; }
    row.innerHTML = `
      <div class="ep-ic${isLive?' live':''}">
        ${isLive ? '▶' : isComing ? '🔒' : '▶'}
      </div>
      <div class="ep-info">
        <div class="ep-n">EP. ${esc(ep.number||'')}: ${esc(ep.title||'')}</div>
        <div class="ep-d">${esc(ep.description||'')}${isComing?' (Coming Soon)':''}</div>
      </div>
      <div class="ep-dur">${esc(ep.duration||'--:--')}</div>`;
    list.appendChild(row);
  });
}

let playerVisible = false;
function togglePlayer() {
  const embed = document.getElementById('pod-embed');
  playerVisible = !playerVisible;
  embed.style.display = playerVisible ? 'block' : 'none';
}

// ─── MODALS ───────────────────────────────────────────────────
function openConfessionModal() {
  document.getElementById('confession-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeConfessionModal(e) {
  if (e && e.target !== document.getElementById('confession-modal') && e.type==='click') return;
  document.getElementById('confession-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function selectCat(btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

async function handleConfessionSubmit(e) {
  e.preventDefault();
  const role = document.getElementById('confession-role').value;
  const text = document.getElementById('confession-text').value.trim();
  const category = document.querySelector('.cat-btn.selected')?.textContent || 'Other';
  if (!text) return;
  const btn = e.target.querySelector('.modal-submit');
  btn.textContent = 'Submitting...'; btn.disabled = true;
  const result = await Sheets.submitConfession({ role, text, category, timestamp: new Date().toISOString() });
  btn.textContent = 'Drop It Into The Void →'; btn.disabled = false;
  closeConfessionModal();
  e.target.reset();
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
  showToast(result.ok ? 'Confession submitted. Welcome to the void. 🎭' : 'Something went wrong. Try again.');
  if (result.ok) setTimeout(loadConfessions, 2000);
}

// ─── NEWSLETTER ───────────────────────────────────────────────
async function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('.nl-inp').value.trim();
  if (!email) return;
  const btn = e.target.querySelector('.nl-btn');
  btn.textContent = 'Subscribing...'; btn.disabled = true;
  const result = await Sheets.submitNewsletter(email);
  btn.textContent = "Subscribe — It's Free"; btn.disabled = false;
  e.target.reset();
  showToast(result.ok ? 'Welcome to the resistance. Check your inbox. 📧' : 'Something went wrong. Try again.');
}

// ─── INTERACTIONS ─────────────────────────────────────────────
function handleLike(btn) {
  const parts = btn.textContent.split(' ');
  const count = parseInt((parts[1]||'0').replace(/,/g,'')) + 1;
  btn.textContent = `♡ ${count.toLocaleString()}`;
  btn.style.color = 'var(--or)';
  showToast('Solidarity 👊');
}

// ─── LIVE COUNT ───────────────────────────────────────────────
(function() {
  const el = document.getElementById('online-num');
  if (!el) return;
  let count = CONFIG.ONLINE_COUNT_BASE;
  setInterval(() => {
    count = Math.max(800, count + Math.floor(Math.random()*10)-5);
    el.textContent = count.toLocaleString();
  }, 5000);
})();

// ─── TOAST ────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── UTILS ────────────────────────────────────────────────────
function showLoadingState(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? 'block' : 'none';
}

function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadConfessions();
  loadArticles();
  loadEpisodes();
});

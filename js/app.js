/* ============================================================
   STAT SOCIETY — app.js
   Main application logic
   ============================================================ */

// ─── STATE ───────────────────────────────────────────────────
const State = {
  allConfessions: [],
  filteredConfessions: [],
  currentFilter: 'all',
  page: 0,
  perPage: CONFIG.CONFESSIONS_PER_PAGE,
  loading: false,
};

// ─── FALLBACK DATA (shown if Sheets not connected yet) ───────
const FALLBACK_CONFESSIONS = [
  {
    role: 'Scrub Tech', years: '5 yrs', category: 'tech', mood: 'dark',
    text: 'Handed the wrong instrument. Surgeon didn\'t say anything. That was somehow worse.',
    likes: '2847', comments: '156', time: '2h ago', verified: 'true'
  },
  {
    role: 'RN', years: '7 yrs', category: 'rn', mood: 'exhausted',
    text: 'Sat in the parking lot 20 minutes before my shift. Scrubs on. Badge clipped. Couldn\'t go in yet.',
    likes: '4521', comments: '342', time: '4h ago', verified: 'true'
  },
  {
    role: 'RN', years: '12 yrs', category: 'rn', mood: 'angry',
    text: 'They spent $80k on a wellness initiative instead of fixing the staffing ratio that\'s been killing us for 2 years.',
    likes: '8934', comments: '567', time: '6h ago', verified: 'true'
  },
  {
    role: 'Paramedic', years: '3 yrs', category: 'burnout', mood: 'dark',
    text: 'Patient asked if I was having a good day. Said "I\'ve had worse." They coded 10 minutes later. I was right.',
    likes: '1234', comments: '89', time: '8h ago', verified: 'false'
  },
  {
    role: 'Physician', years: '15 yrs', category: 'md', mood: 'burnout',
    text: 'Told my attending I was going to the bathroom. Sat in the stall and cried for 4 minutes. Then went back.',
    likes: '6789', comments: '423', time: '12h ago', verified: 'true'
  },
  {
    role: 'RT', years: '8 yrs', category: 'admin', mood: 'frustrated',
    text: 'New protocol: document "patient breathing status" every 15 minutes. On ventilated patients. In the ICU.',
    likes: '2156', comments: '178', time: '1d ago', verified: 'true'
  },
];

const MOOD_AVATARS = ['🩺','💉','🔬','🫀','🧬','🏥','🧪','💊','🩻','🫁'];

const MOOD_CLASSES = {
  dark:       { bg: 'm-dark',       bar: 'bar-dark'       },
  burnout:    { bg: 'm-burnout',    bar: 'bar-burnout'    },
  angry:      { bg: 'm-angry',      bar: 'bar-angry'      },
  exhausted:  { bg: 'm-exhausted',  bar: 'bar-exhausted'  },
  frustrated: { bg: 'm-frustrated', bar: 'bar-frustrated' },
};

// ─── CONFESSIONS ─────────────────────────────────────────────
async function loadConfessions() {
  showLoadingState(true);

  const data = await Sheets.fetchCSV(CONFIG.CONFESSIONS_SHEET_URL);

  if (data && data.length > 0) {
    State.allConfessions = data;
  } else {
    // Sheets not connected yet — use fallback
    State.allConfessions = FALLBACK_CONFESSIONS;
  }

  applyFilter(State.currentFilter);
  showLoadingState(false);

  // Update hero count
  const countEl = document.getElementById('confession-hero-count');
  if (countEl && State.allConfessions.length > 6) {
    countEl.textContent = State.allConfessions.length.toLocaleString();
  }
}

function applyFilter(filter) {
  State.currentFilter = filter;
  State.page = 0;

  if (filter === 'all') {
    State.filteredConfessions = [...State.allConfessions];
  } else {
    State.filteredConfessions = State.allConfessions.filter(c =>
      (c.category || '').toLowerCase() === filter ||
      (c.mood || '').toLowerCase() === filter
    );
  }

  renderConfessions(true);
}

function renderConfessions(reset = false) {
  const grid = document.getElementById('confessions-grid');
  const loadBtn = document.getElementById('load-more');

  if (reset) grid.innerHTML = '';

  const start = State.page * State.perPage;
  const end   = start + State.perPage;
  const slice = State.filteredConfessions.slice(start, end);

  slice.forEach((c, i) => {
    const card = buildConfessionCard(c, start + i);
    grid.appendChild(card);
  });

  State.page++;

  // Show/hide load more
  const hasMore = State.page * State.perPage < State.filteredConfessions.length;
  loadBtn.style.display = hasMore ? 'block' : 'none';
}

function buildConfessionCard(c, index) {
  const mood    = (c.mood || 'dark').toLowerCase();
  const classes = MOOD_CLASSES[mood] || MOOD_CLASSES.dark;
  const avatar  = MOOD_AVATARS[index % MOOD_AVATARS.length];
  const likes   = parseInt(c.likes || 0).toLocaleString();
  const comments= c.comments || '0';
  const verified = (c.verified || '').toLowerCase() === 'true';
  const time    = c.time || c.timestamp || 'Recently';
  const years   = c.years || c.experience || '';

  const div = document.createElement('div');
  div.className = `ccard ${classes.bg}`;
  div.style.animationDelay = `${(index % 6) * 0.05}s`;

  div.innerHTML = `
    <div class="ccard-bar ${classes.bar}"></div>
    <div class="ccard-top">
      <div class="ccard-av">${avatar}</div>
      <div style="flex:1">
        <div class="ccard-role">${escHtml(c.role || 'Healthcare Worker')}</div>
        <div class="ccard-time">${years ? escHtml(years) + ' · ' : ''}${escHtml(String(time))}</div>
      </div>
      ${verified ? '<div class="ccard-v">✓</div>' : ''}
    </div>
    <div class="ccard-txt">"${escHtml(c.text || c.confession || '')}"</div>
    <div class="ccard-foot">
      <button class="cact" onclick="handleLike(this, '${escHtml(c.role||'')}')">♡ ${likes}</button>
      <button class="cact">💬 ${escHtml(String(comments))}</button>
      <button class="cact" onclick="handleShare('${escHtml(c.text||'').substring(0,60)}...')">↗</button>
      <span class="cmood">${escHtml(mood)}</span>
    </div>
  `;

  return div;
}

function filterConfessions(btn, filter) {
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  applyFilter(filter);
}

function loadMore() {
  renderConfessions(false);
}

function showLoadingState(show) {
  const loadingEl = document.getElementById('confessions-loading');
  if (loadingEl) loadingEl.style.display = show ? 'block' : 'none';
}

// Auto-refresh confessions
setInterval(() => {
  loadConfessions();
}, CONFIG.CONFESSIONS_REFRESH_MS);

// ─── CONFESSION MODAL ────────────────────────────────────────
function openConfessionModal() {
  document.getElementById('confession-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeConfessionModal(e) {
  if (e && e.target !== document.getElementById('confession-modal') && e.type === 'click') return;
  document.getElementById('confession-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function selectCat(btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

async function handleConfessionSubmit(e) {
  e.preventDefault();

  const role     = document.getElementById('confession-role').value;
  const text     = document.getElementById('confession-text').value.trim();
  const category = document.querySelector('.cat-btn.selected')?.textContent || 'Other';

  if (!text) return;

  const submitBtn = e.target.querySelector('.modal-submit');
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  const result = await Sheets.submitConfession({
    role, text, category,
    timestamp: new Date().toISOString(),
  });

  submitBtn.textContent = 'Drop It Into The Void →';
  submitBtn.disabled = false;

  closeConfessionModal();
  e.target.reset();
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));

  if (result.fallback) {
    showToast('Confession received. Connect Google Sheets to save it. 🩺');
  } else if (result.ok) {
    showToast('Confession submitted. Welcome to the void. 🎭');
    setTimeout(loadConfessions, 2000);
  } else {
    showToast('Something went wrong. Try again.');
  }
}

// ─── NEWSLETTER ───────────────────────────────────────────────
async function handleNewsletterSubmit(e) {
  e.preventDefault();

  const email = e.target.querySelector('.nl-inp').value.trim();
  if (!email) return;

  const btn = e.target.querySelector('.nl-btn');
  btn.textContent = 'Subscribing...';
  btn.disabled = true;

  const result = await Sheets.submitNewsletter(email);

  btn.textContent = 'Subscribe — It\'s Free';
  btn.disabled = false;
  e.target.reset();

  if (result.fallback) {
    showToast('Got it! Connect Google Sheets to save signups. 📧');
  } else if (result.ok) {
    showToast('Welcome to the resistance. Check your inbox. 📧');
  } else {
    showToast('Something went wrong. Try again.');
  }
}

// ─── INTERACTIONS ────────────────────────────────────────────
function handleLike(btn, role) {
  const parts = btn.textContent.split(' ');
  const count = parseInt(parts[1].replace(/,/g, '')) + 1;
  btn.textContent = `♡ ${count.toLocaleString()}`;
  btn.style.color = 'var(--or)';
  showToast('Solidarity 👊');
}

function handleShare(text) {
  if (navigator.share) {
    navigator.share({
      title: 'Stat Society',
      text: `"${text}" — Anonymous Healthcare Worker`,
      url: window.location.href,
    });
  } else {
    navigator.clipboard?.writeText(`"${text}" — via statsocietyhq.com`)
      .then(() => showToast('Copied to clipboard 📋'))
      .catch(() => showToast('Share link copied!'));
  }
}

// ─── LIVE ONLINE COUNT ───────────────────────────────────────
(function liveCount() {
  const el = document.getElementById('online-num');
  if (!el) return;

  let count = CONFIG.ONLINE_COUNT_BASE;

  setInterval(() => {
    count = Math.max(800, count + Math.floor(Math.random() * 10) - 5);
    el.textContent = count.toLocaleString();
  }, 5000);
})();

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scell, .sec-title').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = 'opacity .4s ease, transform .4s ease';
  observer.observe(el);
});

// ─── UTILS ───────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadConfessions();
});

/* ============================================================
   STAT SOCIETY — config.js
   THIS IS THE ONLY FILE YOU EDIT TO UPDATE THE SITE
   ============================================================ */

const CONFIG = {

  // ─── GOOGLE SHEETS ───────────────────────────────────────
  CONFESSIONS_SHEET_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMgNWiF6Llo2dBuHnWb43uX1q_69EmF6pjGfzp5-neYpvQB7UwblBhrt__Gm-hfuh0AuYiDhYg6Aps/pub?gid=0&single=true&output=csv',

  NEWSLETTER_SHEET_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMgNWiF6Llo2dBuHnWb43uX1q_69EmF6pjGfzp5-neYpvQB7UwblBhrt__Gm-hfuh0AuYiDhYg6Aps/pub?gid=1326381572&single=true&output=csv',

  // Articles tab — columns: title, category, author, date, summary, body, reddit_url
  ARTICLES_SHEET_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMgNWiF6Llo2dBuHnWb43uX1q_69EmF6pjGfzp5-neYpvQB7UwblBhrt__Gm-hfuh0AuYiDhYg6Aps/pub?gid=YOUR_ARTICLES_TAB_ID&single=true&output=csv',

  // Episodes tab — columns: number, title, description, duration, spotify_url, apple_url, spotify_embed_id, status
  EPISODES_SHEET_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMgNWiF6Llo2dBuHnWb43uX1q_69EmF6pjGfzp5-neYpvQB7UwblBhrt__Gm-hfuh0AuYiDhYg6Aps/pub?gid=YOUR_EPISODES_TAB_ID&single=true&output=csv',

  SUBMIT_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbx2QKukJBfl8Vo2Eb8RJp0KFVa1wGvv2op6uJj8oVM-ovbDZv-wwEgzYd6MgNKLwKE08w/exec',

  // ─── CONFESSIONS ─────────────────────────────────────────
  CONFESSIONS_PER_PAGE: 6,
  CONFESSIONS_REFRESH_MS: 60000,

  // ─── PODCAST PLATFORM LINKS ──────────────────────────────
  // Paste your Spotify show link here
  SPOTIFY_SHOW_URL: 'YOUR_SPOTIFY_SHOW_URL_HERE',
  // Paste your Apple Podcasts link here
  APPLE_PODCASTS_URL: 'YOUR_APPLE_PODCASTS_URL_HERE',

  // ─── REDDIT ──────────────────────────────────────────────
  REDDIT_COMMUNITY: 'StatSociety',
  REDDIT_BASE_URL: 'https://reddit.com/r/StatSociety',

  // ─── SITE ────────────────────────────────────────────────
  SITE_NAME: 'Stat Society',
  SITE_MOTTO: 'Scrubs On. Filter Off.',
  ONLINE_COUNT_BASE: 1247,

  // ─── SOCIALS ─────────────────────────────────────────────
  SOCIALS: {
    twitter:   'https://twitter.com/Statsociet73928',
    instagram: 'https://instagram.com/statsocietyhq',
    reddit:    'https://reddit.com/r/StatSociety',
    facebook:  'https://facebook.com/profile.php?id=61580589196637',
  },

  SPACES_DAY:  'Sundays',
  SPACES_TIME: '8PM PST / 11PM EST',
  SPACES_URL:  'YOUR_X_SPACES_LINK_HERE',

};

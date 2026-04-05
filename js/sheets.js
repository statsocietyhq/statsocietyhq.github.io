/* ============================================================
   STAT SOCIETY — sheets.js
   Google Sheets read/write layer
   ============================================================ */

const Sheets = {

  // Parse a published Google Sheet CSV into array of objects
  async fetchCSV(url) {
    if (!url || url.includes('YOUR_')) return null;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Sheet fetch failed');
      const text = await res.text();
      return Sheets.parseCSV(text);
    } catch (err) {
      console.warn('[Sheets] Could not fetch:', url, err.message);
      return null;
    }
  },

  parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());

    return lines.slice(1).map(line => {
      // Handle quoted fields with commas inside
      const values = [];
      let inQuote = false;
      let current = '';

      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          inQuote = !inQuote;
        } else if (ch === ',' && !inQuote) {
          values.push(current.trim());
          current = '';
        } else {
          current += ch;
        }
      }
      values.push(current.trim());

      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = (values[i] || '').replace(/^"|"$/g, '').trim();
      });
      return obj;
    }).filter(row => Object.values(row).some(v => v)); // skip empty rows
  },

  // Submit confession via Google Apps Script Web App
  async submitConfession(data) {
    if (!CONFIG.SUBMIT_SCRIPT_URL || CONFIG.SUBMIT_SCRIPT_URL.includes('YOUR_')) {
      console.warn('[Sheets] No submit URL configured. Using fallback.');
      return { ok: true, fallback: true };
    }

    try {
      const res = await fetch(CONFIG.SUBMIT_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'confession', ...data }),
      });
      return { ok: true };
    } catch (err) {
      console.error('[Sheets] Submit failed:', err);
      return { ok: false, error: err.message };
    }
  },

  // Submit newsletter signup
  async submitNewsletter(email) {
    if (!CONFIG.SUBMIT_SCRIPT_URL || CONFIG.SUBMIT_SCRIPT_URL.includes('YOUR_')) {
      console.warn('[Sheets] No submit URL configured. Using fallback.');
      return { ok: true, fallback: true };
    }

    try {
      await fetch(CONFIG.SUBMIT_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email: email,
          source: 'website',
          timestamp: new Date().toISOString(),
        }),
      });
      return { ok: true };
    } catch (err) {
      console.error('[Sheets] Newsletter submit failed:', err);
      return { ok: false, error: err.message };
    }
  },

};

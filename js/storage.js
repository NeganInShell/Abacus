/* ═══════════════════════════════════════
   storage.js — ذخیره‌سازی در localStorage
   ═══════════════════════════════════════ */

'use strict';

const Storage = {
  KEY: 'math-challenge-v1',

  DEFAULTS: {
    username: '',
    theme: 'tmnt',
    history: [], // {op, score, total, date}
  },

  _cache: null,

  load() {
    if (this._cache) return this._cache;

    let data = {};
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) data = JSON.parse(raw);
    } catch (e) {
      /* داده خراب — نادیده بگیر */
    }

    this._cache = Object.assign({}, this.DEFAULTS, data);
    if (!Array.isArray(this._cache.history)) this._cache.history = [];
    return this._cache;
  },

  save() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(this._cache));
    } catch (e) {
      /* حافظه پر یا غیرفعال — بی‌خیال */
    }
  },

  /* ─── اسم ─── */
  getUsername() {
    return this.load().username;
  },

  setUsername(name) {
    this.load().username = name;
    this.save();
  },

  /* ─── تم ─── */
  getTheme() {
    return this.load().theme;
  },

  setTheme(theme) {
    this.load().theme = theme;
    this.save();
  },

  /* ─── تاریخچه ─── */
  addRecord(op, difficulty, score, total) {
    const record = {
      op: op,
      difficulty: difficulty,
      score: score,
      total: total,
      date: Date.now(),
    };
    const state = this.load();
    state.history.unshift(record);
    // حداکثر ۵۰ بازی آخر
    if (state.history.length > 50) state.history.length = 50;
    this.save();
    return record;
  },

  getHistory() {
    return this.load().history;
  },

  clearHistory() {
    this.load().history = [];
    this.save();
  },
};

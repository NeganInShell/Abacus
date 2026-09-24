/* ═══════════════════════════════════════
   sounds.js — صداهای فان با Web Audio API (بدون فایل خارجی)
   ═══════════════════════════════════════ */

'use strict';

const Sounds = {
  ctx: null,
  enabled: true,

  init() {
    if (this.ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    } catch (e) {
      this.ctx = null;
    }
  },

  // فعال‌سازی بعد از اولین تعامل کاربر (سیاست autoplay مرورگرها)
  unlock() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = true;
  },

  /** یک نُت ساده */
  tone(freq, dur, type, when, vol) {
    if (!this.enabled || !this.ctx) return;
    type = type || 'sine';
    when = when || 0;
    vol = vol || 0.15;

    const t0 = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  },

  /** سرسرهٔ صعودی/نزولی کوتاه */
  sweep(from, to, dur, when, type) {
    if (!this.enabled || !this.ctx) return;
    when = when || 0;
    type = type || 'sine';

    const t0 = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(from, t0);
    osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  },

  /* ─── صداهای بازی ─── */

  correct() {
    // آرپژ شاد C-E-G-C
    this.tone(523, 0.12, 'triangle', 0);
    this.tone(659, 0.12, 'triangle', 0.09);
    this.tone(784, 0.12, 'triangle', 0.18);
    this.tone(1047, 0.22, 'triangle', 0.27);
  },

  wrong() {
    // بوق بامزهٔ دوتایی
    this.tone(220, 0.15, 'square', 0, 0.08);
    this.tone(165, 0.2, 'square', 0.15, 0.08);
  },

  click() {
    this.tone(880, 0.05, 'sine', 0, 0.06);
  },

  start() {
    // شیپور شروع
    this.tone(392, 0.12, 'square', 0, 0.09);
    this.tone(523, 0.12, 'square', 0.12, 0.09);
    this.tone(659, 0.25, 'square', 0.24, 0.1);
  },

  win() {
    // فانفار پیروزی
    const notes = [523, 523, 523, 698, 880, 1047];
    const times = [0, 0.12, 0.24, 0.42, 0.6, 0.85];
    const durs = [0.1, 0.1, 0.1, 0.15, 0.15, 0.45];
    for (let i = 0; i < notes.length; i++) {
      this.tone(notes[i], durs[i], 'triangle', times[i], 0.14);
    }
  },

  lose() {
    // شیپور غمگین بامزه
    this.tone(392, 0.2, 'sawtooth', 0, 0.07);
    this.tone(349, 0.2, 'sawtooth', 0.22, 0.07);
    this.tone(311, 0.35, 'sawtooth', 0.44, 0.08);
  },

  star() {
    this.tone(1319, 0.09, 'sine', 0, 0.1);
  },

  tick() {
    this.tone(1200, 0.03, 'sine', 0, 0.04);
  },
};

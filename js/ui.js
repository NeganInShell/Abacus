/* ═══════════════════════════════════════
   ui.js — ابزارهای رابط کاربری
   ═══════════════════════════════════════ */

'use strict';

const UI = {
  /**
   * نمایش یک صفحه و مخفی کردن بقیه
   */
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach((s) => {
      s.classList.remove('active');
    });
    const el = document.getElementById(screenId);
    if (el) el.classList.add('active');
  },

  /**
   * انیمیشن لرزش برای خطای ورودی
   */
  shake(element) {
    element.style.animation = 'shake 0.5s';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  },

  /**
   * راه‌اندازی ایموجی‌های شناور پس‌زمینه بر اساس تم
   */
  startFloaters(theme) {
    const container = document.getElementById('floaters');
    if (!container) return;
    container.innerHTML = '';

    const set = getCharacter(theme).emojiSet;
    for (let i = 0; i < 10; i++) {
      const span = document.createElement('span');
      span.className = 'floater';
      span.textContent = set[i % set.length];
      span.style.left = Math.random() * 95 + '%';
      span.style.fontSize = 1.4 + Math.random() * 1.6 + 'rem';
      span.style.animationDuration = 14 + Math.random() * 14 + 's';
      span.style.animationDelay = Math.random() * 10 + 's';
      container.appendChild(span);
    }
  },

  /**
   * گذاشتن SVG شخصیت داخل یک ظرف
   */
  putMascot(containerId, theme) {
    const box = document.getElementById(containerId);
    if (!box) return;
    box.innerHTML = getCharacter(theme).svg;
  },

  /**
   * جشن کانفتی روی کانواس
   */
  confetti(durationMs) {
    durationMs = durationMs || 2200;
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ffd76a', '#ff6b6b', '#4caf50', '#4facfe', '#f093fb', '#43e97b'];
    const pieces = [];
    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.5,
        w: 6 + Math.random() * 8,
        h: 8 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: 2 + Math.random() * 3.5,
        vx: -1.5 + Math.random() * 3,
        rot: Math.random() * Math.PI,
        vr: -0.15 + Math.random() * 0.3,
      });
    }

    const start = Date.now();
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (Date.now() - start < durationMs) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(frame);
  },

  /**
   * ساخت گزینه‌های پاسخ داخل ظرف
   */
  renderOptions(containerId, options, onPick) {
    const box = document.getElementById(containerId);
    if (!box) return;
    box.innerHTML = '';

    options.forEach((option) => {
      const btn = document.createElement('div');
      btn.className = 'option';
      btn.textContent = toFa(option);
      btn.dataset.value = option;
      btn.onclick = () => onPick(option, btn);
      box.appendChild(btn);
    });
  },

  /**
   * پاک کردن حالت بازخورد و گزینه‌ها
   */
  clearFeedback(feedbackId) {
    const el = document.getElementById(feedbackId);
    if (el) {
      el.textContent = '';
      el.className = 'feedback';
    }
  },
};

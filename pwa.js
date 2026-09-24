/* ═══════════════════════════════════════
   pwa.js — ثبت سرویس‌ورکر و به‌روزرسانی خودکار
   ═══════════════════════════════════════ */

'use strict';

window.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) return;

  // مسیر نسبی تا روی زیرمسیر گیت‌هاب پیجز هم درست کار کند
  navigator.serviceWorker
    .register('sw.js')
    .then((reg) => {
      // اگر نسخه جدیدی در انتظار فعال‌سازی است، همان لحظه فعال شود
      if (reg.waiting) {
        reg.waiting.postMessage('SW_UPDATE');
      }

      // وقتی نسخه جدید شروع به نصب کرد، بعد از نصب فعالش کنیم
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            newWorker.postMessage('SW_UPDATE');
          }
        });
      });
    })
    .catch(() => {
      /* ثبت ناموفق — بازی عادی همچنان کار می‌کند */
    });

  // فقط وقتی از قبل کنترل‌گری بوده، نسخه جدید یعنی به‌روزرسانی؛
  // در این حالت صفحه یک بار تازه‌سازی می‌شود تا محتوای جدید لود شود
  if (navigator.serviceWorker.controller) {
    let refreshed = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshed) return;
      refreshed = true;
      window.location.reload();
    });
  }
});

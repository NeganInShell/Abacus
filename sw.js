/* ═══════════════════════════════════════
   sw.js — سرویس‌ورکر برای کارکرد آفلاین بازی
   ═══════════════════════════════════════ */

'use strict';

/* نام حافظه — با تغییر نسخه، حافظه قدیمی پاک می‌شود */
const CACHE_NAME = 'math-challenge-v2';

/* فایل‌های اصلی بازی که همیشه در دسترس باشند */
const CORE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './pwa.js',
  './css/base.css',
  './css/components.css',
  './css/animations.css',
  './css/themes.css',
  './css/responsive.css',
  './js/questions.js',
  './js/storage.js',
  './js/sounds.js',
  './js/characters.js',
  './js/ui.js',
  './js/game.js',
  './js/app.js',
  './js/games/multiply.js',
  './js/games/divide.js',
  './js/games/add.js',
  './js/games/subtract.js',
  './js/games/stats.js',
];

/* نصب — کش کردن همه فایل‌های اصلی */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_FILES))
  );
  self.skipWaiting();
});

/* فعال‌سازی — پاک کردن حافظه‌های نسخه‌های قدیمی */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* درخواست‌ها — اول حافظه، بعد شبکه، و ذخیره صفحات جدید */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copy);
            });
          }
          return response;
        })
        .catch(() => {
          /* آفلاین بودیم و فایل در حافظه نبود — صفحه اصلی را نشان بده */
          return caches.match('./index.html');
        });
    })
  );
});

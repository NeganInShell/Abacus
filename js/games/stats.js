/* ═══════════════════════════════════════
   games/stats.js — ماژول کارنامه 📊
   ═══════════════════════════════════════ */

'use strict';

const StatsGame = {
  OP_EMOJI: {
    multiply: '✖️',
    divide: '➗',
    add: '➕',
    subtract: '➖',
  },
  OP_NAME: {
    multiply: 'ضرب',
    divide: 'تقسیم',
    add: 'جمع',
    subtract: 'تفریق',
  },
  DIFF_NAME: {
    easy: 'آسون',
    medium: 'متوسط',
    hard: 'سخت',
    mix: 'مخلوط',
  },

  /**
   * نمایش صفحه کارنامه
   */
  show() {
    const history = Storage.getHistory();
    const username = Storage.getUsername();

    document.getElementById('stats-subtitle').textContent = username
      ? `کارنامه ${username} 🧒`
      : 'کارنامه تو';

    this.renderSummary(history);
    this.renderHistory(history);

    UI.showScreen('stats-screen');
  },

  /**
   * خلاصه آمار کلی
   */
  renderSummary(history) {
    const box = document.getElementById('stats-summary');
    const total = history.length;
    let totalScore = 0;
    let totalQuestions = 0;
    let best = 0;

    for (const rec of history) {
      totalScore += rec.score;
      totalQuestions += rec.total;
      if (rec.score > best) best = rec.score;
    }

    const percent = totalQuestions
      ? Math.round((totalScore / totalQuestions) * 100)
      : 0;

    box.innerHTML = `
      <div class="stat-card">
        <div class="stat-emoji">🎮</div>
        <div class="stat-num">${toFa(total)}</div>
        <div class="stat-label">بازی</div>
      </div>
      <div class="stat-card">
        <div class="stat-emoji">🎯</div>
        <div class="stat-num">${toFa(totalScore)}</div>
        <div class="stat-label">جواب درست</div>
      </div>
      <div class="stat-card">
        <div class="stat-emoji">🏆</div>
        <div class="stat-num">${toFa(best)}</div>
        <div class="stat-label">رکورد</div>
      </div>
      <div class="stat-card">
        <div class="stat-emoji">📈</div>
        <div class="stat-num">${toFa(percent)}٪</div>
        <div class="stat-label">میانگین</div>
      </div>
    `;
  },
  /**
   * تاریخچه بازی‌ها
   */
  renderHistory(history) {
    const list = document.getElementById('stats-history');
    const empty = document.getElementById('stats-empty');
    const clearBtn = document.getElementById('clear-history-btn');

    list.innerHTML = '';
    const has = history.length > 0;

    list.classList.toggle('hidden', !has);
    empty.classList.toggle('hidden', has);
    clearBtn.style.display = has ? '' : 'none';

    history.forEach((rec, i) => {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.style.animationDelay = i * 0.04 + 's';

      const opEmoji = this.OP_EMOJI[rec.op] || '🎮';
      const opName = this.OP_NAME[rec.op] || rec.op;
      const diffName = this.DIFF_NAME[rec.difficulty];
      const diffText = diffName ? ` (${diffName})` : '';
      const stars = rec.total
        ? Math.round((rec.score / rec.total) * 3) || (rec.score > 0 ? 1 : 0)
        : 0;
      const starStr = '⭐'.repeat(stars) + '☆'.repeat(Math.max(0, 3 - stars));

      li.innerHTML = `
        <span class="h-emoji">${opEmoji}</span>
        <span class="h-op">${opName}${diffText}</span>
        <span class="h-score">${toFa(rec.score)} از ${toFa(rec.total)}</span>
        <span class="h-stars">${starStr}</span>
        <span class="h-date">${this.formatDate(rec.date)}</span>
      `;
      list.appendChild(li);
    });
  },

  /**
   * تاریخ شمسی ساده
   */
  formatDate(ts) {
    try {
      return new Intl.DateTimeFormat('fa-IR', {
        month: 'long',
        day: 'numeric',
      }).format(new Date(ts));
    } catch (e) {
      return '';
    }
  },

  /**
   * پاک کردن تاریخچه با تأیید
   */
  clear() {
    if (confirm('مطمئنی می‌خوای همه‌ی تاریخچه پاک بشه؟ 🗑')) {
      Storage.clearHistory();
      this.show(); // رفرش صفحه آمار
    }
  },
};

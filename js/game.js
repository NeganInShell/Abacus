/* ═══════════════════════════════════════
   game.js — موتور مشترک بازی
   ═══════════════════════════════════════ */

'use strict';

const Game = {
  TOTAL_QUESTIONS: 10,

  state: {
    op: null,
    difficulty: null,
    tableNumber: null,
    current: 0,
    score: 0,
    wrong: 0,
    answer: null,
    canAnswer: true,
    active: false,
  },

  /* شمارنده برای باطل کردن تایمرهای بازی قبلی */
  _timer: null,

  /**
   * شروع یک بازی جدید
   */
  start(op, difficulty, tableNumber) {
    this._clearTimer();
    this.state = {
      op: op,
      difficulty: difficulty,
      tableNumber: tableNumber === undefined ? null : tableNumber,
      current: 0,
      score: 0,
      wrong: 0,
      answer: null,
      canAnswer: true,
      active: true,
    };
    Sounds.unlock();
    Sounds.start();
    UI.putMascot(op + '-mascot', currentTheme);
    UI.showScreen(op + '-screen');
    this.nextQuestion();
  },

  /**
   * سؤال بعدی
   */
  nextQuestion() {
    const s = this.state;
    if (s.current >= this.TOTAL_QUESTIONS) {
      this.finish();
      return;
    }

    s.current++;
    s.canAnswer = true;

    const q = generateQuestion(s.op, s.difficulty, s.current, s.tableNumber);
    s.answer = q.answer;

    const p = document.getElementById(s.op + '-progress');
    if (p) p.textContent = `سؤال ${toFa(s.current)} از ${toFa(this.TOTAL_QUESTIONS)}`;
    const sc = document.getElementById(s.op + '-score');
    if (sc) sc.textContent = `⭐ ${toFa(s.score)}`;
    const qEl = document.getElementById(s.op + '-question');
    if (qEl) {
      qEl.textContent = q.text;
      // عبارت ریاضی همیشه چپ‌به‌راست نمایش داده شود
      qEl.setAttribute('dir', 'ltr');
    }

    UI.renderOptions(s.op + '-options', generateOptions(q.answer), (option, btn) => {
      this.pick(option, btn);
    });

    UI.clearFeedback(s.op + '-feedback');
  },

  /**
   * انتخاب یک گزینه توسط بازیکن
   */
  pick(option, btn) {
    const s = this.state;
    if (!s.canAnswer) return;
    s.canAnswer = false;

    const feedback = document.getElementById(s.op + '-feedback');
    if (option === s.answer) {
      s.score++;
      btn.classList.add('correct');
      if (feedback) {
        feedback.textContent = PRAISE[Math.floor(Math.random() * PRAISE.length)];
        feedback.className = 'feedback correct';
      }
      Sounds.correct();
      this._setTimer(() => this.nextQuestion(), 1100);
    } else {
      s.wrong++;
      btn.classList.add('wrong');
      if (feedback) {
        feedback.textContent = ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)];
        feedback.className = 'feedback wrong';
        // نمایش گزینه درست به بازیکن
        document.querySelectorAll('#' + s.op + '-options .option').forEach((el) => {
          if (parseInt(el.dataset.value) === s.answer) {
            el.classList.add('correct');
          }
        });
      }
      Sounds.wrong();
      this._setTimer(() => this.nextQuestion(), 1400);
    }

    const sc = document.getElementById(s.op + '-score');
    if (sc) sc.textContent = `⭐ ${toFa(s.score)}`;
  },

  /**
   * پایان بازی و ذخیره نتیجه
   */
  finish() {
    const s = this.state;
    s.active = false;
    this._clearTimer();

    Storage.addRecord(s.op, s.difficulty, s.score, this.TOTAL_QUESTIONS);
    showResult(s.op, s.difficulty, s.score, s.wrong, this.TOTAL_QUESTIONS);
  },

  /**
   * خروج وسط بازی — امتیاز تا اینجا ذخیره می‌شود
   */
  quit() {
    const s = this.state;
    if (!s.active) return;
    s.active = false;
    this._clearTimer();

    if (s.current > 0) {
      Storage.addRecord(s.op, s.difficulty, s.score, this.TOTAL_QUESTIONS);
      showResult(s.op, s.difficulty, s.score, s.wrong, this.TOTAL_QUESTIONS);
    } else {
      UI.showScreen('menu-screen');
    }
  },

  /**
   * زمان‌بندی رفتن به سؤال بعد — با امکان باطل شدن
   */
  _setTimer(fn, ms) {
    this._timer = setTimeout(fn, ms);
  },

  /**
   * باطل کردن تایمر در انتظار (موقع خروج یا شروع دوباره)
   */
  _clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  },
};

/* ─── جملات تشویقی بعد از جواب درست ─── */
const PRAISE = [
  '🎉 آفرین!',
  '🌟 عالی بود!',
  '💪 قهرمانی!',
  '🚀 چه باهوش!',
  '🏆 درسته!',
];

/* ─── جملات دلداری بعد از جواب غلط ─── */
const ENCOURAGE = [
  '😬 اشکالی نداره!',
  '💪 دوباره فکر کن!',
  '🌱 یاد گرفتی!',
  '🤔 یه بار دیگه!',
];

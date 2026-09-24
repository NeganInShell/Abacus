/* ═══════════════════════════════════════
   questions.js — سازنده‌ی سؤال‌ها و گزینه‌ها
   ═══════════════════════════════════════ */

'use strict';

/**
 * تبدیل عدد به ارقام فارسی
 */
function toFa(num) {
  return String(num).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
}

/**
 * عدد تصادفی صحیح در بازه [min, max]
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * بُر زدن آرایه (الگوریتم فیشر-ییتس)
 */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/*
 * سقف اعداد برای هر سطح سختی
 * easy = آسون، medium = متوسط، hard = سخت
 */
const DIFFICULTY_MAX = {
  easy: 10,
  medium: 50,
  hard: 100,
};

/*
 * بازه ضرب و تقسیم برای هر سطح
 * آسون: تا ۵ — متوسط: تا ۷ — سخت: تا ۱۰
 */
const DIFFICULTY_RANGE = {
  easy: 5,
  medium: 7,
  hard: 10,
};

/**
 * انتخاب سطح تصادفی برای حالت مخلوط
 */
function pickRandomDifficulty() {
  const keys = ['easy', 'medium', 'hard'];
  return keys[randInt(0, keys.length - 1)];
}

/**
 * ساخت سؤال بر اساس عملگر و سختی
 * op: 'multiply' | 'divide' | 'add' | 'subtract'
 * difficulty: 'easy' | 'medium' | 'hard' | 'mix'
 * index: شماره سؤال (برای تمرین هدفمند ضرب و تقسیم)
 */
function generateQuestion(op, difficulty, index) {
  // در حالت مخلوط، هر سؤال سختی خودش رو دارد
  const diff = difficulty === 'mix' ? pickRandomDifficulty() : difficulty;
  const range = DIFFICULTY_RANGE[diff] || 10;
  const max = DIFFICULTY_MAX[diff] || 20;

  let a;
  let b;
  let answer;
  let symbol;

  if (op === 'multiply') {
    symbol = '×';
    a = randInt(0, range);
    b = randInt(0, range);
    answer = a * b;
  } else if (op === 'divide') {
    symbol = '÷';
    b = randInt(1, range);
    answer = randInt(0, range);
    a = b * answer; // تضمین اینکه خارج‌قسمت صحیح باشد
  } else if (op === 'add') {
    symbol = '+';
    a = randInt(1, max);
    b = randInt(1, max);
    answer = a + b;
  } else {
    symbol = '−';
    a = randInt(2, max);
    b = randInt(1, a); // b کوچکتر یا مساوی a تا حاصل منفی نشود
    answer = a - b;
  }

  return {
    text: `${a} ${symbol} ${b} = ؟`,
    answer: answer,
  };
}

/**
 * ساخت ۴ گزینه شامل جواب درست
 */
function generateOptions(correct) {
  const options = new Set([correct]);

  while (options.size < 4) {
    const offset = randInt(-10, 10);
    const wrong = correct + offset;
    if (wrong >= 0 && wrong !== correct) {
      options.add(wrong);
    }
  }

  return shuffle(Array.from(options));
}

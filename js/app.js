'use strict';

const GAME_MODULES = {
  multiply: MultiplyGame,
  divide: DivideGame,
  add: AddGame,
  subtract: SubtractGame,
};

let currentTheme = 'tmnt';
let pendingOp = null;

function applyTheme(theme, save = true) {
  currentTheme = theme;
  document.body.dataset.theme = theme;
  UI.startFloaters(theme);
  buildThemeHero();
  if (save) Storage.setTheme(theme);
}

function buildThemeHero() {
  const hero = document.getElementById('theme-hero');
  if (!hero) return;
  const svg = getCharacter(currentTheme).svg;
  hero.innerHTML =
    '<div class="hero-slot">' + svg + '</div>' +
    '<div class="hero-slot">' + svg + '</div>';
}

function startGame() {
  const input = document.getElementById('username');
  const name = input.value.trim();

  if (name === '') {
    UI.shake(input);
    input.focus();
    return;
  }
  if (name.length < 2) {
    alert('اسم باید حداقل ۲ حرف باشه 🙈');
    UI.shake(input);
    return;
  }

  Storage.setUsername(name);
  Sounds.unlock();
  Sounds.click();
  document.getElementById('welcome-text').textContent = `👋 سلام ${name}!`;
  UI.showScreen('menu-screen');
}

function openDifficulty(op) {
  Sounds.click();
  pendingOp = op;
  const mod = GAME_MODULES[op];
  document.getElementById('difficulty-title').textContent = mod.TITLE;
  document.getElementById('difficulty-subtitle').textContent = mod.DIFFICULTY_SUBTITLE;
  UI.showScreen('difficulty-screen');
}

function launchGame(op, difficulty) {
  Sounds.click();
  Game.start(op, difficulty);
}

const GAME_QUOTES = {
  multiply: '✖️ ضرب‌ها رو محکم کاری!',
  divide: '➗ تقسیم رو مثل نینجا بزن!',
  add: '➕ جمع، دوستِ جمع کردن مهارت‌ها!',
  subtract: '➖ تفریق یعنی حذف اشتباه‌ها!',
};

function showResult(op, difficulty, score, wrong, total) {
  const percent = total ? Math.round((score / total) * 100) : 0;
  const stars = Math.max(0, Math.min(3, Math.round(percent / 34)));

  Sounds.win();
  UI.confetti();
  UI.putMascot('result-mascot', currentTheme);

  document.getElementById('result-title').textContent =
    percent >= 90 ? '🏆 فوق‌العاده بود!' :
    percent >= 60 ? '🎉 آفرین!' :
    percent >= 30 ? '👍 خوب بود!' : '💪 دوباره تلاش کن!';

  document.getElementById('result-stars').innerHTML =
    '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  document.getElementById('result-correct').textContent = toFa(score);
  document.getElementById('result-wrong').textContent = toFa(wrong);
  document.getElementById('result-percent').textContent = toFa(percent) + '٪';
  document.getElementById('result-quote').textContent = GAME_QUOTES[op] || '';

  document.getElementById('result-again-btn').onclick = () => {
    Sounds.click();
    launchGame(op, Game.state.difficulty);
  };
  document.getElementById('result-menu-btn').onclick = () => {
    Sounds.click();
    UI.showScreen('menu-screen');
  };

  UI.showScreen('result-screen');

  if (stars > 0) {
    for (let i = 0; i < stars; i++) {
      setTimeout(() => Sounds.star(), 700 + i * 280);
    }
  }
}

function initApp() {
  currentTheme = Storage.getTheme() || 'tmnt';
  document.body.dataset.theme = currentTheme;
  UI.startFloaters(currentTheme);
  buildThemeHero();

  const savedName = Storage.getUsername();
  if (savedName) {
    document.getElementById('username').value = savedName;
    document.getElementById('welcome-text').textContent = `👋 سلام ${savedName}!`;
  }

  document.querySelectorAll('.theme-btn').forEach((btn) => {
    if (btn.dataset.theme === currentTheme) btn.classList.add('selected');
    btn.addEventListener('click', () => {
      Sounds.unlock();
      Sounds.click();
      document.querySelectorAll('.theme-btn').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      applyTheme(btn.dataset.theme);
    });
  });

  document.getElementById('start-btn').onclick = startGame;
  document.getElementById('username').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startGame();
  });

  document.querySelectorAll('.menu-btn[data-op]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const op = btn.dataset.op;
      if (op === 'stats') {
        Sounds.click();
        StatsGame.show();
      } else {
        openDifficulty(op);
      }
    });
  });

  // دکمه‌های صفحه انتخاب سختی
  document.querySelectorAll('.diff-btn[data-level]').forEach((btn) => {
    btn.addEventListener('click', () => {
      launchGame(pendingOp, btn.dataset.level);
    });
  });

  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.onclick = () => {
      Sounds.click();
      // اگر وسط بازی هستیم، امتیاز ذخیره و نتیجه نمایش داده می‌شود
      Game.quit();
      if (!document.querySelector('.screen.active')) {
        UI.showScreen('menu-screen');
      }
    };
  });

  document.getElementById('clear-history-btn').onclick = () => StatsGame.clear();
}

document.addEventListener('DOMContentLoaded', initApp);



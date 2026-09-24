'use strict';

const Characters = {

  /* 🐢 لاک‌پشت نینجا */
  tmnt: {
    name: 'لاک‌پشت نینجا',
    emojiSet: ['🐢', '🥷', '🍕', '⚔️', '🌟', '💚', '🛡️', '🎮', '✨', '🏆'],
    svg: `<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="70" cy="195" rx="18" ry="10" fill="#3d8b40"/>
      <ellipse cx="130" cy="195" rx="18" ry="10" fill="#3d8b40"/>
      <ellipse cx="38" cy="150" rx="12" ry="18" fill="#43a047" transform="rotate(20 38 150)"/>
      <ellipse cx="162" cy="150" rx="12" ry="18" fill="#43a047" transform="rotate(-20 162 150)"/>
      <ellipse cx="100" cy="155" rx="52" ry="42" fill="#43a047"/>
      <ellipse cx="100" cy="150" rx="46" ry="36" fill="#6d4c41"/>
      <ellipse cx="100" cy="150" rx="34" ry="26" fill="#8d6e63"/>
      <path d="M 78 138 L 100 128 L 122 138 L 122 162 L 100 172 L 78 162 Z" fill="#a1887f" stroke="#6d4c41" stroke-width="3"/>
      <rect x="48" y="150" width="104" height="14" rx="7" fill="#d32f2f"/>
      <circle cx="100" cy="157" r="11" fill="#fdd835" stroke="#f9a825" stroke-width="3"/>
      <ellipse cx="100" cy="80" rx="46" ry="42" fill="#43a047"/>
      <path d="M 54 74 Q 100 58 146 74 L 146 92 Q 100 78 54 92 Z" fill="#d32f2f"/>
      <circle cx="78" cy="82" r="10" fill="white"/>
      <circle cx="122" cy="82" r="10" fill="white"/>
      <circle cx="78" cy="83" r="5" fill="#222"/>
      <circle cx="122" cy="83" r="5" fill="#222"/>
      <path d="M 85 105 Q 100 115 115 105" stroke="#1b5e20" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 148 165 Q 168 172 160 185" stroke="#43a047" stroke-width="10" fill="none" stroke-linecap="round"/>
    </svg>`,
  },

  /* 🧽 باب‌اسفنجی */
  spongebob: {
    name: 'باب‌اسفنجی',
    emojiSet: ['🧽', '🍍', '⭐', '🌊', '🧇', '😄', '💛', '🎈', '✨', '🏆'],
    svg: `<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg">
      <rect x="78" y="178" width="10" height="22" rx="5" fill="#f9e79f"/>
      <rect x="112" y="178" width="10" height="22" rx="5" fill="#f9e79f"/>
      <rect x="76" y="168" width="14" height="14" fill="white"/>
      <rect x="76" y="168" width="14" height="4" fill="#e74c3c"/>
      <rect x="76" y="174" width="14" height="4" fill="#e74c3c"/>
      <rect x="110" y="168" width="14" height="14" fill="white"/>
      <rect x="110" y="168" width="14" height="4" fill="#e74c3c"/>
      <rect x="110" y="174" width="14" height="4" fill="#e74c3c"/>
      <ellipse cx="82" cy="202" rx="14" ry="8" fill="#111"/>
      <ellipse cx="118" cy="202" rx="14" ry="8" fill="#111"/>
      <rect x="40" y="40" width="120" height="130" rx="14" fill="#ffe94a" stroke="#e6c229" stroke-width="3"/>
      <circle cx="58" cy="60" r="8" fill="#f2d733" stroke="#dcc42a" stroke-width="2"/>
      <circle cx="146" cy="70" r="7" fill="#f2d733" stroke="#dcc42a" stroke-width="2"/>
      <circle cx="55" cy="150" r="7" fill="#f2d733" stroke="#dcc42a" stroke-width="2"/>
      <circle cx="148" cy="145" r="8" fill="#f2d733" stroke="#dcc42a" stroke-width="2"/>
      <circle cx="95" cy="158" r="6" fill="#f2d733" stroke="#dcc42a" stroke-width="2"/>
      <circle cx="80" cy="95" r="26" fill="white" stroke="#e6c229" stroke-width="3"/>
      <circle cx="120" cy="95" r="26" fill="white" stroke="#e6c229" stroke-width="3"/>
      <circle cx="80" cy="95" r="12" fill="#5dade2"/>
      <circle cx="120" cy="95" r="12" fill="#5dade2"/>
      <circle cx="80" cy="95" r="6" fill="#111"/>
      <circle cx="120" cy="95" r="6" fill="#111"/>
      <ellipse cx="100" cy="118" rx="5" ry="10" fill="#f9e79f" stroke="#dcc42a" stroke-width="2"/>
      <path d="M 62 132 Q 100 160 138 132" stroke="#7b241c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="90" y="136" width="10" height="12" rx="2" fill="white" stroke="#ddd" stroke-width="1"/>
      <rect x="102" y="136" width="10" height="12" rx="2" fill="white" stroke="#ddd" stroke-width="1"/>
      <circle cx="58" cy="120" r="8" fill="#f5b041" opacity="0.6"/>
      <circle cx="142" cy="120" r="8" fill="#f5b041" opacity="0.6"/>
      <polygon points="100,176 88,166 112,166" fill="#c0392b"/>
    </svg>`,
  },

  /* 🦇 بتمن */
  batman: {
    name: 'بتمن',
    emojiSet: ['🦇', '🌑', '⚡', '🌃', '🖤', '💪', '🚨', '🎮', '✨', '🏆'],
    svg: `<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg">
      <path d="M 52 95 Q 28 150 40 202 L 62 182 Q 55 148 70 118 Z" fill="#1a1b24"/>
      <path d="M 148 95 Q 172 150 160 202 L 138 182 Q 145 148 130 118 Z" fill="#1a1b24"/>
      <ellipse cx="100" cy="172" rx="55" ry="34" fill="#23252f"/>
      <ellipse cx="100" cy="172" rx="40" ry="24" fill="#2f323f"/>
      <ellipse cx="100" cy="170" rx="16" ry="9" fill="#ffd76a"/>
      <polygon points="100,162 84,168 90,175 100,171 110,175 116,168" fill="#1a1b24"/>
      <polygon points="58,55 48,16 80,42" fill="#3a3d4d"/>
      <polygon points="142,55 152,16 120,42" fill="#3a3d4d"/>
      <path d="M 55 60 Q 55 34 100 34 Q 145 34 145 60 L 145 95 Q 145 112 100 112 Q 55 112 55 95 Z" fill="#3a3d4d"/>
      <path d="M 62 72 Q 100 60 138 72 L 138 88 Q 100 78 62 88 Z" fill="#2a2c38"/>
      <path d="M 72 76 Q 88 68 92 80 Q 88 88 72 84 Z" fill="white"/>
      <path d="M 108 76 Q 112 68 128 76 Q 128 84 112 88 Q 104 84 108 76 Z" fill="white"/>
      <path d="M 80 100 Q 100 108 120 100" stroke="#1a1b24" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`,
  },
};

/**
 * گرفتن شخصیت فعال بر اساس تم
 */
function getCharacter(theme) {
  return Characters[theme] || Characters.tmnt;
}


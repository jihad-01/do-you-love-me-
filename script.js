/**
 * Do You Love Me? - Interactive App
 * Clean, modern, self-contained vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== DOM Elements =====
  const body = document.body;
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const heartsContainer = document.getElementById('heartsContainer');
  const questionState = document.getElementById('questionState');
  const successState = document.getElementById('successState');

  // ===== State =====
  let noClickCount = 0;
  const maxNoTexts = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Please? 🥺",
    "Don't break my heart!",
    "I'll be sad...",
    "Okay... but why?",
    "Final answer?"
  ];

  // Progressive scale for Yes button
  const yesScales = [1, 1.15, 1.3, 1.45, 1.6, 1.8, 2.0, 2.2];

  // ===== Floating Hearts Animation =====
  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = ['❤️', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];

    // Random horizontal position
    heart.style.left = Math.random() * 100 + 'vw';

    // Random size & duration
    const size = 0.9 + Math.random() * 1.1;
    heart.style.fontSize = size + 'rem';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';

    heartsContainer.appendChild(heart);

    // Clean up after animation
    setTimeout(() => {
      heart.remove();
    }, 15000);
  }

  // Continuously spawn hearts
  function startHeartRain() {
    // Initial burst
    for (let i = 0; i < 8; i++) {
      setTimeout(createFloatingHeart, i * 300);
    }

    // Ongoing
    setInterval(createFloatingHeart, 800);
  }

  startHeartRain();

  // ===== No Button Logic =====
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noClickCount++;

    // Update text
    const textIndex = Math.min(noClickCount, maxNoTexts.length - 1);
    noBtn.textContent = maxNoTexts[textIndex];

    // Scale Yes button
    const scaleIndex = Math.min(noClickCount, yesScales.length - 1);
    yesBtn.style.transform = `scale(${yesScales[scaleIndex]})`;

    // After a few clicks, start escaping
    if (noClickCount >= 3) {
      moveNoButton();
    }
  });

  function moveNoButton() {
    // Make it fixed so it can escape the card
    noBtn.classList.add('escaping');

    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // Keep it fully inside viewport with some padding
    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;

    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
  }

  // Also move on mouseenter after enough clicks (extra fun)
  noBtn.addEventListener('mouseenter', () => {
    if (noClickCount >= 5) {
      moveNoButton();
    }
  });

  // ===== Yes Button - Success State =====
  yesBtn.addEventListener('click', () => {
    // Transition to success
    body.classList.add('success');

    // Hide question, show success (handled by CSS)
    // Create burst of hearts
    createHeartBurst();
  });

  function createHeartBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 28; i++) {
      const heart = document.createElement('div');
      heart.classList.add('burst-heart');
      heart.textContent = ['❤️', '💖', '💕', '💗', '💓', '💞'][Math.floor(Math.random() * 6)];

      // Start from center
      heart.style.left = centerX + 'px';
      heart.style.top = centerY + 'px';

      // Random direction & distance
      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 280;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      heart.style.setProperty('--tx', tx + 'px');
      heart.style.setProperty('--ty', ty + 'px');

      // Slight size variation
      heart.style.fontSize = (1.2 + Math.random() * 1.4) + 'rem';

      document.body.appendChild(heart);

      // Clean up
      setTimeout(() => heart.remove(), 1500);
    }
  }

  // ===== Accessibility & Window Resize =====
  // Keep escaping button inside viewport on resize
  window.addEventListener('resize', () => {
    if (noBtn.classList.contains('escaping')) {
      const rect = noBtn.getBoundingClientRect();
      if (rect.right > window.innerWidth - 10 || rect.bottom > window.innerHeight - 10) {
        moveNoButton();
      }
    }
  });
});

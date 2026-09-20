const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const pandaGif = document.getElementById("panda-gif");
const questionContainer = document.getElementById("question-container");
const successContainer = document.getElementById("success-container");

let noClickCount = 0;
let yesScale = 1;

// Sequenced phrases for the "No" button
const noPhrases = [
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "Have a heart!",
  "Don't be so cold!",
  "Change your mind?",
  "Is that your final answer?"
];

// Array of cartoon panda reaction GIFs
const pandaGifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDJzeWhkcmVlZnR2YWNrdml2azR2eHdrbmkzdWp0ejBhNGdmdTFmdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob5qwRBUrcY/giphy.gif", // Sad
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNndic2w1czBwcWVwMHpxbHgzOXR0cGpobWtlNDlzOHc1bjA5b2FhZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ISOckXUybVfQ4/giphy.gif", // Pouting
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmNudHJqNHQ2eTYza3pzazd6ZjR1dmwzMXJ1dm9oNXhhNGgxeWs5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d22A0yGf4OStA9I93a/giphy.gif", // Crying
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmkxbzI4dWQybXpzeTN5dnkyZWNsbzVxbTFndTVvYXZrODZ2ZmR1eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13A273yA61a4O4/giphy.gif", // Begging
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXp0dHN1MXh3OGc1cjAxaGRvdjl0aTB5MmdvZ2t2OTgxbTFsd3pxMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7sfDTEoSc8i2Y/giphy.gif"  // Heartbroken
];

// Handles clicks on the "No" button
noBtn.addEventListener("click", () => {
  // 1. Update text
  const phraseIndex = Math.min(noClickCount, noPhrases.length - 1);
  noBtn.textContent = noPhrases[phraseIndex];

  // 2. Change GIF
  const gifIndex = noClickCount % pandaGifs.length;
  pandaGif.src = pandaGifs[gifIndex];

  // 3. Grow the "Yes!" button
  yesScale += 0.35;
  yesBtn.style.transform = `scale(${yesScale})`;

  // 4. Make "No" button move randomly after 3 clicks
  if (noClickCount >= 3) {
    moveNoButton();
  }

  noClickCount++;
});

// Teleports the "No" button randomly across the viewport
function moveNoButton() {
  if (!noBtn.classList.contains("absolute")) {
    noBtn.classList.add("absolute");
  }

  const padding = 50;
  const maxWidth = window.innerWidth - noBtn.offsetWidth - padding;
  const maxHeight = window.innerHeight - noBtn.offsetHeight - padding;

  const randomX = Math.max(padding, Math.floor(Math.random() * maxWidth));
  const randomY = Math.max(padding, Math.floor(Math.random() * maxHeight));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// Handles clicking "Yes!"
yesBtn.addEventListener("click", () => {
  document.body.classList.add("success-theme");
  questionContainer.classList.add("hidden");
  successContainer.classList.remove("hidden");
});

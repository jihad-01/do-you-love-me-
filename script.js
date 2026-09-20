"use strict";

/* =========================
   Elements
========================= */

const questionCard = document.getElementById("questionCard");
const successCard = document.getElementById("successCard");

const pandaGif = document.getElementById("pandaGif");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

/* =========================
   Configuration
========================= */

const noMessages = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Pretty please? 🥺",
  "Okay... but are you REALLY sure?"
];

const pandaReactions = [
  "assets/panda-asking.gif",
  "assets/panda-confused.gif",
  "assets/panda-sad.gif",
  "assets/panda-shocked.gif",
  "assets/panda-crying.gif",
  "assets/panda-pleading.gif",
  "assets/panda-surprised.gif",
  "assets/panda-dramatic.gif",
  "assets/panda-cute.gif",
  "assets/panda-last-chance.gif"
];

/*
 * Starting scale for the Yes button.
 */
const initialYesScale = 1;

/*
 * Amount the Yes button grows after each No click.
 */
const yesGrowth = 0.12;

/*
 * Number of No clicks before the button starts escaping.
 */
const escapeAfter = 4;

/* =========================
   State
========================= */

let noClicks = 0;
let yesScale = initialYesScale;

/* =========================
   Yes Button
========================= */

yesBtn.addEventListener("click", showSuccess);

/* =========================
   No Button
========================= */

noBtn.addEventListener("click", handleNoClick);

function handleNoClick() {
  noClicks++;

  updateNoMessage();
  updatePanda();
  growYesButton();

  if (noClicks >= escapeAfter) {
    moveNoButton();
  }
}

/* =========================
   Change No Text
========================= */

function updateNoMessage() {
  const messageIndex = Math.min(
    noClicks,
    noMessages.length - 1
  );

  noBtn.textContent = noMessages[messageIndex];
}

/* =========================
   Change Panda GIF
========================= */

function updatePanda() {
  const gifIndex = Math.min(
    noClicks,
    pandaReactions.length - 1
  );

  pandaGif.src = pandaReactions[gifIndex];

  /*
   * Force the browser to replay the GIF when the same
   * file is selected again.
   */
  pandaGif.classList.remove("gif-refresh");

  void pandaGif.offsetWidth;

  pandaGif.classList.add("gif-refresh");
}

/* =========================
   Grow Yes Button
========================= */

function growYesButton() {
  yesScale += yesGrowth;

  /*
   * Prevent the button from becoming unreasonably large.
   */
  const maxScale = 2.2;
  const finalScale = Math.min(yesScale, maxScale);

  yesBtn.style.transform = `scale(${finalScale})`;

  /*
   * Increase its visual prominence as well.
   */
  yesBtn.style.zIndex = String(10 + noClicks);
}

/* =========================
   Move No Button
========================= */

function moveNoButton() {
  noBtn.classList.add("escaping");

  const padding = 20;

  const buttonWidth = noBtn.offsetWidth;
  const buttonHeight = noBtn.offsetHeight;

  const maxX = Math.max(
    padding,
    window.innerWidth - buttonWidth - padding
  );

  const maxY = Math.max(
    padding,
    window.innerHeight - buttonHeight - padding
  );

  const randomX =
    Math.floor(Math.random() * (maxX - padding + 1)) + padding;

  const randomY =
    Math.floor(Math.random() * (maxY - padding + 1)) + padding;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

/* =========================
   Keep Escaping Button
   On-Screen After Resize
========================= */

window.addEventListener("resize", () => {
  if (noBtn.classList.contains("escaping")) {
    moveNoButton();
  }
});

/* =========================
   Success Screen
========================= */

function showSuccess() {
  /*
   * Remove the escaping state before switching screens.
   */
  noBtn.classList.remove("escaping");
  noBtn.removeAttribute("style");

  /*
   * Fade out question card.
   */
  questionCard.classList.add("fade-out");

  /*
   * Change the background slightly before revealing
   * the success screen.
   */
  document.body.classList.add("success-mode");

  setTimeout(() => {
    questionCard.hidden = true;

    successCard.hidden = false;

    /*
     * Reset animation so it plays whenever success appears.
     */
    successCard.classList.remove("success-card");

    void successCard.offsetWidth;

    successCard.classList.add("success-card");
  }, 450);
}

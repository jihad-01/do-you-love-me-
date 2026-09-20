const questionContainer = document.querySelector('.question-container');
const resultContainer = document.querySelector('.result-container');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const pandaGif = document.getElementById('panda-gif');

// Ekhane shobgulo cute panda ebong love proposal-er GIF dewa holo
const noGifs = [
    "https://i.giphy.com/media/LNbc2cG6PKivrJsaIx/giphy.gif",
    "https://i.giphy.com/media/3o7TKWpu2WCovaH0cw/giphy.gif",
    "https://i.giphy.com/media/2bUpP71bbVnZ3x7lgQ/giphy.gif",
    "https://i.giphy.com/media/adaOM3mG8b85vW7Xv2/giphy.gif",
    "https://i.giphy.com/media/10UxkWwZ961WdO/giphy.gif",
    "https://i.giphy.com/media/7efZHv4WfnRwk/giphy.gif"
];

// "No" button-er text gulo
const noTexts = [
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?"
];

let clickCount = 0;

noBtn.addEventListener('click', () => {
    if (clickCount < noTexts.length) {
        noBtn.textContent = noTexts[clickCount];
        // Protibar click-e sundor panda GIF ashbe
        pandaGif.src = noGifs[clickCount % noGifs.length];
        clickCount++;
        
        // Yes button-ti kramonoye boro hote thakbe
        let currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentSize + 2) + 'px';
    } else {
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = Math.floor(Math.random() * maxX) + 'px';
        noBtn.style.top = Math.floor(Math.random() * maxY) + 'px';
    }
});

// "Yes" dile romantic panda love GIF ebong success message ashbe
yesBtn.addEventListener('click', () => {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
});

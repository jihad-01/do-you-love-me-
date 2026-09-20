const questionContainer = document.querySelector('.question-container');
const resultContainer = document.querySelector('.result-container');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const pandaGif = document.getElementById('panda-gif');
const body = document.body;

const noGifs = [
    "https://i.giphy.com/media/LNbc2cG6PKivrJsaIx/giphy.gif",
    "https://i.giphy.com/media/3o7TKWpu2WCovaH0cw/giphy.gif",
    "https://i.giphy.com/media/adaOM3mG8b85vW7Xv2/giphy.gif",
    "https://i.giphy.com/media/10UxkWwZ961WdO/giphy.gif",
    "https://i.giphy.com/media/7efZHv4WfnRwk/giphy.gif"
];

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
        pandaGif.src = noGifs[clickCount % noGifs.length];
        clickCount++;
        
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

yesBtn.addEventListener('click', () => {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    body.classList.add('success-bg'); // Deep red romantic background activate hobe
});

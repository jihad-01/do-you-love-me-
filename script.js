const questionContainer = document.querySelector('.question-container');
const resultContainer = document.querySelector('.result-container');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');

// Array of texts to show when clicking/hovering "No"
const noTexts = [
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "Have a heart!",
    "Don't be like that!"
];

let clickCount = 0;

// When "No" is clicked, change text or make it run away
noBtn.addEventListener('click', () => {
    if (clickCount < noTexts.length) {
        noBtn.textContent = noTexts[clickCount];
        clickCount++;
        
        // Increase Yes button size slightly to tempt the user
        let currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentSize + 2) + 'px';
    } else {
        // Randomly move the No button around the screen
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = Math.floor(Math.random() * maxX) + 'px';
        noBtn.style.top = Math.floor(Math.random() * maxY) + 'px';
    }
});

// When "Yes" is clicked, show the success screen
yesBtn.addEventListener('click', () => {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
});

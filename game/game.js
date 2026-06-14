// ----------------------
// FISH DATA (shallow only)
// ----------------------

const fishData = [
    {
        id: "yellow-tang",
        name: "Yellow Tang",
        sprite: "yellow_tang.png",
        spriteWidth: 96,
        spriteHeight: 64,
        depthZone: "shallow",
        size: "Up to 20cm",
        weight: "340g",
        lifespan: "30 years",
        diet: "Algae",
        funFact: "Turns dull at night.",
        speedFactor: 0.7,
        scale: 0.5
    },
    {
        id: "blue-tang",
        name: "Blue Tang",
        sprite: "blue_tang.png",
        spriteWidth: 96,
        spriteHeight: 64,
        depthZone: "shallow",
        size: "25–31cm",
        weight: "600g",
        lifespan: "30 years",
        diet: "Plankton",
        funFact: "Has venomous tail spines.",
        speedFactor: 0.8,
        scale: 0.55
    },
    {
        id: "clownfish",
        name: "Clownfish",
        sprite: "clownfish.png",
        spriteWidth: 64,
        spriteHeight: 32,
        depthZone: "shallow",
        size: "11cm",
        weight: "Small",
        lifespan: "6–10 years",
        diet: "Algae",
        funFact: "Lives in anemones.",
        speedFactor: 0.9,
        scale: 0.45
    }
];

// ----------------------
// DOM ELEMENTS
// ----------------------

const ocean = document.getElementById("ocean");
const infoPanel = document.getElementById("info-panel");
const infoName = document.getElementById("info-name");
const infoDepth = document.getElementById("info-depth");
const infoSize = document.getElementById("info-size");
const infoWeight = document.getElementById("info-weight");
const infoLifespan = document.getElementById("info-lifespan");
const infoDiet = document.getElementById("info-diet");
const infoFact = document.getElementById("info-fact");
const infoClose = document.getElementById("info-close");

const menuOverlay = document.getElementById("menu-overlay");
const btnQuizMenu = document.getElementById("btn-quiz");
const btnGuess = document.getElementById("btn-guess");
const btnCatch = document.getElementById("btn-catch");
const menuClose = document.getElementById("menu-close");

const quizOverlay = document.getElementById("quiz-overlay");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
const quizExit = document.getElementById("quiz-exit");

const catchOverlay = document.getElementById("catch-overlay");
const catchScoreSpan = document.getElementById("catch-score");
const catchStart = document.getElementById("catch-start");
const catchExit = document.getElementById("catch-exit");

// ----------------------
// WATER FADE
// ----------------------

let depth = 0;

function updateOceanColour() {
    const t = depth / 100;
    const r = Math.round(100 * (1 - t) + 0 * t);
    const g = Math.round(180 * (1 - t) + 20 * t);
    const b = Math.round(255 * (1 - t) + 60 * t);
    ocean.style.transition = "background-color 3s linear";
    ocean.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function startDepthFade() {
    updateOceanColour();
    setInterval(() => {
        if (depth < 100) depth += 1;
        updateOceanColour();
    }, 15000);
}

// ----------------------
// FISH SPAWNING
// ----------------------

function spawnFish() {
    const shallowFish = fishData.filter(f => f.depthZone === "shallow");
    const fishInfo = shallowFish[Math.floor(Math.random() * shallowFish.length)];

    const img = document.createElement("img");
    img.src = "../images/" + fishInfo.sprite;
    img.classList.add("fish");

    const scale = fishInfo.scale;
    const width = fishInfo.spriteWidth * scale;
    const height = fishInfo.spriteHeight * scale;

    img.style.width = width + "px";
    img.style.height = height + "px";

    const oceanRect = ocean.getBoundingClientRect();
    const maxY = oceanRect.height - height;
    img.style.top = Math.random() * maxY + "px";

    const fromLeft = Math.random() < 0.5;

    if (fromLeft) {
        img.style.left = -width + "px";
        img.style.transform = "scaleX(-1)";
    } else {
        img.style.left = oceanRect.width + "px";
        img.style.transform = "scaleX(1)";
    }

    img.addEventListener("click", () => {
        showFishInfo(fishInfo);
        if (catchActive) {
            catchScore++;
            catchScoreSpan.textContent = catchScore;
        }
    });

    ocean.appendChild(img);

    const duration = 40000 * fishInfo.speedFactor * (0.8 + Math.random() * 0.4);

    img.animate(
        [
            { left: img.style.left },
            { left: fromLeft ? oceanRect.width + "px" : -width + "px" }
        ],
        { duration, easing: "linear" }
    );

    setTimeout(() => img.remove(), duration);
}

function startSpawning() {
    spawnFish();
    setInterval(spawnFish, 5000);
}

// ----------------------
// BUBBLES
// ----------------------

function spawnBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const oceanRect = ocean.getBoundingClientRect();
    bubble.style.left = Math.random() * oceanRect.width + "px";

    ocean.appendChild(bubble);
    setTimeout(() => bubble.remove(), 8000);
}

function startBubbles() {
    setInterval(spawnBubble, 1200);
}

// ----------------------
// INFO PANEL
// ----------------------

function showFishInfo(fish) {
    infoName.textContent = fish.name;
    infoDepth.textContent = "Depth zone: " + fish.depthZone;
    infoSize.textContent = "Size: " + fish.size;
    infoWeight.textContent = "Weight: " + fish.weight;
    infoLifespan.textContent = "Lifespan: " + fish.lifespan;
    infoDiet.textContent = "Diet: " + fish.diet;
    infoFact.textContent = "Fun fact: " + fish.funFact;

    infoPanel.classList.remove("hidden");
}

infoClose.addEventListener("click", () => {
    infoPanel.classList.add("hidden");
});

// ----------------------
// MINI‑GAME MENU
// ----------------------

btnQuizMenu.addEventListener("click", () => {
    menuOverlay.classList.remove("hidden");
});

menuClose.addEventListener("click", () => {
    menuOverlay.classList.add("hidden");
});

// ----------------------
// GUESS! – QUIZ SYSTEM
// ----------------------

const quizQuestions = [
    {
        question: "Which fish is bright yellow?",
        options: ["Yellow Tang", "Blue Tang", "Clownfish", "Shark"],
        correct: "Yellow Tang"
    },
    {
        question: "Which fish has venomous tail spines?",
        options: ["Blue Tang", "Clownfish", "Yellow Tang", "Lanternfish"],
        correct: "Blue Tang"
    },
    {
        question: "Which fish lives in sea anemones?",
        options: ["Clownfish", "Yellow Tang", "Blue Tang", "Gulper Eel"],
        correct: "Clownfish"
    },
    {
        question: "Which fish mainly eats algae?",
        options: ["Yellow Tang", "Clownfish", "Blue Tang", "Shark"],
        correct: "Yellow Tang"
    },
    {
        question: "Which fish mainly eats plankton?",
        options: ["Blue Tang", "Clownfish", "Yellow Tang", "Anglerfish"],
        correct: "Blue Tang"
    }
];

let availableQuestions = [...quizQuestions];

function getNextQuestion() {
    if (availableQuestions.length === 0) {
        availableQuestions = [...quizQuestions];
    }
    const index = Math.floor(Math.random() * availableQuestions.length);
    const q = availableQuestions[index];
    availableQuestions.splice(index, 1);
    return q;
}

let currentQuestion = null;

function loadQuiz() {
    quizFeedback.textContent = "";
    quizOptions.innerHTML = "";

    currentQuestion = getNextQuestion();
    quizQuestion.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => {
            if (option === currentQuestion.correct) {
                quizFeedback.textContent = "Correct!";
                quizFeedback.style.color = "#2e7d32";
            } else {
                quizFeedback.textContent = `Incorrect. The correct answer is ${currentQuestion.correct}.`;
                quizFeedback.style.color = "#c62828";
            }
        };
        quizOptions.appendChild(btn);
    });
}

btnGuess.addEventListener("click", () => {
    menuOverlay.classList.add("hidden");
    quizOverlay.classList.remove("hidden");
    loadQuiz();
});

quizNext.addEventListener("click", () => {
    loadQuiz();
});

quizExit.addEventListener("click", () => {
    quizOverlay.classList.add("hidden");
});

// ----------------------
// CATCH! – CLICK FISH GAME
// ----------------------

let catchActive = false;
let catchScore = 0;
let catchTimer = null;
let countdownInterval = null;

const countdownDisplay = document.createElement("div");
countdownDisplay.id = "countdown";
countdownDisplay.classList.add("hidden");
document.body.appendChild(countdownDisplay);

btnCatch.addEventListener("click", () => {
    menuOverlay.classList.add("hidden");
    catchOverlay.classList.remove("hidden");
    catchScore = 0;
    catchScoreSpan.textContent = catchScore;
});

catchStart.addEventListener("click", () => {
    catchOverlay.classList.add("hidden");
    catchScore = 0;
    catchScoreSpan.textContent = catchScore;
    catchActive = true;

    let timeLeft = 15;
    countdownDisplay.textContent = timeLeft;
    countdownDisplay.classList.remove("hidden");

    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownDisplay.textContent = timeLeft;
        if (timeLeft <= 0) clearInterval(countdownInterval);
    }, 1000);

    catchTimer = setTimeout(() => {
        catchActive = false;
        countdownDisplay.classList.add("hidden");
        alert("Time's up! You caught " + catchScore + " fish.");
    }, 15000);
});

catchExit.addEventListener("click", () => {
    catchOverlay.classList.add("hidden");
    catchActive = false;
    countdownDisplay.classList.add("hidden");
    if (catchTimer) clearTimeout(catchTimer);
    if (countdownInterval) clearInterval(countdownInterval);
});

// ----------------------
// INIT
// ----------------------

window.onload = () => {
    startDepthFade();
    startSpawning();
    startBubbles();
};

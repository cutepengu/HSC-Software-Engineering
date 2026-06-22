// ----------------------
// FISH DATA (shallow only)
// ----------------------

const fishData = [
    {
        id: "giant-moray-eel",
        name: "Giant Moray Eel",
        sprite: "giant_moray_eel.png",
        spriteWidth: 128,
        spriteHeight: 32,
        depthZone: "shallow",
        size: "Up to 3m",
        weight: "Exceeds 30kg",
        lifespan: "10–30 years",
        diet: "Smaller reef fish, octopus, crustaceans",
        funFact: "Has a second set of jaws.",
        speedFactor: 0.6,
        scale: 0.55
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
        diet: "Planktons, zooplanktons, marine algae",
        funFact: "Has hidden venomous tail spines.",
        speedFactor: 0.9,
        scale: 0.55
    },
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
        id: "bluespine-unicornfish",
        name: "Bluespine Unicornfish",
        sprite: "bluespine_unicornfish.png",
        spriteWidth: 1061,
        spriteHeight: 609,
        depthZone: "shallow",
        size: "Up to 70cm",
        weight: "5.8kg",
        lifespan: "15 to 50+ years",
        diet: "Benthic macroalgae, leafy brown algae",
        funFact: "Their skin is covered in tiny, rough scales that feel like sandpaper.",
        speedFactor: 0.8,
        scale: 0.05
    },
    {
        id: "porcupine-fish",
        name: "Porcupine Fish",
        sprite: "porcupine_fish.png",
        spriteWidth: 32,
        spriteHeight: 32,
        depthZone: "shallow",
        size: "Up to 30cm",
        weight: "1.8kg",
        lifespan: "10–15 years",
        diet: "Crabs, clams, snails, sea urchins",
        funFact: "Their spines lay flat against the body when feeling relaxed.",
        speedFactor: 0.8,
        scale: 1.5
    },
    {
        id: "mackerel",
        name: "Mackerel",
        sprite: "mackerel.png",
        spriteWidth: 96,
        spriteHeight: 32,
        depthZone: "shallow",
        size: "Up to 35cm",
        weight: "700g",
        lifespan: "7 to 20 years",
        diet: "Zooplanktons, shrimps",
        funFact: "They are predatory fish that gather in massive schools.",
        speedFactor: 0.8,
        scale: 1.8
    },
    {
        id: "anglerfish",
        name: "Anglerfish",
        sprite: "anglerfish.png",
        spriteWidth: 64,
        spriteHeight: 64,
        depthZone: "deep",
        size: "Females: Up to 1.2m \n Males: Up to 5cm",
        weight: "Females: 50kg \n Males: 1g",
        lifespan: "20–25 years",
        diet: "Small fish, crustaceans, squid, smaller anglerfish",
        funFact: "Male anglerfish lack the ability to feed so they survive by attaching themselves to a female anglerfish like parasites.",
        speedFactor: 0.8,
        scale: 0.6
    },
    {
        id: "great-white-shark",
        name: "Great White Shark",
        sprite: "great_white_shark.png",
        spriteWidth: 64,
        spriteHeight: 64,
        depthZone: "deep",
        size: "Up to 5.9m",
        weight: "680-1800kg",
        lifespan: "Around 70 years",
        diet: "Fish, smaller sharks, seals, sea lions, whale blubber",
        funFact: "They are the world's largest predatory fish.",
        speedFactor: 1.2,
        scale: 15
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
    }, 5000);
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
        options: ["Great White Shark", "Mackerel", "Porcupine Fish", "Yellow Tang"],
        correct: "Yellow Tang"
    },
    {
        question: "Which fish has venomous tail spines?",
        options: ["Blue Tang", "Bluespine Unicornfish", "Yellow Tang", "Anglerfish"],
        correct: "Blue Tang"
    },
    {
        question: "Which fish mainly eats algae?",
        options: ["Blue Tang", "Great White Shark", "Yellow Tang", "Giant Moray Eel"],
        correct: "Yellow Tang"
    },
    {
        question: "Which fish mainly eats plankton?",
        options: ["Blue Tang", "Porcupine Fish", "Yellow Tang", "Anglerfish"],
        correct: "Blue Tang"
    },
    {
        question: "Which fish is the largest predatory fish in the world?",
        options: ["Bluespine Unicornfish", "Giant Moray Eel", "Great White Shark", "Anglerfish"],
        correct: "Great White Shark"
    }, 
    {
        question: "Which fish live in schools?",
        options: ["Blue Tang", "Mackerel", "Giant Moray Eel", "Anglerfish"],
        correct: "Mackerel"
    },
    {
        question: "Which fish has a second set of jaws?",
        options: ["Anglerfish", "Porcupine Fish", "Yellow Tang", "Giant Moray Eel"],
        correct: "Giant Moray Eel"
    },
    {
        question: "Which fish has a horn on its forehead?",
        options: ["Giant Morray Eel", "Great White Shark", "Bluespine Unicornfish", "Anglerfish"],
        correct: "Anglerfish"
    },
    {
        question: "Which fish has the ability to inflate?",
        options: ["Blue Tang", "Bluespine Unicornfish", "Anglerfish", "Porcupine Fish"],
        correct: "Porcupine Fish"
    },
    {
        question: "Which fish has a glowing lantern on its forehead?",
        options: ["Porcupine Fish", "Anglerfish", "Blue Tang", "Giant Morray Eel"],
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

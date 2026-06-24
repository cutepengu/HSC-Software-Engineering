// ===========================================================
// FISH DATA
// ===========================================================

const fishData = [
    // SHALLOW FISH
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
        diet: "Benthic macroalgae",
        funFact: "Skin feels like sandpaper.",
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
        funFact: "Spines lay flat when relaxed.",
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
        funFact: "Gather in massive schools.",
        speedFactor: 0.8,
        scale: 1.8
    },

    // DEEP FISH
    {
        id: "anglerfish",
        name: "Anglerfish",
        sprite: "anglerfish.png",
        spriteWidth: 64,
        spriteHeight: 64,
        depthZone: "deep",
        size: "Females: 1.2m, Males: 5cm",
        weight: "Females: 50kg, Males: 1g",
        lifespan: "20–25 years",
        diet: "Small fish, crustaceans, squid",
        funFact: "Males attach to females like parasites.",
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
        weight: "680–1800kg",
        lifespan: "Around 70 years",
        diet: "Fish, seals, sea lions",
        funFact: "Largest predatory fish.",
        speedFactor: 1.2,
        scale: 15
    }
];


// ===========================================================
// DOM ELEMENTS
// ===========================================================

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
const infoBuy = document.getElementById("info-buy");

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

const coinCountSpan = document.getElementById("coin-count");
const btnInventory = document.getElementById("btn-inventory");
const inventoryOverlay = document.getElementById("inventory-overlay");
const inventoryList = document.getElementById("inventory-list");
const inventoryClose = document.getElementById("inventory-close");

const btnLogout = document.getElementById("btn-logout");
const logoutOverlay = document.getElementById("logout-overlay");
const logoutYes = document.getElementById("logout-yes");
const logoutNo = document.getElementById("logout-no");


// ===========================================================
// SAVE / LOAD SYSTEM
// ===========================================================

let coins = 0;
let inventory = [];
let selectedFish = null;

function getUserKey() {
    const user = sessionStorage.getItem("currentUser") || "guest";
    return "deepSeaProgress_" + user;
}

function loadProgress() {
    const saved = localStorage.getItem(getUserKey());
    if (!saved) return;

    try {
        const data = JSON.parse(saved);
        coins = data.coins || 0;
        inventory = data.inventory || [];
    } catch {
        coins = 0;
        inventory = [];
    }

    updateCoinDisplay();
}

function saveProgress() {
    localStorage.setItem(
        getUserKey(),
        JSON.stringify({ coins, inventory })
    );
}

function updateCoinDisplay() {
    coinCountSpan.textContent = coins;
}

function addCoins(amount) {
    coins += amount;
    updateCoinDisplay();
    saveProgress();
}


// ===========================================================
// FISH PRICES (deep fish more expensive)
// ===========================================================

const fishPrices = {
    "yellow-tang": 8,
    "blue-tang": 10,
    "porcupine-fish": 12,
    "mackerel": 10,
    "bluespine-unicornfish": 15,
    "giant-moray-eel": 20,
    "anglerfish": 40,
    "great-white-shark": 100
};


// ===========================================================
// WATER COLOUR FADE
// ===========================================================

let depth = 0;

function updateOceanColour() {
    const t = depth / 100;
    const r = Math.round(100 * (1 - t));
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


// ===========================================================
// FISH SPAWNING
// ===========================================================

function spawnFish() {
    let allowedFish = depth < 30
        ? fishData.filter(f => f.depthZone === "shallow")
        : fishData;

    const fishInfo = allowedFish[Math.floor(Math.random() * allowedFish.length)];

    const img = document.createElement("img");
    img.src = "../images/" + fishInfo.sprite;
    img.classList.add("fish");

    const scale = fishInfo.scale;
    const width = fishInfo.spriteWidth * scale;
    const height = fishInfo.spriteHeight * scale;

    img.style.width = width + "px";
    img.style.height = height + "px";

    const oceanRect = ocean.getBoundingClientRect();
    img.style.top = Math.random() * (oceanRect.height - height) + "px";

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
            addCoins(1);
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
    setInterval(spawnFish, 3000);
}


// ===========================================================
// INFO PANEL + BUYING FISH
// ===========================================================

function showFishInfo(fish) {
    selectedFish = fish;

    infoName.textContent = fish.name;
    infoDepth.textContent = "Depth zone: " + fish.depthZone;
    infoSize.textContent = "Size: " + fish.size;
    infoWeight.textContent = "Weight: " + fish.weight;
    infoLifespan.textContent = "Lifespan: " + fish.lifespan;
    infoDiet.textContent = "Diet: " + fish.diet;
    infoFact.textContent = "Fun fact: " + fish.funFact;

    const cost = fishPrices[fish.id];
    infoBuy.textContent = `Buy This Fish (${cost})`;
    infoBuy.classList.remove("hidden");

    infoPanel.classList.remove("hidden");
}

infoBuy.onclick = () => {
    if (!selectedFish) return;

    const cost = fishPrices[selectedFish.id];

    if (coins < cost) {
        alert("Not enough coins!");
        return;
    }

    coins -= cost;
    updateCoinDisplay();

    if (!inventory.includes(selectedFish.id)) {
        inventory.push(selectedFish.id);
    }

    saveProgress();

    alert("You bought " + selectedFish.name + "!");

    infoPanel.classList.add("hidden");
    infoBuy.classList.add("hidden");
    selectedFish = null;
};

infoClose.addEventListener("click", () => {
    infoPanel.classList.add("hidden");
    infoBuy.classList.add("hidden");
    selectedFish = null;
});


// ===========================================================
// INVENTORY SYSTEM
// ===========================================================

btnInventory.addEventListener("click", () => {
    inventoryList.innerHTML = "";

    if (inventory.length === 0) {
        const li = document.createElement("li");
        li.textContent = "You don't own any fish yet.";
        inventoryList.appendChild(li);
    } else {
        inventory.forEach(id => {
            const fish = fishData.find(f => f.id === id);
            const li = document.createElement("li");
            li.classList.add("inventory-item");

            // fish image
            const img = document.createElement("img");
            img.src = "../images/" + fish.sprite;
            img.classList.add("inventory-fish-img");

            // fish name
            const name = document.createElement("span");
            name.textContent = fish.name;

            li.appendChild(img);
            li.appendChild(name);
            inventoryList.appendChild(li);
        });
    }

    inventoryOverlay.classList.remove("hidden");
});

inventoryClose.addEventListener("click", () => {
    inventoryOverlay.classList.add("hidden");
});

// ===========================================================
// MINI‑GAME MENU
// ===========================================================

btnQuizMenu.addEventListener("click", () => {
    menuOverlay.classList.remove("hidden");
});

menuClose.addEventListener("click", () => {
    menuOverlay.classList.add("hidden");
});


// ===========================================================
// QUIZ SYSTEM
// ===========================================================

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
        correct: "Bluespine Unicornfish"
    },
    {
        question: "Which fish has the ability to inflate?",
        options: ["Blue Tang", "Bluespine Unicornfish", "Anglerfish", "Porcupine Fish"],
        correct: "Porcupine Fish"
    },
    {
        question: "Which fish has a glowing lantern on its forehead?",
        options: ["Porcupine Fish", "Anglerfish", "Blue Tang", "Giant Morray Eel"],
        correct: "Anglerfish"
    }
];

let availableQuestions = [...quizQuestions];
let currentQuestion = null;

function getNextQuestion() {
    if (availableQuestions.length === 0) {
        availableQuestions = [...quizQuestions];
    }
    const index = Math.floor(Math.random() * availableQuestions.length);
    const q = availableQuestions[index];
    availableQuestions.splice(index, 1);
    return q;
}

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
                addCoins(1);
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

quizNext.addEventListener("click", loadQuiz);
quizExit.addEventListener("click", () => quizOverlay.classList.add("hidden"));


// ===========================================================
// CATCH! MINI‑GAME
// ===========================================================
let catchActive = false;
let catchScore = 0;
let catchTimer = null;
let countdownInterval = null;

// create countdown display
const countdownDisplay = document.createElement("div");
countdownDisplay.id = "countdown";
countdownDisplay.classList.add("hidden");
document.body.appendChild(countdownDisplay);

// open Catch! menu
btnCatch.addEventListener("click", () => {
    menuOverlay.classList.add("hidden");
    catchOverlay.classList.remove("hidden");
    catchScore = 0;
    catchScoreSpan.textContent = catchScore;
});

// start Catch! game
catchStart.addEventListener("click", () => {
    catchOverlay.classList.add("hidden");
    catchScore = 0;
    catchScoreSpan.textContent = catchScore;
    catchActive = true;

    let timeLeft = 15;
    countdownDisplay.textContent = timeLeft;
    countdownDisplay.classList.remove("hidden");

    // countdown timer
    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownDisplay.textContent = timeLeft;
        if (timeLeft <= 0) clearInterval(countdownInterval);
    }, 1000);

    // end game after 15 seconds
    catchTimer = setTimeout(() => {
        catchActive = false;
        countdownDisplay.classList.add("hidden");

        // reward coins
        addCoins(catchScore);

        alert("Time's up! You caught " + catchScore + " fish and earned " + catchScore + " coins!");
    }, 15000);
});

// exit Catch! menu
catchExit.addEventListener("click", () => {
    catchOverlay.classList.add("hidden");
    catchActive = false;
    countdownDisplay.classList.add("hidden");

    if (catchTimer) clearTimeout(catchTimer);
    if (countdownInterval) clearInterval(countdownInterval);
});

// ===========================================================
// BUBBLE SYSTEM 
// ===========================================================

// creates one bubble at a random x-position
function spawnBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // random horizontal position
    bubble.style.left = Math.random() * window.innerWidth + "px";

    // add to ocean
    ocean.appendChild(bubble);

    // remove after animation ends
    setTimeout(() => bubble.remove(), 8000);
}

// starts continuous bubble spawning
function startBubbles() {
    setInterval(spawnBubble, 1200); // one bubble every 1.2 seconds
}

// ===========================================================
// LOGOUT SYSTEM
// ===========================================================

// open logout confirmation
btnLogout.addEventListener("click", () => {
    logoutOverlay.classList.remove("hidden");
});

// YES → log out
logoutYes.addEventListener("click", () => {
    // clear session user
    sessionStorage.removeItem("currentUser");

    // hide overlay
    logoutOverlay.classList.add("hidden");

    // redirect to login page
    window.location.href = "../login/login.html";
});

// NO → cancel logout
logoutNo.addEventListener("click", () => {
    logoutOverlay.classList.add("hidden");
});

// ===========================================================
// FINAL INIT — RUN EVERYTHING ON PAGE LOAD
// ===========================================================

window.onload = () => {
    // load saved coins + inventory
    loadProgress();

    // start depth fade effect
    startDepthFade();

    // start fish spawning
    startSpawning();

    // start bubble animation
    startBubbles();

    // update coin display immediately
    updateCoinDisplay();
};

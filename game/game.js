/* -------------------------
   DEPTH COLOUR SYSTEM
-------------------------- */

let depth = 0;

function animateDepth() {
    const ocean = document.getElementById("ocean");
    const depthLabel = document.getElementById("depth-label");

    if (!ocean || !depthLabel) return;

    depth += 0.2;
    depthLabel.textContent = `Depth: ${Math.floor(depth)}m`;

    const r = Math.max(0, 141 - depth * 0.1);
    const g = Math.max(0, 187 - depth * 0.15);
    const b = Math.max(0, 226 - depth * 0.2);

    ocean.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    requestAnimationFrame(animateDepth);
}

/* -------------------------
   RANDOM FISH SPAWNING
-------------------------- */

const fishImages = [
    "images/clownfish.png",
    "images/angler.png",
    "images/tuna.png",
    "images/shark.png"
];

const fishInfo = {
    "clownfish.png": { size: "11cm", weight: "250g", lifespan: "6 years" },
    "angler.png": { size: "1m", weight: "45kg", lifespan: "25 years" },
    "tuna.png": { size: "2m", weight: "200kg", lifespan: "15 years" },
    "shark.png": { size: "6m", weight: "900kg", lifespan: "30 years" }
};

function spawnFish() {
    const fish = document.createElement("img");
    const randomFish = fishImages[Math.floor(Math.random() * fishImages.length)];

    fish.src = randomFish;
    fish.classList.add("fish");

    fish.style.left = Math.random() * 80 + "vw";
    fish.style.top = Math.random() * 80 + "vh";

    fish.onclick = () => {
        const name = randomFish.split("/").pop();
        const info = fishInfo[name];
        alert(`Size: ${info.size}\nWeight: ${info.weight}\nLifespan: ${info.lifespan}`);
    };

    document.getElementById("ocean").appendChild(fish);

    setTimeout(() => fish.remove(), 8000);
}

setInterval(spawnFish, 5000);

/* -------------------------
   MINI GAMES + LOGOUT
-------------------------- */

function openMiniGames() {
    const menu = document.getElementById("mini-menu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function playMiniGame1() {
    alert("Mini Game -Catch!- starting!");
}

function playMiniGame2() {
    alert("Mini Game -Guess!- starting!");
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

/* -------------------------
   START GAME
-------------------------- */

window.onload = () => {
    animateDepth();
};
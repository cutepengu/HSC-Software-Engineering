let score = 0;

function spawnCatchFish() {
    const fish = document.createElement("img");
    fish.src = "assets/fish/clownfish.png";
    fish.classList.add("fish");

    fish.style.left = Math.random() * 80 + "vw";
    fish.style.top = Math.random() * 80 + "vh";

    fish.onclick = () => {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        fish.remove();
    };

    document.getElementById("game-area").appendChild(fish);

    setTimeout(() => fish.remove(), 3000);
}

setInterval(spawnCatchFish, 1000);

function endGame() {
    const coins = score * 10;
    alert(`You earned ${coins} coins!`);
    window.location.href = "game.html";
}
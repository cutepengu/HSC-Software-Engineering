const fishList = [
    { img: "assets/fish/clownfish.png", size: "11cm" },
    { img: "assets/fish/angler.png", size: "1m" }
];

let currentFish;

function newQuestion() {
    currentFish = fishList[Math.floor(Math.random() * fishList.length)];
    document.getElementById("fish-img").src = currentFish.img;
    document.getElementById("question").innerText = "What is the size of this fish?";
}

function submitGuess() {
    const guess = document.getElementById("answer").value;

    if (guess === currentFish.size) {
        alert("Correct! +20 coins");
    } else {
        alert("Incorrect!");
    }

    newQuestion();
}

newQuestion();
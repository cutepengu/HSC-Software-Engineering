class Menu {
    constructor() {
        this.playBtn = document.getElementById("playBtn");
        this.loginBtn = document.getElementById("loginBtn");
        this.helpBtn = document.getElementById("helpBtn");
        this.initialiseButtons();
    }

    initialiseButtons() {
        this.playBtn.addEventListener("click", () => this.startGame());
        this.loginBtn.addEventListener("click", () => this.goToLogin());
        this.helpBtn.addEventListener("click", () => this.showHelp());
    }

    startGame() {
        const user = localStorage.getItem("name");
        if (user) {
            window.location.href = "game.html";
        } else {
            window.location.href = "login/login.html";
        }
    }

    goToLogin() {
        window.location.href = "login/login.html";
    }

    showHelp() {
        window.location.href = "help.html";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new Menu();
});

// Back button function for secondary pages
function goBack() {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}
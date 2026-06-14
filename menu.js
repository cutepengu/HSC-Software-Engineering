class Menu {

    constructor() {
        this.playBtn = document.getElementById("playBtn");
        this.loginBtn = document.getElementById("loginBtn");
        this.helpBtn = document.getElementById("helpBtn");
        this.helpBox = document.getElementById("help-box");
        this.closeHelpBtn = document.getElementById("closeHelpBtn");

        this.initialiseButtons();
    }

    initialiseButtons() {
        if (this.playBtn) this.playBtn.addEventListener("click", () => this.startGame());
        if (this.loginBtn) this.loginBtn.addEventListener("click", () => this.goToLogin());
        if (this.helpBtn) this.helpBtn.addEventListener("click", () => this.openHelp());
        if (this.closeHelpBtn) this.closeHelpBtn.addEventListener("click", () => this.closeHelp());
    }

    startGame() {
        document.body.style.backgroundImage = "url('images/blue_display.png')";
        const loggedIn = sessionStorage.getItem("loggedIn");

        setTimeout(() => {
            if (loggedIn === "true") {
                window.location.href = "game/game.html";  // FIXED
            } else {
                window.location.href = "login/login.html";
            }
        }, 200);
    }

    goToLogin() {
        document.body.style.backgroundImage = "url('images/blue_display.png')";
        setTimeout(() => {
            window.location.href = "login/login.html";
        }, 200);
    }

    openHelp() {
        document.body.style.backgroundImage = "url('images/blue_display.png')";
        this.helpBox.classList.remove("hidden");
    }

    closeHelp() {
        this.helpBox.classList.add("hidden");
        document.body.style.backgroundImage = "url('images/main_display.png')";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new Menu();
});

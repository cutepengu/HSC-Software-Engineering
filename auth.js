// ----------------------
// SIGNUP
// ----------------------
function signup() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("errorMessage");

    error.textContent = "";

    if (!name || !email || !dob || !password) {
        error.textContent = "Please fill in all fields.";
        return;
    }

    if (!email.includes("@")) {
        error.textContent = "Email requires an @ symbol.";
        return;
    }

    const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRule.test(password)) {
        error.textContent = "Password must be at least 8 characters and contain letters and numbers.";
        return;
    }

    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("dob", dob);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("loggedIn", "false");

    window.location.href = "registration.html";
}



// ----------------------
// LOGIN
// ----------------------
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("errorMessage");

    const storedEmail = sessionStorage.getItem("email");
    const storedPassword = sessionStorage.getItem("password");

    error.textContent = "";

    if (email !== storedEmail) {
        error.textContent = "Account does not exist.";
        return;
    }

    if (password !== storedPassword) {
        error.textContent = "Incorrect password.";
        return;
    }

    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "../game/game.html";  // FIXED PATH
}



// ----------------------
// Disable Enter key
// ----------------------
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

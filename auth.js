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

    // load existing users or create empty object
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Check if email already exists
    if (users[email]) {
        error.textContent = "An account with this email already exists.";
        return;
    }

    // save new user
    users[email] = {
        name: name,
        email: email,
        dob: dob,
        password: password
    };

    localStorage.setItem("users", JSON.stringify(users));

    // store info temporarily for registration page
    sessionStorage.setItem("currentUser", email);

    window.location.href = "registration.html";
}

// ----------------------
// LOGIN
// ----------------------
function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("errorMessage");

    error.textContent = "";

    // load all users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
        error.textContent = "Account does not exist.";
        return;
    }

    if (users[email].password !== password) {
        error.textContent = "Incorrect password.";
        return;
    }

    sessionStorage.setItem("currentUser", email);
    window.location.href = "../game/game.html";
}

// ----------------------
// Disable Enter key
// ----------------------
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

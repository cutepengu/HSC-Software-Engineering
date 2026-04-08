// SIGNUP FORM
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    const signupError = document.getElementById("errorMessage");
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const dob = document.getElementById("dob").value;
        const password = document.getElementById("password").value;

        const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Reset error message
        signupError.textContent = "";

        if (!email.includes("@")) {
            signupError.textContent = "Email requires an @ symbol. Please try again.";
            return;
        }

        if (!passwordRule.test(password)) {
            signupError.textContent = "Password must be at least 8 letters and contain letters and numbers.";
            return;
        }

        // Save to localStorage
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("dob", dob);

        // Redirect to main menu
        window.location.href = "../index.html";
    });
}

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    const loginError = document.getElementById("errorMessage");
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Reset error message
        loginError.textContent = "";

        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password"); // optional if you want to check password

        if (!email.includes("@")) {
            loginError.textContent = "Email requires an @ symbol. Please try again.";
            return;
        }

        if (email !== savedEmail) {
            loginError.textContent = "Email not found. Please try again.";
            return;
        }

        // Optional: check password
        if (savedPassword && password !== savedPassword) {
            loginError.textContent = "Incorrect password. Please try again.";
            return;
        }

        // Redirect to main menu
        window.location.href = "../index.html";
    });
}
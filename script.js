document.getElementById("registrationForm")?.addEventListener("submit", function(event) {

    event.preventDefault(); // Stop page refresh

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;

    // Password validation where password is at least 8 letters and contains both letters and numbers
    const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRule.test(password)) {
        alert("Password must be at least 8 characters long and contain both letters and numbers.");
        return; // Stop form submission
    }

    // Save values to sessionStorage
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("dob", dob);

    // Redirect to success page
    window.location.href = "registration.html";
});

// Display saved data on registration success page
window.addEventListener("DOMContentLoaded", function () {

    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const dob = sessionStorage.getItem("dob");

    if (name) document.getElementById("displayName").textContent = name;
    if (email) document.getElementById("displayEmail").textContent = email;
    if (dob) document.getElementById("displayDob").textContent = dob;
});
document.addEventListener("DOMContentLoaded", () => {

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const error = document.getElementById("errorMessage");

    // SIGNUP
    if(signupForm){
        signupForm.addEventListener("submit", (e)=>{
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("emailSignup").value.trim();
            const dob = document.getElementById("dob").value;
            const password = document.getElementById("passwordSignup").value.trim();

            error.textContent="";

            if(!name || !email || !dob || !password){
                error.textContent="Please fill in all fields.";
                return;
            }

            if(!email.includes("@")){
                error.textContent="Email requires an @ symbol. Please try again.";
                return;
            }

            const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if(!passwordRule.test(password)){
                error.textContent="Password must be at least 8 characters and contain letters and numbers.";
                return;
            }

            // Save user info in sessionStorage
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("dob", dob);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("loggedIn", "false");

            // Redirect to registration success
            window.location.href = "registration.html";
        });
    }

    // LOGIN
    if(loginForm){
        loginForm.addEventListener("submit", (e)=>{
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            const storedEmail = sessionStorage.getItem("email");
            const storedPassword = sessionStorage.getItem("password");

            error.textContent="";

            if(!email.includes("@")){
                error.textContent="Email requires an @ symbol. Please try again.";
                return;
            }

            if(email !== storedEmail){
                error.textContent="Account does not exist.";
                return;
            }

            if(password !== storedPassword){
                error.textContent="Incorrect password.";
                return;
            }

            // Successful login
            sessionStorage.setItem("loggedIn","true");
            window.location.href="../game.html";
        });
    }

});